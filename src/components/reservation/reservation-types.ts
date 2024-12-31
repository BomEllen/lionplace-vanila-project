import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reservation-types.scss?inline";

@customElement("reservation-types")
class ReservationTypes extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  // Lit Element의 생명주기 메서드인 firstUpdated()를 사용
  firstUpdated() {
    const reservationTypeButtons = this.renderRoot.querySelectorAll(".reservation-types-button");

    // 버튼 클릭 이벤트 설정
    reservationTypeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // 모든 버튼에서 'selected' 클래스 제거
        reservationTypeButtons.forEach((btn) => btn.classList.remove("selected"));

        // 클릭한 버튼에 'selected' 클래스 추가
        button.classList.add("selected");

        // 버튼의 data-type 값을 가져와 localStorage에 저장
        const selectedType = button.getAttribute("data-type");
        if (selectedType) {
          localStorage.setItem("selectedReservationType", selectedType);

          // 선택된 타입을 부모에게 전달
          this.dispatchEvent(
            new CustomEvent("type-change", {
              detail: { selectedType },
              bubbles: true,
              composed: true,
            })
          );
        }
      });
    });

    // 페이지 로드 시 저장된 타입의 버튼을 활성화 상태로 복구
    const savedType = localStorage.getItem("selectedReservationType");
    if (savedType) {
      reservationTypeButtons.forEach((btn) => btn.classList.remove("selected")); // 모든 버튼 초기화
      const savedButton = this.renderRoot.querySelector(`.reservation-types-button[data-type="${savedType}"]`);
      if (savedButton) {
        savedButton.classList.add("selected"); // 저장된 버튼 활성화
      }
    } else {
      // 로컬 스토리지 값이 없으면 '전체' 버튼 활성화 (= 기본값)
      const defaultButton = this.renderRoot.querySelector(`.reservation-types-button[data-type="all"]`);
      if (defaultButton) {
        defaultButton.classList.add("selected");
      }
    }
  }

  render() {
    return html`
      <div class="reservation-types-button-container">
        <button class="reservation-types-button selected" type="button" data-type="all">
          <svg role="img" width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.5 0.5H1.25C0.8 0.5 0.5 0.8 0.5 1.25V6.5C0.5 6.95 0.8 7.25 1.25 7.25H6.5C6.95 7.25 7.25 6.95 7.25 6.5V1.25C7.25 0.8 6.95 0.5 6.5 0.5ZM6.5 8.75H1.25C0.8 8.75 0.5 9.05 0.5 9.5V14.75C0.5 15.2 0.8 15.5 1.25 15.5H6.5C6.95 15.5 7.25 15.2 7.25 14.75V9.5C7.25 9.05 6.95 8.75 6.5 8.75ZM14.75 0.5H9.5C9.05 0.5 8.75 0.8 8.75 1.25V6.5C8.75 6.95 9.05 7.25 9.5 7.25H14.75C15.2 7.25 15.5 6.95 15.5 6.5V1.25C15.5 0.8 15.2 0.5 14.75 0.5ZM14.75 8.75H9.5C9.05 8.75 8.75 9.05 8.75 9.5V14.75C8.75 15.2 9.05 15.5 9.5 15.5H14.75C15.2 15.5 15.5 15.2 15.5 14.75V9.5C15.5 9.05 15.2 8.75 14.75 8.75Z"
              fill="currentColor"
            />
          </svg>
          <span>전체</span>
        </button>
        <button class="reservation-types-button" type="button" data-type="hospital">
          <svg role="img" width="25" height="25" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.875 12.75H10.125V10.125H12.75V7.875H10.125V5.25H7.875V7.875H5.25V10.125H7.875V12.75ZM3.75 15.75C3.3375 15.75 2.98425 15.6033 2.69025 15.3097C2.39675 15.0157 2.25 14.6625 2.25 14.25V3.75C2.25 3.3375 2.39675 2.98425 2.69025 2.69025C2.98425 2.39675 3.3375 2.25 3.75 2.25H14.25C14.6625 2.25 15.0157 2.39675 15.3097 2.69025C15.6033 2.98425 15.75 3.3375 15.75 3.75V14.25C15.75 14.6625 15.6033 15.0157 15.3097 15.3097C15.0157 15.6033 14.6625 15.75 14.25 15.75H3.75Z" />
          </svg>
          <span>병의원</span>
        </button>
        <button class="reservation-types-button" type="button" data-type="beauty">
          <svg role="img" width="22" height="22" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.629 3.70881C13.914 3.3015 14.0256 2.79767 13.9393 2.3081C13.8529 1.81852 13.5757 1.38328 13.1685 1.09806L12.861 0.882812L9.00148 6.39531L5.14123 0.882812L4.83373 1.09806C4.42667 1.38339 4.14957 1.81869 4.06336 2.30826C3.97715 2.79783 4.08887 3.30159 4.37398 3.70881L7.62823 8.35656L6.27823 10.2841C5.52002 10.0414 4.70044 10.0746 3.96433 10.3777C3.22821 10.6809 2.62296 11.2345 2.25552 11.9407C1.88808 12.6469 1.78211 13.4603 1.95634 14.2371C2.13057 15.0139 2.57378 15.7041 3.20765 16.1857C3.84151 16.6674 4.62523 16.9094 5.42031 16.8691C6.21538 16.8289 6.97062 16.5088 7.55256 15.9656C8.13449 15.4223 8.50567 14.6909 8.60049 13.9005C8.69531 13.11 8.50767 12.3115 8.07073 11.6461L9.00073 10.3186L9.93073 11.6446C9.49344 12.3098 9.30535 13.1081 9.39971 13.8986C9.49407 14.689 9.86479 15.4207 10.4464 15.9642C11.028 16.5078 11.783 16.8283 12.578 16.8691C13.373 16.9099 14.1568 16.6683 14.791 16.1871C15.4252 15.706 15.8688 15.0161 16.0436 14.2395C16.2183 13.4628 16.113 12.6494 15.746 11.9429C15.3791 11.2365 14.7743 10.6825 14.0385 10.3788C13.3026 10.0751 12.4831 10.0413 11.7247 10.2833L10.3747 8.35656L13.629 3.70881ZM4.12498 13.5001C4.12498 13.3523 4.15408 13.206 4.21061 13.0695C4.26715 12.9331 4.35002 12.809 4.45448 12.7046C4.55895 12.6001 4.68297 12.5172 4.81946 12.4607C4.95595 12.4042 5.10224 12.3751 5.24998 12.3751C5.39772 12.3751 5.54401 12.4042 5.6805 12.4607C5.81699 12.5172 5.94101 12.6001 6.04547 12.7046C6.14994 12.809 6.23281 12.9331 6.28934 13.0695C6.34588 13.206 6.37498 13.3523 6.37498 13.5001C6.37498 13.7984 6.25645 14.0846 6.04547 14.2956C5.83449 14.5065 5.54835 14.6251 5.24998 14.6251C4.95161 14.6251 4.66546 14.5065 4.45448 14.2956C4.2435 14.0846 4.12498 13.7984 4.12498 13.5001ZM11.625 13.5001C11.625 13.2017 11.7435 12.9155 11.9545 12.7046C12.1655 12.4936 12.4516 12.3751 12.75 12.3751C13.0483 12.3751 13.3345 12.4936 13.5455 12.7046C13.7565 12.9155 13.875 13.2017 13.875 13.5001C13.875 13.7984 13.7565 14.0846 13.5455 14.2956C13.3345 14.5065 13.0483 14.6251 12.75 14.6251C12.4516 14.6251 12.1655 14.5065 11.9545 14.2956C11.7435 14.0846 11.625 13.7984 11.625 13.5001Z"
            />
          </svg>
          <span>뷰티</span>
        </button>
        <button class="reservation-types-button" type="button" data-type="restaurant">
          <svg width="23" height="23" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_64_1433" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="0" width="14" height="18">
              <path d="M5.25 1.5V16.5M3 1.875V5.625C3 7.5 5.25 7.5 5.25 7.5C5.25 7.5 7.5 7.5 7.5 5.625V1.875M12.75 7.5V16.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15 4.5C15 6.15675 13.9927 7.5 12.75 7.5C11.5073 7.5 10.5 6.15675 10.5 4.5C10.5 2.84325 11.5073 1.5 12.75 1.5C13.9927 1.5 15 2.84325 15 4.5Z" fill="currentColor" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </mask>
            <g mask="url(#mask0_64_1433)">
              <path d="M0 0H18V18H0V0Z" fill="currentColor" />
            </g>
          </svg>
          <span>음식점</span>
        </button>
      </div>
    `;
  }
}
