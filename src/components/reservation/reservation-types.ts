import { html, css, LitElement } from 'lit';
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss"
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";

@customElement("resetvation-types")
class ReservationTypes extends LitElement {
  static styles = css`
    .reservation-types-button-container {
      margin: 0.375rem;
      display: flex;
      justify-content: space-around;
    }
    
    
    .reservation-types-button {
      width: 5.25rem;
      height: 5.1875rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: var(--background-light);
      border-radius: 12px;
      border: 1px solid var(--foundation-primary-color);
      font-family: Paperlogy, sans-serif;
      font-size: var(--font-size-sm);
      color: var(--foundation-primary-color);
      cursor: pointer;
    }

    .reservation-types-button.selected {
      background-color: var(--foundation-primary-color);
      color: var(--text-light);
    }

    .reservation-types-button span {
      margin-top: 3px;
    }
  `;

  // Lit Element의 생명주기 메서드인 firstUpdated()를 사용
  firstUpdated() {
    const reservationTypeButtons = this.renderRoot.querySelectorAll(".reservation-types-button");

    // 기본으로 '전체' 버튼 선택되어 있도록 구성
    reservationTypeButtons[0].classList.add("selected");

    reservationTypeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        reservationTypeButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
      });
    });
  }

  render() {
    return html`
      <div class="reservation-types-button-container">
        <button class="reservation-types-button" aria-label="예약 내역 전체 보기 버튼">
          <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.5 0.5H1.25C0.8 0.5 0.5 0.8 0.5 1.25V6.5C0.5 6.95 0.8 7.25 1.25 7.25H6.5C6.95 7.25 7.25 6.95 7.25 6.5V1.25C7.25 0.8 6.95 0.5 6.5 0.5ZM6.5 8.75H1.25C0.8 8.75 0.5 9.05 0.5 9.5V14.75C0.5 15.2 0.8 15.5 1.25 15.5H6.5C6.95 15.5 7.25 15.2 7.25 14.75V9.5C7.25 9.05 6.95 8.75 6.5 8.75ZM14.75 0.5H9.5C9.05 0.5 8.75 0.8 8.75 1.25V6.5C8.75 6.95 9.05 7.25 9.5 7.25H14.75C15.2 7.25 15.5 6.95 15.5 6.5V1.25C15.5 0.8 15.2 0.5 14.75 0.5ZM14.75 8.75H9.5C9.05 8.75 8.75 9.05 8.75 9.5V14.75C8.75 15.2 9.05 15.5 9.5 15.5H14.75C15.2 15.5 15.5 15.2 15.5 14.75V9.5C15.5 9.05 15.2 8.75 14.75 8.75Z"
              fill="currentColor"
            />
          </svg>
          <span>전체</span>
        </button>
        <button class="reservation-types-button" aria-label="예약 내역 전체 보기 버튼">
          <svg width="25" height="25" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.875 12.75H10.125V10.125H12.75V7.875H10.125V5.25H7.875V7.875H5.25V10.125H7.875V12.75ZM3.75 15.75C3.3375 15.75 2.98425 15.6033 2.69025 15.3097C2.39675 15.0157 2.25 14.6625 2.25 14.25V3.75C2.25 3.3375 2.39675 2.98425 2.69025 2.69025C2.98425 2.39675 3.3375 2.25 3.75 2.25H14.25C14.6625 2.25 15.0157 2.39675 15.3097 2.69025C15.6033 2.98425 15.75 3.3375 15.75 3.75V14.25C15.75 14.6625 15.6033 15.0157 15.3097 15.3097C15.0157 15.6033 14.6625 15.75 14.25 15.75H3.75Z" />
          </svg>
          <span>병의원</span>
        </button>
        <button class="reservation-types-button" aria-label="예약 내역 전체 보기 버튼">
          <svg width="22" height="22" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.629 3.70881C13.914 3.3015 14.0256 2.79767 13.9393 2.3081C13.8529 1.81852 13.5757 1.38328 13.1685 1.09806L12.861 0.882812L9.00148 6.39531L5.14123 0.882812L4.83373 1.09806C4.42667 1.38339 4.14957 1.81869 4.06336 2.30826C3.97715 2.79783 4.08887 3.30159 4.37398 3.70881L7.62823 8.35656L6.27823 10.2841C5.52002 10.0414 4.70044 10.0746 3.96433 10.3777C3.22821 10.6809 2.62296 11.2345 2.25552 11.9407C1.88808 12.6469 1.78211 13.4603 1.95634 14.2371C2.13057 15.0139 2.57378 15.7041 3.20765 16.1857C3.84151 16.6674 4.62523 16.9094 5.42031 16.8691C6.21538 16.8289 6.97062 16.5088 7.55256 15.9656C8.13449 15.4223 8.50567 14.6909 8.60049 13.9005C8.69531 13.11 8.50767 12.3115 8.07073 11.6461L9.00073 10.3186L9.93073 11.6446C9.49344 12.3098 9.30535 13.1081 9.39971 13.8986C9.49407 14.689 9.86479 15.4207 10.4464 15.9642C11.028 16.5078 11.783 16.8283 12.578 16.8691C13.373 16.9099 14.1568 16.6683 14.791 16.1871C15.4252 15.706 15.8688 15.0161 16.0436 14.2395C16.2183 13.4628 16.113 12.6494 15.746 11.9429C15.3791 11.2365 14.7743 10.6825 14.0385 10.3788C13.3026 10.0751 12.4831 10.0413 11.7247 10.2833L10.3747 8.35656L13.629 3.70881ZM4.12498 13.5001C4.12498 13.3523 4.15408 13.206 4.21061 13.0695C4.26715 12.9331 4.35002 12.809 4.45448 12.7046C4.55895 12.6001 4.68297 12.5172 4.81946 12.4607C4.95595 12.4042 5.10224 12.3751 5.24998 12.3751C5.39772 12.3751 5.54401 12.4042 5.6805 12.4607C5.81699 12.5172 5.94101 12.6001 6.04547 12.7046C6.14994 12.809 6.23281 12.9331 6.28934 13.0695C6.34588 13.206 6.37498 13.3523 6.37498 13.5001C6.37498 13.7984 6.25645 14.0846 6.04547 14.2956C5.83449 14.5065 5.54835 14.6251 5.24998 14.6251C4.95161 14.6251 4.66546 14.5065 4.45448 14.2956C4.2435 14.0846 4.12498 13.7984 4.12498 13.5001ZM11.625 13.5001C11.625 13.2017 11.7435 12.9155 11.9545 12.7046C12.1655 12.4936 12.4516 12.3751 12.75 12.3751C13.0483 12.3751 13.3345 12.4936 13.5455 12.7046C13.7565 12.9155 13.875 13.2017 13.875 13.5001C13.875 13.7984 13.7565 14.0846 13.5455 14.2956C13.3345 14.5065 13.0483 14.6251 12.75 14.6251C12.4516 14.6251 12.1655 14.5065 11.9545 14.2956C11.7435 14.0846 11.625 13.7984 11.625 13.5001Z"
            />
          </svg>
          <span>뷰티</span>
        </button>
        <button class="reservation-types-button" aria-label="예약 내역 전체 보기 버튼">
          <svg width="23" height="23" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.125 4.78125C1.125 4.00425 1.755 3.375 2.53125 3.375H15.4688C16.245 3.375 16.875 4.005 16.875 4.78125V7.05075C16.8751 7.14955 16.8491 7.24662 16.7997 7.3322C16.7504 7.41778 16.6793 7.48885 16.5938 7.53825C16.3369 7.68616 16.1235 7.89915 15.9751 8.15577C15.8268 8.4124 15.7487 8.70358 15.7487 9C15.7487 9.29642 15.8268 9.5876 15.9751 9.84423C16.1235 10.1008 16.3369 10.3138 16.5938 10.4618C16.6793 10.5112 16.7504 10.5822 16.7997 10.6678C16.8491 10.7534 16.8751 10.8504 16.875 10.9493V13.2188C16.875 13.995 16.245 14.625 15.4688 14.625H2.53125C2.15829 14.625 1.8006 14.4768 1.53688 14.2131C1.27316 13.9494 1.125 13.5917 1.125 13.2188V10.9493C1.12486 10.8505 1.15071 10.7535 1.19995 10.6679C1.24918 10.5824 1.32008 10.5112 1.4055 10.4618C1.66238 10.3138 1.87575 10.1008 2.0241 9.84423C2.17246 9.5876 2.25058 9.29642 2.25058 9C2.25058 8.70358 2.17246 8.4124 2.0241 8.15577C1.87575 7.89915 1.66238 7.68616 1.4055 7.53825C1.32008 7.48875 1.24918 7.41765 1.19995 7.33208C1.15071 7.2465 1.12486 7.14948 1.125 7.05075V4.78125ZM12.375 3.9375C12.5242 3.9375 12.6673 3.99676 12.7727 4.10225C12.8782 4.20774 12.9375 4.35082 12.9375 4.5V5.0625C12.9375 5.21168 12.8782 5.35476 12.7727 5.46025C12.6673 5.56574 12.5242 5.625 12.375 5.625C12.2258 5.625 12.0827 5.56574 11.9773 5.46025C11.8718 5.35476 11.8125 5.21168 11.8125 5.0625V4.5C11.8125 4.35082 11.8718 4.20774 11.9773 4.10225C12.0827 3.99676 12.2258 3.9375 12.375 3.9375ZM12.9375 7.3125C12.9375 7.16332 12.8782 7.02024 12.7727 6.91475C12.6673 6.80926 12.5242 6.75 12.375 6.75C12.2258 6.75 12.0827 6.80926 11.9773 6.91475C11.8718 7.02024 11.8125 7.16332 11.8125 7.3125V7.875C11.8125 8.02418 11.8718 8.16726 11.9773 8.27275C12.0827 8.37824 12.2258 8.4375 12.375 8.4375C12.5242 8.4375 12.6673 8.37824 12.7727 8.27275C12.8782 8.16726 12.9375 8.02418 12.9375 7.875V7.3125ZM12.375 9.5625C12.5242 9.5625 12.6673 9.62176 12.7727 9.72725C12.8782 9.83274 12.9375 9.97582 12.9375 10.125V10.6875C12.9375 10.8367 12.8782 10.9798 12.7727 11.0852C12.6673 11.1907 12.5242 11.25 12.375 11.25C12.2258 11.25 12.0827 11.1907 11.9773 11.0852C11.8718 10.9798 11.8125 10.8367 11.8125 10.6875V10.125C11.8125 9.97582 11.8718 9.83274 11.9773 9.72725C12.0827 9.62176 12.2258 9.5625 12.375 9.5625ZM12.9375 12.9375C12.9375 12.7883 12.8782 12.6452 12.7727 12.5398C12.6673 12.4343 12.5242 12.375 12.375 12.375C12.2258 12.375 12.0827 12.4343 11.9773 12.5398C11.8718 12.6452 11.8125 12.7883 11.8125 12.9375V13.5C11.8125 13.6492 11.8718 13.7923 11.9773 13.8977C12.0827 14.0032 12.2258 14.0625 12.375 14.0625C12.5242 14.0625 12.6673 14.0032 12.7727 13.8977C12.8782 13.7923 12.9375 13.6492 12.9375 13.5V12.9375ZM4.5 9C4.5 8.85082 4.55926 8.70774 4.66475 8.60225C4.77024 8.49676 4.91332 8.4375 5.0625 8.4375H9C9.14919 8.4375 9.29226 8.49676 9.39775 8.60225C9.50324 8.70774 9.5625 8.85082 9.5625 9C9.5625 9.14918 9.50324 9.29226 9.39775 9.39775C9.29226 9.50324 9.14919 9.5625 9 9.5625H5.0625C4.91332 9.5625 4.77024 9.50324 4.66475 9.39775C4.55926 9.29226 4.5 9.14918 4.5 9ZM5.0625 10.6875C4.91332 10.6875 4.77024 10.7468 4.66475 10.8523C4.55926 10.9577 4.5 11.1008 4.5 11.25C4.5 11.3992 4.55926 11.5423 4.66475 11.6477C4.77024 11.7532 4.91332 11.8125 5.0625 11.8125H7.3125C7.46169 11.8125 7.60476 11.7532 7.71025 11.6477C7.81574 11.5423 7.875 11.3992 7.875 11.25C7.875 11.1008 7.81574 10.9577 7.71025 10.8523C7.60476 10.7468 7.46169 10.6875 7.3125 10.6875H5.0625Z"
            />
          </svg>
          <span>공연</span>
        </button>
      </div>
    `;
  }
}




