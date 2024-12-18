import { html, css, LitElement } from 'lit';
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss"
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";

@customElement("resetvation-toggle")
class ReservationToggle extends LitElement {
  static styles = css`
    .toggle-container {
      margin: 0;
      color: var(--text-dark);
      font-family: Paperlogy, sans-serif;
      display: flex;
      justify-content: center;
    }

    .toggle-wrapper {
      border-radius: 37px;
      background-color: #f4f4f4;
      max-width: 9rem;
      width: 100%;
    }

    .toggle-switch {
      width: 9rem;
      height: 2.125rem;
      display: flex;
      position: relative;
      white-space: nowrap;
    }

    .toggle-switch::after {
      content: "";
      position: absolute;
      width: 50%;
      top: 0;
      transition: left cubic-bezier(0.88, -0.35, 0.565, 1.35) 0.4s;
      border-radius: 27.5px;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
      background-color: var(--foundation-primary-color);
      height: 100%;
      z-index: 0;
    }

    .toggle-switch.left::after {
      left: 0;
    }

    .toggle-switch.right::after {
      left: 50%;
    }

    .toggle-switch .toggle {
      display: inline-block;
      width: 50%;
      padding: 12px 0;
      z-index: 1;
      position: relative;
      cursor: pointer;
      transition: color 200ms;
      font-size: var(--font-size-base);
      font-weight: 700;
      line-height: normal;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .toggle-switch .toggle.active {
      color: var(--text-light);
    }
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




