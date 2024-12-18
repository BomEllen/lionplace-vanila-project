import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss"
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reservation-toggle.scss?inline";

@customElement("reservation-toggle")
class ReservationToggle extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  firstUpdated() {
    const switchContainer = this.shadowRoot?.querySelector<HTMLElement>(".toggle-switch");
    const buttons = this.shadowRoot?.querySelectorAll<HTMLButtonElement>(".toggle");

    /* switchContainer나 buttons가 null이면 종료 */
    if (!switchContainer || !buttons) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("active")) return;

        const direction = button.getAttribute("data-direction");

        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        /* direction이 null이 아닌 경우에만 실행 */
        if (switchContainer && direction) {
          switchContainer.classList.remove("left", "right");
          switchContainer.classList.add(direction as string);
        }
      });
    });
  }

  render() {
    return html`
      <div class="toggle-container">
        <div class="toggle-wrapper">
          <div class="toggle-switch left">
            <div class="toggle active" data-direction="left">예약</div>
            <div class="toggle" data-direction="right">주문</div>
          </div>
        </div>
      </div>
    `;
  }
};




