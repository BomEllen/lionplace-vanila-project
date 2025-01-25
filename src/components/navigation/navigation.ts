import { html, css, LitElement, unsafeCSS } from "lit";
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
        window.location.href = "/src/pages/visit-record/";
        break;
      case "리뷰":
        window.location.href = "/src/pages/review/";
        break;
      case "예약•주문":
        window.location.href = "/src/pages/reserved/";
        break;
      default:
        break;
    }
  }

  render() {
    return html`
      <nav role="navigation" aria-label="주요 네비게이션">
        <ul class="navigation-wrap">
          <li>
            <a href="/src/pages/feed/" @click=${this.handleNavigation} aria-label="피드로 이동" tabindex="0"> 피드 </a>
          </li>
          <li>
            <a href="/src/pages/visit-record/" @click=${this.handleNavigation} aria-label="방문 페이지로 이동" tabindex="0"> 방문 </a>
          </li>
          <li>
            <a href="/src/pages/review/" @click=${this.handleNavigation} aria-label="리뷰 페이지로 이동" tabindex="0"> 리뷰 </a>
          </li>
          <li>
            <a href="/src/pages/reserved/" @click=${this.handleNavigation} aria-label="예약 및 주문 페이지로 이동" tabindex="0"> 예약•주문 </a>
          </li>
        </ul>
      </nav>
    `;
  }
}
