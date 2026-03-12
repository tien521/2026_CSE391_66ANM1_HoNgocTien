let currentStep = 1;
const totalSteps = 3;

const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".step");

// --- HÀM ĐIỀU HƯỚNG ---
function showStep(step) {
  formSteps.forEach((s, index) => {
    s.classList.toggle("active", index === step - 1);
  });

  progressSteps.forEach((s, index) => {
    s.classList.toggle("active", index < step);
  });

  if (step === 3) updateSummary();
}

// --- VALIDATION TỪNG BƯỚC ---
function validateStep(step) {
  if (step === 1) {
    const name = document.getElementById("fullname").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    if (!name || !dob || !gender) {
      alert("Vui lòng điền đầy đủ thông tin cá nhân!");
      return false;
    }
  }
  if (step === 2) {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    if (!email.includes("@") || pass.length < 6) {
      alert("Email không hợp lệ hoặc mật khẩu quá ngắn!");
      return false;
    }
    if (pass !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return false;
    }
  }
  return true;
}

// --- CẬP NHẬT TÓM TẮT BƯỚC 3 ---
function updateSummary() {
  const summary = document.getElementById("summary");
  summary.innerHTML = `
        <p><strong>Họ tên:</strong> ${document.getElementById("fullname").value}</p>
        <p><strong>Ngày sinh:</strong> ${document.getElementById("dob").value}</p>
        <p><strong>Giới tính:</strong> ${document.getElementById("gender").value}</p>
        <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
    `;
}

// --- SỰ KIỆN NÚT BẤM ---
document.querySelectorAll(".btn-next").forEach((btn) => {
  btn.onclick = () => {
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    }
  };
});

document.querySelectorAll(".btn-prev").forEach((btn) => {
  btn.onclick = () => {
    currentStep--;
    showStep(currentStep);
  };
});

// Hoàn tất
document.getElementById("multiStepForm").onsubmit = (e) => {
  e.preventDefault();
  alert("🎉 Đăng ký thành công!");
  console.log("Dữ liệu gửi đi:", {
    name: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
  });
};
