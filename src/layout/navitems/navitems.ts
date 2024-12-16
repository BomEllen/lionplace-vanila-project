import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./../../styles/sass/font.scss";
import "./../../styles/sass/reset.scss";
import "./../../styles/sass/variables.scss";
import "./navitems.scss";

// SVG 이미지 파일 import
import mapImage from "./../../assets/navitems/map.svg";
import saveImage from "./../../assets/navitems/save.svg";
import subwayImage from "./../../assets/navitems/subway.svg";
import carImage from "./../../assets/navitems/car.svg";
import myImage from "./../../assets/navitems/my.svg";

@customElement("nav-items")
class NavItems extends LitElement {
  static styles = css`
    .nav-items {
      width: 100vw;
      height: 4.1875rem;
      background-color: var(--foundation-accent-color);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ul {
      display: flex;
      justify-content: space-between;
      list-style: none;
      margin: 0 var(--space-xs);
      padding: 0;
      width: 100%;
    }

    li {
      position: relative;
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: var(--foundation-secondary-color);
      padding: 0.625rem;
      border-top: 0.1875rem solid transparent;
    }

    a.selected {
      border-top: 0.1875rem solid var(--foundation-primary-color);

      span {
        color: var(--foundation-primary-color);
      }
    }

    img {
      width: 1.5rem;
      height: 1.5rem;
      padding-bottom: 0.25rem;
    }

    span {
      font-family: "Paperlogy", sans-serif;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      color: var(--content-primary-color);
    }
  `;

  handleNavItems(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const links = this.shadowRoot?.querySelectorAll("a");

    links?.forEach((link) => link.classList.remove("selected"));

    const parentLi = target.closest("li");
    if (parentLi) {
      parentLi.querySelector("a")?.classList.add("selected");
      window.location.href = "/";
    }
  }

  render() {
    return html`
      <nav class="nav-items">
        <ul>
          <li @click=${this.handleNavItems}>
            <a href="/" alt="지도 페이지로 이동">
              <img src="${mapImage}" alt="지도" />
              <span class="nav-label">지도</span>
            </a>
          </li>
          <li @click=${this.handleNavItems}>
            <a href="/" alt="저장 페이지로 이동">
              <img src="${saveImage}" alt="저장" />
              <span class="nav-label">저장</span>
            </a>
          </li>
          <li @click=${this.handleNavItems}>
            <a href="/" alt="대중교통 페이지로 이동">
              <img src="${subwayImage}" alt="대중교통" />
              <span class="nav-label">대중교통</span>
            </a>
          </li>
          <li @click=${this.handleNavItems}>
            <a href="/" alt="내비게이션 페이지로 이동">
              <img src="${carImage}" alt="내비게이션" />
              <span class="nav-label">내비게이션</span>
            </a>
          </li>
          <li @click=${this.handleNavItems}>
            <a href="/" alt="마이 페이지로 이동">
              <img src="${myImage}" alt="마이페이지" />
              <span class="nav-label">MY</span>
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}
