import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";

class Navigation extends LitElement {
  static styles: CSSResultGroup = css`

  a{
    text-decoration: none;
    color: var(--text-light);
    transition: 0.2s;
    cursor: pointer;
  }
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: "Paperlogy", sans-serif;
    font-weight: 300;
  }
  
  nav ul {
    height: 2rem; /* 32px */
    display: flex;
    justify-content: space-around;
    background-color: var(--foundation-secondary-color);
    padding: 0.625rem; /* 10px */
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
    border-bottom: 0.1875rem solid var(--foundation-primary-color); /* 3px */
    height: 1.25rem; /* 20px */
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
    <nav role="navigation" aria-label="주요 네비게이션">
    <ul class="navigation-wrap">
      <li>
        <a 
          href="/feed" 
          @click=${this.handleNavigation} 
          aria-label="피드로 이동"
          tabindex="0">
          피드
        </a>
      </li>
      <li>
        <a 
          href="/visit" 
          @click=${this.handleNavigation} 
          aria-label="방문 페이지로 이동"
          tabindex="0">
          방문
        </a>
      </li>
      <li>
        <a 
          href="/review" 
          @click=${this.handleNavigation} 
          aria-label="리뷰 페이지로 이동"
          tabindex="0">
          리뷰
        </a>
      </li>
      <li>
        <a 
          href="/reservation" 
          @click=${this.handleNavigation} 
          aria-label="예약 및 주문 페이지로 이동"
          tabindex="0">
          예약•주문
        </a>
      </li>
    </ul>
  </nav>
  
    `;
  }
}

customElements.define("navi-gation", Navigation);
