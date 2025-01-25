import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reservation-visit-list.scss?inline";

@customElement("reservation-visit-list")
export class ReservationVisitList extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  // top3Places 데이터 전달
  @property({ type: Array })
  top3Places: { placeName: string; count: number }[] = [];

  render() {
    return html`
      ${this.top3Places.map(
        (place, index) => html`
          <div class="reservation-visit-list">
            <div class="visit-container">
              <div class="visit-content">
                <span class="visit-number">${index + 1}</span>
                <h2 class="visit-title">${place.placeName}</h2>
              </div>
              <span class="visit-count">${place.count}회</span>
            </div>
            <progress value="${place.count * 20}" max="100"></progress>
          </div>
        `
      )}
    `;
  }
}
