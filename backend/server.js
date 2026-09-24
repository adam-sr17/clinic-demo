const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const doctors = [
  { id: 1, name: "دکتر محمد رضایی", specialty: "پزشک عمومی" },
  { id: 2, name: "دکتر زهرا کریمی", specialty: "متخصص اطفال" },
  { id: 3, name: "دکتر علی حسینی", specialty: "متخصص ارتوپدی" },
  { id: 4, name: "دکتر سارا موسوی", specialty: "متخصص داخلی" },
  { id: 5, name: "دکتر امیر جعفری", specialty: "متخصص پوست" },
  { id: 6, name: "دکتر مریم صادقی", specialty: "متخصص زنان" }
];

app.get("/doctors", function (req, res) {
  res.json(doctors);
});

app.post("/appointments", function (req, res) {
  const newAppointment = req.body;

  const appointmentsData = fs.readFileSync("appointments.json", "utf-8");
  const appointments = JSON.parse(appointmentsData);

  appointments.push(newAppointment);
  fs.writeFileSync("appointments.json", JSON.stringify(appointments, null, 2));

  res.json({ success: true, message: "نوبت شما با موفقیت ثبت شد" });
});

app.get("/appointments", function (req, res) {
  const appointmentsData = fs.readFileSync("appointments.json", "utf-8");
  const appointments = JSON.parse(appointmentsData);
  res.json(appointments);
});

const ADMIN_PASSWORD = "clinic2026";

app.post("/admin/login", function (req, res) {
  const password = req.body.password;

  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "رمز عبور اشتباه است" });
  }
});
app.listen(port, function () {
  console.log("سرور روی پورت " + port + " در حال اجراست");
});