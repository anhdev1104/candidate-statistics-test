import {
    viewCandidates,
    viewEducationCount,
    viewHighestAvgScoreSchool,
    viewHighestRatioEducationLevel,
    viewPosition,
    viewRatioGender,
    viewTopLanguage,
} from './viewData.js';

/*
    1. Trường có số lượng/tỉ lệ candidate nhiều nhất, nhì, ba, ít nhất
    2. Tỉ lệ candidate nam / nữ / tổng số 
    3. Ngôn ngữ lập trình được sử dụng nhiều nhất
    4. Xu hướng ứng tuyển vị trí FE/BE của Nam so với Nữ.
    5. Điểm trung bình của trường nào là cao nhất.
    6. Sinh viên ở cấp đào tạo nào chiếm tỉ lệ cao nhất trong số sinh viên có điểm >= 75
*/
export const endpoint = 'http://localhost:3000/candidates';
const fetchData = async () => {
    try {
        const res = await fetch(endpoint);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

// Read and display file data
const root = document.querySelector('#root');
root.insertAdjacentHTML('beforeend', await viewCandidates(fetchData));

const analyzeData = async () => {
    try {
        const data = await fetchData();
        // 1. Trường có số lượng/tỉ lệ candidate nhiều nhất, nhì, ba, ít nhất
        const educationCounts = {};
        data.forEach(candidate => {
            const education = candidate.education;
            educationCounts[education] = (educationCounts[education] || 0) + 1;
        });
        const sortedEducation = Object.entries(educationCounts).sort((a, b) => b[1] - a[1]);
        root.insertAdjacentHTML('beforeend', viewEducationCount(sortedEducation));
        const educationChart = document.querySelector('#educationChart');
        new Chart(educationChart, {
            type: 'bar', // Loại biểu đồ (ví dụ: bar, line, pie, ...)
            data: {
                labels: sortedEducation.map(item => item[0]), // Nhãn trục x
                datasets: [
                    {
                        label: 'Số lượng ứng viên', // Nhãn cho dữ liệu
                        data: sortedEducation.map(item => item[1]), // Dữ liệu
                        backgroundColor: ['rgba(54, 162, 235, 0.2)'], // Màu nền cho các cột
                        borderColor: ['rgba(54, 162, 235, 1)'], // Màu viền cho các cột
                        borderWidth: 1, // Độ rộng của đường viền
                    },
                ],
            },
        });

        // 2. Tỉ lệ candidate nam / nữ / tổng số
        let maleCount = 0;
        let femaleCount = 0;
        data.forEach(candidate => {
            if (candidate.gender === 'Nam') {
                maleCount++;
            } else {
                femaleCount++;
            }
        });
        const totalCandidates = data.length;
        const maleRatio = (maleCount / totalCandidates) * 100;
        const femaleRatio = (femaleCount / totalCandidates) * 100;
        root.insertAdjacentHTML('beforeend', viewRatioGender(totalCandidates, maleRatio, femaleRatio));
        const genderRatioChart = document.querySelector('#genderRatioChart');
        new Chart(genderRatioChart, {
            type: 'doughnut',
            data: {
                labels: ['Nam', 'Nữ'],
                datasets: [
                    {
                        label: 'Tỉ lệ phần trăm',
                        data: [maleRatio.toFixed(1), femaleRatio.toFixed(1)],
                        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
                        hoverOffset: 4,
                    },
                ],
            },
        });

        // 3. Ngôn ngữ lập trình được sử dụng nhiều nhất
        const languageCounts = {};
        data.forEach(candidate => {
            candidate.language.forEach(language => {
                languageCounts[language] = (languageCounts[language] || 0) + 1;
            });
        });
        const sortLanguage = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]);
        root.insertAdjacentHTML('beforeend', viewTopLanguage(sortLanguage));
        const topLanguageChart = document.querySelector('#topLanguageChart');
        new Chart(topLanguageChart, {
            type: 'bar',
            data: {
                labels: sortLanguage.map(item => item[0]),
                datasets: [
                    {
                        label: 'Số lượng ứng viên sử dụng',
                        data: sortLanguage.map(item => item[1]),
                        backgroundColor: ['rgba(255, 205, 86, 0.2)'],
                        borderColor: ['rgba(255, 205, 86, 1)'],
                        borderWidth: 1,
                    },
                ],
            },
        });

        // 4. Xu hướng ứng tuyển vị trí FE/BE của Nam so với Nữ.
        let maleCountFE = 0;
        let femaleCountFE = 0;
        let maleCountBE = 0;
        let femaleCountBE = 0;

        data.forEach(candidate => {
            if (candidate.gender === 'Nam') {
                if (candidate.position === 'FE') {
                    maleCountFE++;
                } else if (candidate.position === 'BE') {
                    maleCountBE++;
                }
            } else if (candidate.gender === 'Nữ') {
                if (candidate.position === 'FE') {
                    femaleCountFE++;
                } else if (candidate.position === 'BE') {
                    femaleCountBE++;
                }
            }
        });

        // ratio FE
        const maleRatioFE = (maleCountFE / (maleCountFE + femaleCountFE)) * 100;
        const femaleRatioFE = (femaleCountFE / (femaleCountFE + maleCountFE)) * 100;

        // ratio BE
        const maleRatioBE = (maleCountBE / (maleCountBE + femaleCountBE)) * 100;
        const femaleRatioBE = (femaleCountBE / (femaleCountBE + maleCountBE)) * 100;
        root.insertAdjacentHTML('beforeend', viewPosition(maleRatioFE, femaleRatioFE, maleRatioBE, femaleRatioBE));
        const positionChart = document.querySelector('#positionChart');
        new Chart(positionChart, {
            type: 'bar',
            data: {
                labels: ['Nam', 'Nữ'],
                datasets: [
                    {
                        label: 'Front-end (FE)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        data: [maleRatioFE, femaleRatioFE],
                    },
                    {
                        label: 'Back-end (BE)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        data: [maleRatioBE, femaleRatioBE],
                    },
                ],
            },
        });

        // 5. Điểm trung bình của trường nào là cao nhất.
        const schoolStates = {};
        data.forEach(candidate => {
            const school = candidate.education;
            if (!schoolStates[school]) {
                schoolStates[school] = {
                    totalScore: 0,
                    totalCandidates: 0,
                };
            }
            schoolStates[school].totalScore += candidate.score;
            schoolStates[school].totalCandidates++;
        });
        // tính điểm trung bình của mỗi trường
        for (const school in schoolStates) {
            const avgScore = schoolStates[school].totalScore / schoolStates[school].totalCandidates;
            schoolStates[school].averageScore = avgScore;
        }
        // tìm trường có điểm trung bình cao nhất
        let highestAvgScore = 0;
        let highestAvgScoreSchool = '';

        for (const school in schoolStates) {
            if (schoolStates[school].averageScore > highestAvgScore) {
                highestAvgScore = schoolStates[school].averageScore;
                highestAvgScoreSchool = school;
            }
        }
        root.insertAdjacentHTML('beforeend', viewHighestAvgScoreSchool(highestAvgScore, highestAvgScoreSchool));
        const highestAvgSchool = document.querySelector('#highestAvgSchool').getContext('2d');
        // Tạo các mảng chứa tên trường và điểm trung bình
        const schoolNames = Object.keys(schoolStates);
        const averageScores = schoolNames.map(school => schoolStates[school].averageScore);
        new Chart(highestAvgSchool, {
            type: 'bar',
            data: {
                labels: schoolNames,
                datasets: [
                    {
                        label: 'Điểm Trung Bình',
                        data: averageScores,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
        });

        // 6. Sinh viên ở cấp đào tạo nào chiếm tỉ lệ cao nhất trong số sinh viên có điểm >= 75
        const educationLevelCount = {};
        data.forEach(candidate => {
            if (candidate.score >= 75) {
                const educationLevel = candidate.education_level;
                educationLevelCount[educationLevel] = (educationLevelCount[educationLevel] || 0) + 1;
            }
        });

        // tìm cấp đào tạo có tỉ lệ cao nhất
        let highestRatio = 0;
        let highestRatioEducationLevel = '';
        for (const educationLevel in educationLevelCount) {
            const ratio = (educationLevelCount[educationLevel] / data.length) * 100;
            if (ratio > highestRatio) {
                highestRatio = ratio;
                highestRatioEducationLevel = educationLevel;
            }
        }
        const educationLevels = Object.keys(educationLevelCount);
        const qualifiedCounts = Object.values(educationLevelCount);
        root.insertAdjacentHTML('beforeend', viewHighestRatioEducationLevel(highestRatio, highestRatioEducationLevel));
        const educationLevelChart = document.querySelector('#educationLevelChart');
        new Chart(educationLevelChart, {
            type: 'bar',
            data: {
                labels: educationLevels,
                datasets: [
                    {
                        label: 'Số lượng sinh viên có điểm >= 70',
                        data: qualifiedCounts,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
        });
    } catch (error) {
        console.log(error);
    }
};

analyzeData();
