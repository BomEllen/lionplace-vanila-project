import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./visit-record.scss?inline";
import { VisitData } from "../../@types/type";

@customElement("visit-record-noreview")
class visitRecordNoReview extends LitElement {
  @property() data: VisitData | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  handleWriteReview() {
    location.href = `${location.origin}/src/pages/visit-like/?id=${this.data?.id}`;
  }

  render() {
    const { placeName, date, price } = this.data as VisitData;

    return html`
      <div class="visit-record-wrap">
        <h4>${placeName}</h4>
        <span class="visit-date">${date}</span>
        <p class="visit-default-text">${price.toLocaleString()}원</p>
        <div class="bookmark-more-wrap">
          <div class="bookmark-save-btn">
            <input type="checkbox" id="bookmark-check" name="bookmark-check" class="bookmark-input" />
            <label for="bookmark-check" class="bookmark-label">
              <span>즐겨찾기</span>
              <svg role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                <path class="check-fill" d="M8 14.0125L6.9125 13.0225C3.05 9.52 0.5 7.2025 0.5 4.375C0.5 2.0575 2.315 0.25 4.625 0.25C5.93 0.25 7.1825 0.8575 8 1.81C8.8175 0.8575 10.07 0.25 11.375 0.25C13.685 0.25 15.5 2.0575 15.5 4.375C15.5 7.2025 12.95 9.52 9.0875 13.0225L8 14.0125Z" fill="#C4C4C4" />
              </svg>
            </label>
          </div>
        </div>
        <button @click=${this.handleWriteReview} type="button" class="review-btn">
          <svg role="img" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.25 5.99991L7.25001 8.99991L5.75001 7.49991M8.93451 1.09416L9.85026 1.87416C10.0813 2.07066 10.3678 2.18916 10.6693 2.21391L11.8693 2.30991C12.2103 2.33714 12.5306 2.48494 12.7726 2.72682C13.0146 2.9687 13.1626 3.28885 13.19 3.62991L13.2853 4.82991C13.31 5.13216 13.4293 5.41941 13.6258 5.64966L14.4058 6.56466C14.6281 6.82528 14.7502 7.15661 14.7502 7.49916C14.7502 7.84171 14.6281 8.17304 14.4058 8.43366L13.6258 9.34941C13.4293 9.58041 13.31 9.86691 13.286 10.1692L13.19 11.3692C13.1628 11.7102 13.015 12.0305 12.7731 12.2725C12.5312 12.5145 12.2111 12.6625 11.87 12.6899L10.67 12.7859C10.3679 12.8098 10.081 12.9285 9.85026 13.1249L8.93451 13.9049C8.67383 14.1271 8.34252 14.2491 8.00001 14.2491C7.6575 14.2491 7.3262 14.1271 7.06551 13.9049L6.15051 13.1249C5.91954 12.9283 5.63239 12.8097 5.33001 12.7859L4.13001 12.6899C3.78883 12.6625 3.46859 12.5144 3.22669 12.2722C2.9848 12.03 2.83708 11.7096 2.81001 11.3684L2.71401 10.1692C2.68972 9.86722 2.57084 9.58063 2.37426 9.35016L1.59426 8.43366C1.37236 8.17315 1.25049 7.84212 1.25049 7.49991C1.25049 7.1577 1.37236 6.82667 1.59426 6.56616L2.37426 5.64966C2.57151 5.41866 2.68926 5.13216 2.71326 4.82991L2.80926 3.63066C2.83686 3.28933 2.98508 2.96898 3.22736 2.72698C3.46964 2.48497 3.79016 2.33712 4.13151 2.30991L5.33001 2.21466C5.63221 2.19053 5.91909 2.07163 6.14976 1.87491L7.06551 1.09491C7.3262 0.872753 7.6575 0.750732 8.00001 0.750732C8.34252 0.750732 8.67383 0.872003 8.93451 1.09416Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          리뷰쓰기
        </button>
      </div>
    `;
  }
}
