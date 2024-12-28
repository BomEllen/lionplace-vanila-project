import "./reserved.scss";
import { ReservationVisitList } from "../../components/reservation/reservation-visit-list.ts";
import { UserData, PaginatedVisitRecordsType, PaginatedPlacesType } from "../../@types/type";

let userData: UserData = {
  userName: "loading...",
  reservationCount: 0,
  payCount: 0,
};

// DOM 업데이트 함수
function updateDOM() {
  const userNameElement = document.getElementById("userName");
  const reservationCountElement = document.getElementById("reservationCount");
  const payCountElement = document.getElementById("payCount");

  if (userNameElement && reservationCountElement && payCountElement) {
    userNameElement.innerText = userData.userName;
    reservationCountElement.innerText = userData.reservationCount.toString();
    payCountElement.innerText = userData.payCount.toLocaleString();
  }
}

// 초기 DOM 업데이트
updateDOM();

// GET 유저 데이터 (/api/collections/visitRecords/records)
fetch("https://compass-mighty.pockethost.io/api/collections/visitRecords/records")
  .then((response) => response.json())
  .then((data: PaginatedVisitRecordsType) => {
    console.log("유저이름데이터", data);
    userData.userName = data.items[0].userName; // userData 업데이트
    updateDOM(); // DOM 다시 업데이트
  });

// 데이터 불러오기 함수
const fetchData = async () => {
  const placeData = await fetch("https://compass-mighty.pockethost.io/api/collections/places/records").then((res) => res.json());
  const reviewData = await fetch("https://compass-mighty.pockethost.io/api/collections/reviews/records").then((res) => res.json());

  console.log("플레이스 데이터", placeData);
  console.log("리뷰 데이터", reviewData);

  return { placeData, reviewData };
};

// 필터링 및 DOM 업데이트
const filterAndRenderReviews = (reviewData: { items: { place: string; text: string; img: string; id: string }[] }, placeData: { items: { id: string; placeName: string; price: number; type: string; updated: string }[] }) => {
  const selectedReservationType = localStorage.getItem("selectedReservationType") || "all";
  console.log("현재 선택된 타입:", selectedReservationType);

  // Place 데이터 매핑
  const placeIdToData = placeData.items.reduce((acc, place) => {
    acc[place.id] = { placeName: place.placeName, type: place.type, updated: place.updated, price: place.price };
    return acc;
  }, {} as Record<string, { placeName: string; type: string; updated: string; price: number }>);

  // 필터링된 리뷰 데이터
  const filteredReviews = reviewData.items
    .map((review) => ({
      ...placeIdToData[review.place],
      text: review.text,
      img: `https://compass-mighty.pockethost.io/api/files/reviews/${review.id}/${review.img}`,
    }))
    .filter((review) => selectedReservationType === "all" || review.type === selectedReservationType);

  console.log("필터링된 리뷰 데이터:", filteredReviews);

  // top3Places 업데이트 (필터링된 데이터 기준)
  const reviewPlaceCount = filteredReviews.reduce((acc: Record<string, number>, review) => {
    if (review.placeName) {
      acc[review.placeName] = (acc[review.placeName] || 0) + 1;
    }
    return acc;
  }, {});

  const top3Places = Object.entries(reviewPlaceCount)
    .map(([placeName, count]) => ({ placeName, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  console.log("필터링된 top3Places:", top3Places);

  // LitElement 컴포넌트에 데이터 전달
  const reservationList = document.querySelector("reservation-visit-list") as ReservationVisitList;
  if (reservationList) {
    reservationList.top3Places = top3Places;
  }

  // DOM 업데이트
  const hiddenContent = document.getElementById("hiddenContent");
  if (hiddenContent) {
    hiddenContent.innerHTML = ""; // 기존 내용 초기화
    filteredReviews.forEach((review) => {
      const titleComponent = document.createElement("reservation-more-title");
      titleComponent.setAttribute("titleData", JSON.stringify({ placeName: review.placeName, type: review.type, updated: review.updated }));

      const reviewComponent = document.createElement("reservation-more-review");
      reviewComponent.setAttribute("reviews", JSON.stringify([review]));

      hiddenContent.appendChild(titleComponent);
      hiddenContent.appendChild(reviewComponent);
    });
  }

  // 예약 정보 업데이트
  const reservationCount = filteredReviews.length;
  const totalPay = filteredReviews.reduce((sum, review) => sum + (review.price || 0), 0);

  const reservationCountElement = document.getElementById("reservationCount");
  const payCountElement = document.getElementById("payCount");

  if (reservationCountElement && payCountElement) {
    reservationCountElement.innerText = reservationCount.toString();
    payCountElement.innerText = totalPay.toLocaleString();
  }
};

// 초기 데이터 로드 및 이벤트 바인딩
document.addEventListener("DOMContentLoaded", async () => {
  const { placeData, reviewData } = await fetchData();

  // 초기 필터링 및 렌더링
  filterAndRenderReviews(reviewData, placeData);

  // LitElement의 `type-change` 이벤트 수신
  const reservationTypes = document.querySelector("reservation-types");
  if (reservationTypes) {
    reservationTypes.addEventListener("type-change", (event) => {
      const customEvent = event as CustomEvent; // CustomEvent로 타입 캐스팅
      const selectedReservationType = customEvent.detail.selectedType;
      console.log(`받은 타입: ${selectedReservationType}`);

      // 필터링 및 DOM 업데이트
      filterAndRenderReviews(reviewData, placeData);
    });
  }
});

// 더보기 버튼 동작
document.addEventListener("DOMContentLoaded", () => {
  const showMoreButton = document.getElementById("showMoreButton");
  const hiddenContent = document.getElementById("hiddenContent");

  if (!showMoreButton || !hiddenContent) {
    console.error("Required elements not found");
    return;
  }

  showMoreButton.addEventListener("click", () => {
    const isActive = hiddenContent.classList.toggle("active");
    showMoreButton.textContent = isActive ? "접기 ∧" : "더보기 ∨";
    showMoreButton.setAttribute("aria-expanded", isActive.toString());

    if (isActive) {
      hiddenContent.scrollIntoView({ behavior: "smooth" });
    }
  });
});
