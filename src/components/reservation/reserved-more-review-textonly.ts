import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reserved-more-review-textonly.scss?inline";

@customElement("reservation-review-textonly")
class ReservationReviewTextOnly extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`
      <div class="textonly-review-box">
        <h4>첫 번째 예약</h4>
        <p>인플란트 상담</p>
      </div>
    `;
  }
}
