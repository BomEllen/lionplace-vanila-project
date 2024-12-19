import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reservation-visit-list.scss?inline";

/* 이미지 import */
import calendar from "../../assets/images/reservation-calendar.svg";


@customElement("reservation-visit-list")
class ReservationVisitList extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`
      <div class="reservation-visit-list">
        <div class="visit-container">
          <div class="visit-content">
            <span class="visit-number">1</span>
            <h2 class="visit-title">미랑컬헤어 상동점</h2>
            <img src="${calendar}" alt="캘린더 아이콘" />
          </div>
          <span class="visit-count">12회</span>
        </div>
        <progress value="50" max="100"></progress>
      </div>
    `;
  }
}
