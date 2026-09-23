const API_URL =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://clinic-demo-backend.onrender.com";
const doctorSelect = document.getElementById("doctor");

fetch(API_URL + "/doctors")
  .then(function (response) {
    return response.json();
  })
  .then(function (doctors) {
    doctors.forEach(function (doctor) {
      const option = document.createElement("option");
      option.value = doctor.name;
      option.textContent = doctor.name + " - " + doctor.specialty;
      doctorSelect.appendChild(option);
    });
  });

const appointmentForm = document.getElementById("appointment-form");
const appointmentResult = document.getElementById("appointment-result");

appointmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const doctor = document.getElementById("doctor").value;
  const date = document.getElementById("date").value;

  if (fullname === "" || phone === "" || doctor === "" || date === "") {
    appointmentResult.textContent = "لطفاً همه فیلدها را پر کنید.";
    appointmentResult.style.color = "red";
    return;
  }

  const phonePattern = /^[0-9]{11}$/;
  if (!phonePattern.test(phone)) {
    appointmentResult.textContent = "شماره تماس باید ۱۱ رقم و فقط عدد باشد.";
    appointmentResult.style.color = "red";
    return;
  }

  fetch(API_URL + "/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname: fullname, phone: phone, doctor: doctor, date: date })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appointmentResult.textContent = data.message;
      appointmentResult.style.color = "green";
      appointmentForm.reset();
    });
});