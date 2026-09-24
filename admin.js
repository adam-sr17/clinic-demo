const API_URL = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://clinic-demo-backend.onrender.com";

const loginBtn = document.getElementById("login-btn");
const loginResult = document.getElementById("login-result");
const loginSection = document.getElementById("login-section");
const appointmentsSection = document.getElementById("appointments-section");
const appointmentsList = document.getElementById("appointments-list");

loginBtn.addEventListener("click", function () {
  const password = document.getElementById("admin-password").value;

  fetch(API_URL + "/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: password })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.success) {
        loginSection.style.display = "none";
        appointmentsSection.style.display = "block";
        loadAppointments();
      } else {
        loginResult.textContent = data.message;
        loginResult.style.color = "red";
      }
    });
});

function loadAppointments() {
  fetch(API_URL + "/appointments")
    .then(function (response) {
      return response.json();
    })
    .then(function (appointments) {
      appointmentsList.innerHTML = "";

      if (appointments.length === 0) {
        appointmentsList.innerHTML = "<p>هنوز نوبتی ثبت نشده است.</p>";
        return;
      }

      appointments.forEach(function (appointment, index) {
        const item = document.createElement("div");
        item.className = "appointment-item";
        item.innerHTML =
          "<h3>نوبت #" + (index + 1) + "</h3>" +
          "<p>نام: " + appointment.fullname + "</p>" +
          "<p>تلفن: " + appointment.phone + "</p>" +
          "<p>پزشک: " + appointment.doctor + "</p>" +
          "<p>تاریخ: " + appointment.date + "</p>";
        appointmentsList.appendChild(item);
      });
    });
}