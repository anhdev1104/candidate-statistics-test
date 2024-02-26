export const viewCandidates = async fetchData => {
    try {
        const data = await fetchData();
        return `
    <h1 class="text-center">Danh sách các ứng viên</h1>
    <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Education</th>
            <th>Education level</th>
            <th>Gender</th>
            <th>Year</th>
            <th>Position</th>
            <th>Programming language</th>
            <th>Score</th>
        </tr>
    </thead>
    <tbody>
    ${data
        .map(
            candidate => `
        <tr>
            <td>${candidate.id}</td>
            <td>${candidate.candidate_name}</td>
            <td>${candidate.dob}</td>
            <td>${candidate.education}</td>
            <td>${candidate.education_level}</td>
            <td>${candidate.gender}</td>
            <td>${candidate.year}</td>
            <td>${candidate.position}</td>
            <td>${candidate.language.join(', ')}</td>
            <td>${candidate.score}</td>
        </tr>`
        )
        .join('')}
    </tbody>
</table>`;
    } catch (error) {
        console.log(error);
    }
};

export const viewEducationCount = educationCandidateCount =>
    `<h1 class="text-center">Tỉ lệ ứng viên của các trường</h1>'
        <canvas id="educationChart"></canvas>
        <div class="content">
        <p>Trường có số lượng candidate nhiều nhất: <b>${educationCandidateCount[0][0]}</b> gồm <b>${educationCandidateCount[0][1]}</b> ứng viên.</p>
        <p>Trường có số lượng candidate thứ hai: <b>${educationCandidateCount[1][0]}</b> và <b>${educationCandidateCount[2][0]}</b> gồm <b>${educationCandidateCount[1][1]}</b> ứng viên của mỗi trường.</p>
        
        <p>Trường có số lượng candidate ít nhất: <b>${educationCandidateCount[3][0]}</b> và <b>${educationCandidateCount[4][0]}</b> gồm <b>${educationCandidateCount[3][1]}</b> ứng viên của mỗi trường.</p>
        </div>
    `;

export const viewRatioGender = (totalCandidates, maleRatio, femaleRatio) =>
    `
    <h1 class="text-center">Tổng số ứng viên và tỉ lệ giới tính</h1>
    <canvas id="genderRatioChart"></canvas>
    <div class="content">
        <p>Tổng số: <b>${totalCandidates} ứng viên.</b></p>
        <p>Tỉ lệ ứng viên là nam: <b>${maleRatio.toFixed(1)}%</b></p>
        <p>Tỉ lệ ứng viên là nữ: <b>${femaleRatio.toFixed(1)}%</b></p>
    </div>
`;

export const viewTopLanguage = sortLanguage => `
    <h1 class="text-center">Thống kê ngôn ngữ lập trình được sử dụng</h1>
    <canvas id="topLanguageChart"></canvas>
    <div class="content">
        <p>Ngôn ngữ lập trình được sử dụng nhiều nhất: <b>${sortLanguage[0][0]}</b> và <b>${sortLanguage[1][0]}</b>.</p>
    </div>
`;

export const viewPosition = (maleRatioFE, femaleRatioFE, maleRatioBE, femaleRatioBE) => `
    <h1 class="text-center">Xu hướng ứng tuyển vị trí FE/BE của Nam so với Nữ</h1>
    <canvas id="positionChart"></canvas>
    <div class="content">
        <h4>Front-end</h4>
        <p>Tỉ lệ nam ứng tuyển vị trí FE: <b>${maleRatioFE}%</b></p>
        <p>Tỉ lệ nữ ứng tuyển vị trí FE: <b>${femaleRatioFE}%</b></p>
        <h4>Back-end</h4>
        <p>Tỉ lệ nam ứng tuyển vị trí BE: <b>${maleRatioBE}%</b></p>
        <p>Tỉ lệ nữ ứng tuyển vị trí BE: <b>${femaleRatioBE}%</b></p>
    </div>
`;

export const viewHighestAvgScoreSchool = (highestAvgScore, highestAvgScoreSchool) => `
    <h1 class="text-center">Trung bình điểm của các trường</h1>
    <canvas id="highestAvgSchool"></canvas>
    <div class="content">
        <p>Trường có trung bình điểm cao nhất là <b>${highestAvgScoreSchool}</b> với trung bình điểm là <b>${highestAvgScore}</b></p>
    </div>
`;

export const viewHighestRatioEducationLevel = (highestRatio, highestRatioEducationLevel) => `
    <h1 class="text-center">Tỉ lệ điểm của các cấp đào tạo trong các ứng viên</h1>
    <canvas id="educationLevelChart"></canvas>
    <div class="content">
        <p>Cấp đào tạo có tỉ lệ cao nhất trong số sinh viên có điểm từ 70 trở lên là: <b>${highestRatioEducationLevel}</b>, với tỉ lệ là <b>${highestRatio.toFixed(
    1
)}</b>%</p>
    </div>
`;
