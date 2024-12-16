import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './review-choice.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../assets/sass/reset.scss';
import '../../assets/sass/variables.scss';
import '../../assets/sass/font.scss';

class ReviewChoice extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

 // 뒤로가기 버튼 클릭 처리
 private goBack() {
    console.log('뒤로가기 클릭');
    // 뒤로가기 동작을 정의, 예: history.back() 또는 특정 페이지로 이동
  }

  // 나가기 버튼 클릭 처리
  private exit() {
    console.log('나가기 클릭');
    // 나가기 동작을 정의, 예: 페이지를 종료하거나 로그아웃 등
  }

  render() {
    return html`
      <!-- 상단 바 -->
      <div class="header">
        <button class="button" @click="${this.goBack}">뒤로가기</button>
        <span>리뷰 초이스</span>
        <button class="button" @click="${this.exit}">나가기</button>
      </div>
    `;
  }
}

customElements.define('review-choice', ReviewChoice);