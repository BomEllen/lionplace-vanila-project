import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./footer.scss?inline";

@customElement("custom-footer")
class CustomFooter extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;


  render() {
    return html`
      <footer>
        <select name="languages" id="lang" aria-label="언어 선택">
          <option value="한국어">한국어</option>
          <option value="english">ENGLISH</option>
          <option value="日本語">日本語</option>
        </select>

        <div>
          <ul>
            <li><a href="https://help.naver.com/service/30026/category/bookmark?lang=ko" rel="external">네이버 예약 고객센터</a></li>
            <li><a href="https://new.smartplace.naver.com/help/policy" rel="external">이용약관</a></li>
            <li><a href="https://policy.naver.com/rules/privacy.html" rel="external">개인정보처리방침</a></li>
          </ul>

          <p>네이버(주)는 통신판매의 당사자가 아니며, 상품의 정보 및 쿠폰 사용 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</p>
          <p>(주) 네이버 사업자정보</p>
        </div>
      </footer>
    `;
  }
}
