import "./reserved.scss"


const userData = {
  userName: "강아지",
  reservationCount: 30,
  payCount: 559900,
};

document.getElementById("userName").innerText = userData.userName;
document.getElementById("reservationCount").innerText = userData.reservationCount;
document.getElementById("payCount").innerText = userData.payCount.toLocaleString();

