import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "./../../styles/sass/font.scss";
import "./../../styles/sass/reset.scss";
import "./../../styles/sass/variables.scss";
import styles from "./visit-record.scss?inline";

@customElement("visit-record-complete")
class visitRecordComplete extends LitElement {
  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;
  render() {
    return html`
      <div class="visit-record-wrap">
        <h4>비건 베이커리 구떼</h4>
        <span class="visit-date">3.8.수•1번째 방문</span>
        <div class="visit-place-wrap">
          <div class="visit-review-wrap">
            <p>
              진짜 맨날 근처오면 와서 4-5개씩은 사가는 곳입니다. 비건디저트
              특유의 향이 안나서 더 좋아요!
            </p>
            <p>
              <span>✨ 매장이 청결해요</span>
              <span>✨ +2</span>
            </p>
          </div>
          <figure>
            <img src="./../../../src/assets/images/field-img.png" alt="" />
            <figcaption><span class="sr-only">이미지 설명</span></figcaption>
          </figure>
        </div>
        <p class="visit-default-text">파운드 외 2•12,300원</p>
        <div class="bookmark-more-wrap">
          <div class="bookmark-save-btn">
            <input
              type="checkbox"
              id="bookmark-check"
              name="bookmark-check"
              class="bookmark-input"
            />
            <label for="bookmark-check" class="bookmark-label">
              <span>즐겨찾기</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
              >
                <path
                  class="check-fill"
                  d="M8 14.0125L6.9125 13.0225C3.05 9.52 0.5 7.2025 0.5 4.375C0.5 2.0575 2.315 0.25 4.625 0.25C5.93 0.25 7.1825 0.8575 8 1.81C8.8175 0.8575 10.07 0.25 11.375 0.25C13.685 0.25 15.5 2.0575 15.5 4.375C15.5 7.2025 12.95 9.52 9.0875 13.0225L8 14.0125Z"
                  fill="#C4C4C4"
                />
              </svg>
            </label>
          </div>
          <a href="/" class="more-btn">
            <span>더보기</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="12"
              viewBox="0 0 4 12"
              fill="none"
            >
              <path
                d="M1.25 10.5C1.25 10.6989 1.32902 10.8897 1.46967 11.0303C1.61032 11.171 1.80109 11.25 2 11.25C2.19891 11.25 2.38968 11.171 2.53033 11.0303C2.67098 10.8897 2.75 10.6989 2.75 10.5C2.75 10.3011 2.67098 10.1103 2.53033 9.96967C2.38968 9.82902 2.19891 9.75 2 9.75C1.80109 9.75 1.61032 9.82902 1.46967 9.96967C1.32902 10.1103 1.25 10.3011 1.25 10.5ZM1.25 6C1.25 6.19891 1.32902 6.38968 1.46967 6.53033C1.61032 6.67098 1.80109 6.75 2 6.75C2.19891 6.75 2.38968 6.67098 2.53033 6.53033C2.67098 6.38968 2.75 6.19891 2.75 6C2.75 5.80109 2.67098 5.61032 2.53033 5.46967C2.38968 5.32902 2.19891 5.25 2 5.25C1.80109 5.25 1.61032 5.32902 1.46967 5.46967C1.32902 5.61032 1.25 5.80109 1.25 6ZM1.25 1.5C1.25 1.69891 1.32902 1.88968 1.46967 2.03033C1.61032 2.17098 1.80109 2.25 2 2.25C2.19891 2.25 2.38968 2.17098 2.53033 2.03033C2.67098 1.88968 2.75 1.69891 2.75 1.5C2.75 1.30109 2.67098 1.11032 2.53033 0.96967C2.38968 0.829018 2.19891 0.75 2 0.75C1.80109 0.75 1.61032 0.829018 1.46967 0.96967C1.32902 1.11032 1.25 1.30109 1.25 1.5Z"
                stroke="#A6A6A6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    `;
  }
}
