import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./reservation-toggle.scss?inline";

@customElement("reservation-toggle")
class ReservationToggle extends LitElement {

  // renderRoot를 기본 DOM으로 설정
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const buttons = this.querySelectorAll<HTMLAnchorElement>(".toggle");

    if (!buttons) return;

    // 현재 URL을 기반으로 버튼의 active 상태 설정
    const currentPath = window.location.pathname;
    buttons.forEach((button) => {
      const href = button.getAttribute("href");
      if (href && currentPath.includes(href)) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    // 스타일을 컴포넌트 DOM에 추가
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    this.appendChild(styleElement);
  }

  render() {
    return html`
      <div class="toggle-container">
        <div class="toggle-wrapper">
          <div class="toggle-switch">
            <!-- 버튼 링크 -->
            <a href="/src/pages/reserved/index.html" class="toggle" data-direction="left">예약</a>
            <a href="/src/pages/order/index.html" class="toggle" data-direction="right">주문</a>
          </div>
        </div>
      </div>
    `;
  }
}
