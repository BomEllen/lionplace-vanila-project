import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reserved-more-review.scss?inline";

@customElement("reservation-more-review")
class ReservationMoreReview extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Array })
  reviews: { text: string; img: string; index: number }[] = [];

  render() {
    return html`
      ${this.reviews.map(
        (review) => html`
          <div class="reserved-show-more-container">
            <div class="text-area">
              <h4>${review.index}번째 리뷰</h4>
              <p>${review.text}</p>
              <div>
                <span>💚 원하는 스타일로 잘해줘요</span>
                <span>+2</span>
              </div>
            </div>
            <div class="img-area">
              <img src="${review.img}" alt="사용자 리뷰 이미지" />
            </div>
          </div>
        `
      )}
    `;
  }
}





