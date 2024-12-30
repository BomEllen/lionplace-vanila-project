import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import styles from "./visit-like.scss?inline";

@customElement("visit-review")
class VisitReview extends LitElement {
  private textCount: HTMLElement | null = null;
  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  firstUpdated(): void {
    this.textCount = this.renderRoot.querySelector(
      ".text-count"
    ) as HTMLElement;
    console.log(this.textCount);
  }

  handleTextCount(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    if (this.textCount != null) {
      this.textCount.innerHTML = `${target.value.length}<span>/400</span>`;
    }

    //console.log(target.value);
  }
  render() {
    return html`
      <div class="visit-review-section">
        <h3>리뷰를 남겨주세요</h3>
        <div class="review-photo-btn">
          <input type="file" name="file" id="file" accept="image/*" />
          <label for="file">
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 10.75H12.5L9.6875 7L7.4375 10L5.75 7.75L3.5 10.75ZM2 13.75C1.5875 13.75 1.2345 13.6033 0.941 13.3097C0.647 13.0157 0.5 12.6625 0.5 12.25V3.25C0.5 2.8375 0.647 2.4845 0.941 2.191C1.2345 1.897 1.5875 1.75 2 1.75H4.3625L5.75 0.25H10.25L11.6375 1.75H14C14.4125 1.75 14.7657 1.897 15.0597 2.191C15.3533 2.4845 15.5 2.8375 15.5 3.25V12.25C15.5 12.6625 15.3533 13.0157 15.0597 13.3097C14.7657 13.6033 14.4125 13.75 14 13.75H2ZM14 12.25V3.25H10.9625L9.59375 1.75H6.40625L5.0375 3.25H2V12.25H14Z"
                fill="#19172E"
              />
            </svg>
            사진추가
          </label>
        </div>
        <div class="review-area-wrap">
          <textarea
            id="review-area"
            placeholder="리뷰 작성하기"
            maxlength="400"
            @input=${this.handleTextCount}
          ></textarea>
          <p>
            <span id="text-count" class="text-count">0<span>/400</span></span>
          </p>
        </div>

        <div class="review-btn-wrap">
          <button type="button" class="review-notes-btn">
            <span>리뷰 작성 유의사항</span>
          </button>
          <button type="button" class="review-submit-btn">
            <span>등록하기</span>
          </button>
        </div>
      </div>
    `;
  }
}
