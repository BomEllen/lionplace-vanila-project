import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./visit-like.scss?inline";

@customElement("like-recommend")
class LikeRecommend extends LitElement {
  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  // firstUpdated() {
  //   const likeRecommend = this.renderRoot.querySelector(".popup-close-btn");
  //   console.log(likeRecommend);
  // }

  render() {
    return html`
      <div class="like-recommend-section">
        <h3>이 곳이 마음에 든다면,</h3>
        <p>‘좋아요' 누르고 취향이 비슷한 사람을<br />추천받으세요.</p>
        <div class="primary-btn">
          <input type="checkbox" id="like-check" class="like-input" />
          <label for="like-check" class="like-label">
            <span>❤️️ 이런 곳 좋아요!</span>
          </label>
        </div>
      </div>
    `;
  }
}
