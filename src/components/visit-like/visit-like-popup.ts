import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./visit-like.scss?inline";

@customElement("visit-like-popup")
class VisitLikePopup extends LitElement {
  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`
      <div class="visit-like-popup">
        <ul>
          <li>미랑컬헤어 상동점</li>
          <li>2023.1.18 (수) 9번째 방문</li>
          <li>인봉 실장</li>
        </ul>
      </div>
    `;
  }
}
