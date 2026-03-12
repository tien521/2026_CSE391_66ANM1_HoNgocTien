let students = []; // Mảng gốc
let sortDirection = 0; // 0: không sắp xếp, 1: tăng, -1: giảm

// DOM elements
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchName");
const rankFilter = document.getElementById("filterRank");
const sortScoreBtn = document.getElementById("sortScore");
const sortIcon = document.getElementById("sortIcon");

// Hàm tính xếp loại (Helper)
function getRank(score) {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7.0) return "Khá";
  if (score >= 5.0) return "Trung bình";
  return "Yếu";
}

// HÀM QUAN TRỌNG NHẤT: Xử lý dữ liệu hiển thị
function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const selectedRank = rankFilter.value;

  // 1. LỌC (Filter)
  let filtered = students.filter((sv) => {
    const matchesName = sv.name.toLowerCase().includes(keyword);
    const matchesRank =
      selectedRank === "All" || getRank(sv.score) === selectedRank;
    return matchesName && matchesRank;
  });

  // 2. SẮP XẾP (Sort)
  if (sortDirection !== 0) {
    filtered.sort((a, b) => {
      return sortDirection === 1 ? a.score - b.score : b.score - a.score;
    });
  }

  renderTable(filtered);
}

// Vẽ giao diện
function renderTable(data) {
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="5" class="no-result">Không tìm thấy kết quả phù hợp</td></tr>';
  }

  data.forEach((sv, index) => {
    const row = document.createElement("tr");
    if (sv.score < 5) row.classList.add("bg-yellow");

    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score.toFixed(1)}</td>
            <td>${getRank(sv.score)}</td>
            <td><button class="btn-delete" data-id="${sv.id}">Xóa</button></td>
        `;
    tableBody.appendChild(row);
  });

  // Cập nhật thống kê (tính trên mảng đã lọc)
  const avg =
    data.length > 0
      ? (data.reduce((sum, s) => sum + s.score, 0) / data.length).toFixed(2)
      : 0;
  document.getElementById("summaryStats").innerHTML =
    `Hiển thị: ${data.length} | Điểm TB khu vực này: ${avg}`;
}

// --- XỬ LÝ SỰ KIỆN ---

// Thêm sinh viên (Mỗi SV nên có ID duy nhất để dễ xóa)
document.getElementById("btnAdd").onclick = () => {
  const name = document.getElementById("txtName").value.trim();
  const score = parseFloat(document.getElementById("txtScore").value);

  if (name && !isNaN(score) && score >= 0 && score <= 10) {
    students.push({ id: Date.now(), name, score });
    document.getElementById("txtName").value = "";
    document.getElementById("txtScore").value = "";
    applyFilters();
  } else {
    alert("Dữ liệu không hợp lệ!");
  }
};

// Tìm kiếm realtime
searchInput.oninput = applyFilters;

// Lọc theo xếp loại
rankFilter.onchange = applyFilters;

// Sắp xếp theo điểm
sortScoreBtn.onclick = () => {
  if (sortDirection === 0 || sortDirection === -1) {
    sortDirection = 1; // Tăng dần
    sortIcon.innerText = "▲";
  } else {
    sortDirection = -1; // Giảm dần
    sortIcon.innerText = "▼";
  }
  applyFilters();
};

// Xóa sinh viên
tableBody.onclick = (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = parseInt(e.target.dataset.id);
    students = students.filter((sv) => sv.id !== id);
    applyFilters();
  }
};
