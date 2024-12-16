import { html, css, LitElement } from "lit";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";

class Navigation extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}

    nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
      font-family: "Paperlogy", sans-serif;
      font-weight: 300;
    }

    nav ul {
      height: 32px;
      display: flex;
      justify-content: space-around;
      background-color: var(--foundation-secondary-color);
      padding: 10px;
      box-sizing: border-box;
      overflow: hidden;
      line-height: 0.8;
    }

    nav ul li {
      color: var(--text-light);
      transition: 0.2s;
      cursor: pointer;
    }

    nav ul li:hover {
      color: var(--foundation-primary-color);
      border-bottom: 3px solid var(--foundation-primary-color);
      height: 20px;
    }
  `;

  handleNavigation(event: MouseEvent) {
    const target = event.target as HTMLLIElement;
    switch (target.textContent) {
      case "피드":
        window.location.href = "/feed";
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
      <nav>
        <ul class="navigation-wrap">
          <li @click=${this.handleNavigation} data-destination="/feed">피드</li>
          <li @click=${this.handleNavigation} data-destination="/visit">방문</li>
          <li @click=${this.handleNavigation} data-destination="/review">리뷰</li>
          <li @click=${this.handleNavigation} data-destination="/reservation">예약•주문</li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("navi-gation", Navigation);
