import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./order-table.scss?inline";

@customElement("order-table")
class OrderTable extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`
      <div class="grid-container">
        <a href="/">네이버 주문</a>
        <a href="/">뷔페</a>
        <a href="/">공방•클래스</a>
        <a href="/">놀이공원</a>
        <a href="/">키즈카페</a>
        <a href="/">아쿠아리움</a>
        <a href="/">전시</a>
        <a href="/">공연</a>
        <a href="/">펜션</a>
        <a href="/">헤어샵</a>
        <a href="/">편의점 택배</a>
        <a href="/">편의점 배달</a>

        <a href="/" class="advert" aria-label="광고">
          <div>
            <p>찬 바람 불 땐</p>
            <h2>핫 초코 미떼</h2>
            <p class="mint">(민트초코 맛)</p>
          </div>
          <img src="/hot-mint-choco.png" alt="핫 초코 미떼 민트초코맛" />
        </a>
      </div>
    `;
  }
}
