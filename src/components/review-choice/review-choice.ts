import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './review-choice.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';
import { customElement } from "lit/decorators.js";

@customElement("review-choice")
class ReviewChoice extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
    body{
    font-family: "Paperlogy", sans-serif;
    font-weight: 300;
    }
  `;

  // 뒤로가기 버튼 클릭 처리
  private goBack() {
    console.log('뒤로가기 클릭');
    // 뒤로가기 동작: history.back()을 사용하거나 메인 페이지로 이동
    window.location.href = "../../../_main-template.html"; // '/'는 메인 페이지 URL
  }

  // 나가기 버튼 클릭 처리
  private exit() {
    console.log('나가기 클릭');
    // 나가기 동작: 메인 페이지로 이동
    window.location.href =  "../../../_main-template.html"; // '/'는 메인 페이지 URL
  }

  render() {
    return html`
      <!-- 상단 바 -->
      <div class="header">
        <button class="button" @click="${this.goBack}">뒤로가기</button>
        <span>리뷰 선택</span>
        <button class="button" @click="${this.exit}">나가기</button>
      </div>
    `;
  }
}
