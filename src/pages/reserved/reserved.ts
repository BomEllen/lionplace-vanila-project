import "./reserved.scss";
import { ReservationVisitList } from "../../components/reservation/reservation-visit-list.ts";
import { UserData, PaginatedVisitRecordsType, PaginatedPlacesType } from "../../@types/type";
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner.ts";

let userData: UserData = {
  userName: "loading...",
  reservationCount: 0,
  payCount: 0,
};

// DOM 요소 캐싱
const userNameElement = document.getElementById("userName");
const reservationCountElement = document.getElementById("reservationCount");
const payCountElement = document.getElementById("payCount");
const hiddenContent = document.getElementById("hiddenContent") as HTMLElement;
const showMoreButton = document.getElementById("showMoreButton") as HTMLElement;
const reservationTypes = document.querySelector("reservation-types") as HTMLElement;
const loadingSpinner = document.querySelector("loading-spinner") as LoadingSpinner;

// DOM 업데이트 함수
function updateDOM() {
  if (userNameElement) userNameElement.innerText = userData.userName;
  if (reservationCountElement) reservationCountElement.innerText = userData.reservationCount.toString();
  if (payCountElement) payCountElement.innerText = userData.payCount.toLocaleString();
}

// 유저 데이터 가져오기
async function fetchUserData() {
  const response = await fetch("https://compass-mighty.pockethost.io/api/collections/visitRecords/records");
  const data: PaginatedVisitRecordsType = await response.json();
  userData.userName = data.items[0]?.userName || "Unknown";
  updateDOM();
}

// 데이터 가져오기
async function fetchData() {
  const [placeData, reviewData] = await Promise.all([fetch("https://compass-mighty.pockethost.io/api/collections/places/records").then((res) => res.json()), fetch("https://compass-mighty.pockethost.io/api/collections/reviews/records").then((res) => res.json())]);
  return { placeData, reviewData };
}

// 리뷰 필터링 및 렌더링
function filterAndRenderReviews(reviewData: { items: { place: string; text: string; img: string; id: string }[] }, placeData: { items: { id: string; placeName: string; price: number; type: string; updated: string }[] }) {
  const selectedReservationType = localStorage.getItem("selectedReservationType") || "all";
  const placeIdToData = Object.fromEntries(placeData.items.map((place) => [place.id, { ...place }]));

  const filteredReviews = reviewData.items
    .map((review) => ({
      ...placeIdToData[review.place],
      text: review.text,
      img: `https://compass-mighty.pockethost.io/api/files/reviews/${review.id}/${review.img}`,
    }))
    .filter((review) => selectedReservationType === "all" || review.type === selectedReservationType);

  updateHiddenContent(filteredReviews);
  updateReservationSummary(filteredReviews);
  updateTop3Places(filteredReviews);
}

// 숨겨진 콘텐츠 업데이트
function updateHiddenContent(filteredReviews: any[]) {
  if (hiddenContent) {
    hiddenContent.innerHTML = ""; // 기존 내용 초기화
    filteredReviews.forEach((review, index) => {
      const titleComponent = document.createElement("reservation-more-title");
      titleComponent.setAttribute("titleData", JSON.stringify({ placeName: review.placeName, type: review.type, updated: review.updated }));

      const reviewComponent = document.createElement("reservation-more-review");
      reviewComponent.setAttribute("reviews", JSON.stringify([{ ...review, index: index + 1 }]));

      hiddenContent.appendChild(titleComponent);
      hiddenContent.appendChild(reviewComponent);
    });
  }
}

// 예약 요약글 업데이트 하기
function updateReservationSummary(filteredReviews: any[]) {
  const reservationCount = filteredReviews.length;
  const totalPay = filteredReviews.reduce((sum, review) => sum + (review.price || 0), 0);

  if (reservationCountElement) reservationCountElement.innerText = reservationCount.toString();
  if (payCountElement) payCountElement.innerText = totalPay.toLocaleString();
}

// 상위 3개 장소 업데이트 (visit-list)
function updateTop3Places(filteredReviews: any[]) {
  const reviewPlaceCount = filteredReviews.reduce((acc: Record<string, number>, review) => {
    if (review.placeName) acc[review.placeName] = (acc[review.placeName] || 0) + 1;
    return acc;
  }, {});

  const top3Places = Object.entries(reviewPlaceCount)
    .map(([placeName, count]) => ({ placeName, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const reservationList = document.querySelector("reservation-visit-list") as ReservationVisitList;
  if (reservationList) reservationList.top3Places = top3Places;
}

// 이벤트 바인딩
function bindEvents() {
  if (reservationTypes) {
    reservationTypes.addEventListener("type-change", (event) => {
      const selectedReservationType = (event as CustomEvent).detail.selectedType;
      localStorage.setItem("selectedReservationType", selectedReservationType);
      fetchData().then(({ placeData, reviewData }) => filterAndRenderReviews(reviewData, placeData));
    });
  }

  if (showMoreButton && hiddenContent) {
    showMoreButton.addEventListener("click", () => {
      const isActive = hiddenContent.classList.toggle("active");
      showMoreButton.textContent = isActive ? "접기 ∧" : "더보기 ∨";
      showMoreButton.setAttribute("aria-expanded", isActive.toString());
      if (isActive) hiddenContent.scrollIntoView({ behavior: "smooth" });
    });
  }
}

loadingSpinner.show();

// 초기화
document.addEventListener("DOMContentLoaded", async () => {
  updateDOM();
  fetchUserData();
  const { placeData, reviewData } = await fetchData();
  filterAndRenderReviews(reviewData, placeData);
  bindEvents();
  loadingSpinner.hide();
});
