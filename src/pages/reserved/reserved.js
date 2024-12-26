import "./reserved.scss"

// 예약 횟수, 결제 금액 표시
const userData = {
  userName: "강아지",
  reservationCount: 30,
  payCount: 559900,
};

document.getElementById("userName").innerText = userData.userName;
document.getElementById("reservationCount").innerText = userData.reservationCount;
document.getElementById("payCount").innerText = userData.payCount.toLocaleString();


// 더보기 버튼 동작
document.addEventListener("DOMContentLoaded", () => {
  const showMoreButton = document.getElementById("showMoreButton");
  const hiddenContent = document.getElementById("hiddenContent");

  showMoreButton.addEventListener("click", () => {
    const isActive = hiddenContent.classList.toggle("active");
    showMoreButton.textContent = isActive ? "접기 ∧" : "더보기 ∨";
    showMoreButton.setAttribute("aria-expanded", isActive);

    if (isActive) {
      hiddenContent.scrollIntoView({ behavior: "smooth" });
    }
  });
});
