import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reserved-more-title.scss?inline";

@customElement("reservation-more-title")
class ReservationMoreTitle extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`

      <div class="visit-record-wrap">

        <!-- 리뷰 카테고리에 따라 이미지 바꿔주기(assets/reserved-more-show에 있음) -->
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0" width="34px" hight="34px">
          <path d="m50 93.75c24.125 0 43.75-19.625 43.75-43.75s-19.625-43.75-43.75-43.75-43.75 19.625-43.75 43.75 19.625 43.75 43.75 43.75zm-26.562-46.906c0-4.9688 4.0312-8.9688 9-8.9688h5.4375v-5.4375c0-4.9688 4.0312-9 8.9688-9h6.3125c4.9375 0 8.9688 4.0312 8.9688 9v5.4375h5.4375c4.9688 0 9 4 9 8.9688v6.3125c0 4.9688-4.0312 8.9688-9 8.9688h-5.4375v5.4375c0 4.9688-4.0312 9-8.9688 9h-6.3125c-4.9375 0-8.9688-4.0312-8.9688-9v-5.4375h-5.4375c-4.9688 0-9-4-9-8.9688z" />
          <path
            d="m32.438 55.875h8.5625c1.7188 0 3.125 1.4062 3.125 3.125v8.5625c0 1.5312 1.2188 2.75 2.7188 2.75h6.3125c1.5 0 2.7188-1.2188 2.7188-2.75v-8.5625c0-1.7188 1.4062-3.125 3.125-3.125h8.5625c1.5312 0 2.75-1.2188 2.75-2.7188v-6.3125c0-1.5-1.2188-2.7188-2.75-2.7188h-8.5625c-1.7188 0-3.125-1.4062-3.125-3.125v-8.5625c0-1.5312-1.2188-2.75-2.7188-2.75h-6.3125c-1.5 0-2.7188 1.2188-2.7188 2.75v8.5625c0 1.7188-1.4062 3.125-3.125 3.125h-8.5625c-1.5312 0-2.75 1.2188-2.75 2.7188v6.3125c0 1.5 1.2188 2.7188 2.75 2.7188z"
          />
        </svg>
        <div class="title">
          <h4>유디계산치과의원</h4>
          <span class="visit-date">22.11.29 화 | 오후 2:00</span>
        </div>

        
        <!-- 하트, 케밥 메뉴 -->
        <div class="bookmark-more-wrap">
          <div class="bookmark-save-btn">
            <input type="checkbox" id="bookmark-check" name="bookmark-check" class="bookmark-input" />
            <label for="bookmark-check" class="bookmark-label">
              <span>즐겨찾기</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                <path class="check-fill" d="M8 14.0125L6.9125 13.0225C3.05 9.52 0.5 7.2025 0.5 4.375C0.5 2.0575 2.315 0.25 4.625 0.25C5.93 0.25 7.1825 0.8575 8 1.81C8.8175 0.8575 10.07 0.25 11.375 0.25C13.685 0.25 15.5 2.0575 15.5 4.375C15.5 7.2025 12.95 9.52 9.0875 13.0225L8 14.0125Z" fill="#C4C4C4" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    `;
  }
}
