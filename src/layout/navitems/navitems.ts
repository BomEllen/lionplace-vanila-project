import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "./../../styles/sass/font.scss";
import "./../../styles/sass/reset.scss";
import "./../../styles/sass/variables.scss";
import styles from "./navitems.scss?inline";

@customElement("nav-items")
class NavItems extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
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
            <a href="/">
              <svg role="img" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" fill="#19172E">
                <title>지도</title>
                <path d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z" />
                <path d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z" />
              </svg>
              <span class="nav-label">지도</span>
            </a>
          </li>
          <li @click=${this.handleNavItems}>
            <a href="/">
              <svg role="img" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" fill="#19172E">
                <title>저장</title>
                <path d="M20.137,24a2.8,2.8,0,0,1-1.987-.835L12,17.051,5.85,23.169a2.8,2.8,0,0,1-3.095.609A2.8,2.8,0,0,1,1,21.154V5A5,5,0,0,1,6,0H18a5,5,0,0,1,5,5V21.154a2.8,2.8,0,0,1-1.751,2.624A2.867,2.867,0,0,1,20.137,24ZM6,2A3,3,0,0,0,3,5V21.154a.843.843,0,0,0,1.437.6h0L11.3,14.933a1,1,0,0,1,1.41,0l6.855,6.819a.843.843,0,0,0,1.437-.6V5a3,3,0,0,0-3-3Z" />
              </svg>
              <span class="nav-label">저장</span>
            </a>
          </li>
          <li @click=${this.handleNavItems}>
            <a href="/">
              <svg role="img" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512" fill="#19172E">
                <title>대중교통</title>
                <path d="M21.867,1.612,17.515.155A2.956,2.956,0,0,0,15.724.12L8.538,2.092,4.155.233A3,3,0,0,0,0,3V21.754l7.982,2.281,8.021-2,8,1.948V4.483A3,3,0,0,0,21.867,1.612ZM15,2.384V20.219l-6,1.5V3.972ZM2,3A1,1,0,0,1,3.387,2.08L7,3.581V21.674L2,20.246Zm20,18.43-5-1.218V2.092l4.275,1.43A1,1,0,0,1,22,4.483Z" />
              </svg>
              <span class="nav-label">대중교통</span>
            </a>
          </li>
          <li @click=${this.handleNavItems}>
            <a href="/">
              <svg role="img" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512" fill="#19172E">
                <title>내비게이션</title>
                <path
                  d="M20.9,4.291A5.011,5.011,0,0,0,16.2,1H7.8A5.011,5.011,0,0,0,3.1,4.291L.4,11.718A6.664,6.664,0,0,0,0,14v1a4.979,4.979,0,0,0,2,3.978c0,.008,0,.014,0,.022v2a3,3,0,0,0,6,0V20h8v1a3,3,0,0,0,6,0V19c0-.008,0-.014,0-.022A4.979,4.979,0,0,0,24,15V14a6.654,6.654,0,0,0-.4-2.281ZM4.982,4.975A3.009,3.009,0,0,1,7.8,3h8.4a3.009,3.009,0,0,1,2.82,1.975L21.208,11H2.791ZM6,21a1,1,0,0,1-2,0V19.9A5,5,0,0,0,5,20H6Zm14,0a1,1,0,0,1-2,0V20h1a5,5,0,0,0,1-.1Zm2-6a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V14a4.659,4.659,0,0,1,.121-1H4v1a1,1,0,0,0,2,0V13H18v1a1,1,0,0,0,2,0V13h1.879A4.652,4.652,0,0,1,22,14Z"
                />
              </svg>
              <span class="nav-label">내비게이션</span>
            </a>
          </li>
          <li @click=${this.handleNavItems}>
            <a href="/">
              <svg role="img" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512" fill="#19172E">
                <title>마이 페이지</title>
                <path
                  d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-4,21.164v-.164c0-2.206,1.794-4,4-4s4,1.794,4,4v.164c-1.226.537-2.578.836-4,.836s-2.774-.299-4-.836Zm9.925-1.113c-.456-2.859-2.939-5.051-5.925-5.051s-5.468,2.192-5.925,5.051c-2.47-1.823-4.075-4.753-4.075-8.051C2,6.486,6.486,2,12,2s10,4.486,10,10c0,3.298-1.605,6.228-4.075,8.051Zm-5.925-15.051c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,6c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2Z"
                />
              </svg>
              <span class="nav-label">MY</span>
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}
