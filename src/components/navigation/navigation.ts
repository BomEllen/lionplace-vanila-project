import { html, css, LitElement, unsafeCSS } from "lit";
import "../../styles/sass/reset.scss";
import styles from "./navigation.scss?inline";
import { customElement } from "lit/decorators.js";

@customElement("custom-navigation")
class Navigation extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  handleNavigation(event: MouseEvent) {
    const target = event.target as HTMLLIElement;
    switch (target.textContent) {
      case "피드":
        window.location.href = "/src/pages/feed/";
        break;
      case "방문":
        window.location.href = "/visit";
        break;
      case "리뷰":
        window.location.href = "/review";
        break;
      case "예약•주문":
        window.location.href = "/reservation";
        break;
      default:
        break;
    }
  }

  render() {
    return html`
      <ul class="navigation-wrap">
        <li @click=${this.handleNavigation}>피드</li>
        <li @click=${this.handleNavigation}>방문</li>
        <li @click=${this.handleNavigation}>리뷰</li>
        <li @click=${this.handleNavigation}>예약•주문</li>
      </ul>
    `;
  }
}
