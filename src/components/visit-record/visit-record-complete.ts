import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./visit-record.scss?inline";
import { VisitData } from "../../@types/type";

@customElement("visit-record-complete")
class visitRecordComplete extends LitElement {
  @property() data: VisitData | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    const { placeName, date, price, reviewText, reviewImg, reviewTags } = this.data as VisitData;

    return html`
      <div class="visit-record-wrap">
        <h2>${placeName}</h2>
        <span class="visit-date">${date}</span>
        <div class="visit-place-wrap">
          <div class="visit-review-wrap">
            <p>${reviewText}</p>
            <p>
              <span>${reviewTags[0]}</span>
              <span>✨ +${reviewTags.length - 1}</span>
            </p>
          </div>
          <img src="${reviewImg}" alt="${placeName}의 리뷰 사진" />
        </div>
        <p class="visit-default-text">${price.toLocaleString()}원</p>
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
