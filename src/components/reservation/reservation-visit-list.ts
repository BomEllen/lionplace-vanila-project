import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reservation-visit-list.scss?inline";



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
            <svg role="img" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>캘린더 아이콘</title>
              <path
                d="M12.25 2H11.5V1.25C11.5 0.8375 11.1625 0.5 10.75 0.5C10.3375 0.5 10 0.8375 10 1.25V2H4V1.25C4 0.8375 3.6625 0.5 3.25 0.5C2.8375 0.5 2.5 0.8375 2.5 1.25V2H1.75C0.9175 2 0.2575 2.675 0.2575 3.5L0.25 14C0.25 14.3978 0.408035 14.7794 0.68934 15.0607C0.970644 15.342 1.35218 15.5 1.75 15.5H12.25C13.075 15.5 13.75 14.825 13.75 14V3.5C13.75 2.675 13.075 2 12.25 2ZM12.25 13.25C12.25 13.6625 11.9125 14 11.5 14H2.5C2.0875 14 1.75 13.6625 1.75 13.25V5.75H12.25V13.25ZM3.25 7.25H4.75V8.75H3.25V7.25ZM6.25 7.25H7.75V8.75H6.25V7.25ZM9.25 7.25H10.75V8.75H9.25V7.25Z"
                fill="#19172E"
              />
            </svg>
          </div>
          <span class="visit-count">12회</span>
        </div>
        <progress value="50" max="100"></progress>
      </div>
    `;
  }
}
