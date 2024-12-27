import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reserved-more-review.scss?inline";

@customElement("reservation-more-review")
class ReservationMoreReview extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;



  render() {
    return html`
      <div class="reserved-show-more-container">
        <div class="text-area">
          <h4>첫 번째 예약</h4>
          <p>뭘 해도 사진에 머리가 안 담겨요ㅜㅜㅜ 진짜 너무 예뻐요 제가 원하는 스타일로 딱 해주셔서 얼마나 깜짝놀랐는지 몰라요! 여러분들도 추천합니다!</p>

          <div>
            <span>💚 원하는 스타일로 잘해줘요</span>
            <span>+2</span>
          </div>
        </div>
        <div class="img-area">       
          <img src="/hot-mint-choco.png" alt="사용자 리뷰 이미지" />
        </div>
      </div>
    `;
  }
}
