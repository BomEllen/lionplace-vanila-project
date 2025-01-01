import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import { customElement } from "lit/decorators.js";
import styles from './theme-enroll.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';

@customElement("theme-enroll-page")
class ThemeEnrollPage extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  // title 데이터를 저장하는 속성
  title: string = '';

  // 뒤로가기 버튼 핸들러
  private goBack() {
    window.location.href = "/src/pages/review/index.html"; // 메인 페이지 URL
  }

  // 서버에서 title 데이터 가져오기
  private async fetchTitle() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/themes/records');
      if (!response.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
      
      const data = await response.json();
      this.title = data.title || '제목 없음';  // 기본값 '제목 없음' 설정
      this.requestUpdate(); // 데이터 갱신 후 리렌더링
    } catch (error) {
      console.error('Error fetching title:', error);
    }
  }

  // 컴포넌트가 처음 로드될 때 데이터를 가져옵니다.
  connectedCallback() {
    super.connectedCallback();
    this.fetchTitle();  // 제목 데이터를 불러오는 함수 호출
  }

  // 제목 길이 제한 함수
  private truncateTitle(title: string, maxLength: number = 20): string {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...'; // 제목 길이가 20자를 넘으면 '...'을 추가
    }
    return title;
  }

  render() {
    return html`
      <div class="theme-enroll-wrap">
        <div class="header">
          <!-- 뒤로 가기 버튼 -->
          <button class="back-button" @click="${this.goBack}" aria-label="뒤로 가기">
            <svg role="img" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>뒤로 가기 버튼</title>
              <path d="M16.625 21.625L10.875 15.875C10.75 15.75 10.6617 15.6146 10.61 15.4687C10.5575 15.3229 10.5312 15.1667 10.5312 15C10.5312 14.8333 10.5575 14.6771 10.61 14.5312C10.6617 14.3854 10.75 14.25 10.875 14.125L16.625 8.375C16.8542 8.14583 17.1458 8.03125 17.5 8.03125C17.8542 8.03125 18.1458 8.14583 18.375 8.375C18.6042 8.60417 18.7188 8.89583 18.7188 9.25C18.7188 9.60417 18.6042 9.89583 18.375 10.125L13.5 15L18.375 19.875C18.6042 20.1042 18.7188 20.3958 18.7188 20.75C18.7188 21.1042 18.6042 21.3958 18.375 21.625C18.1458 21.8542 17.8542 21.9687 17.5 21.9687C17.1458 21.9687 16.8542 21.8542 16.625 21.625Z" fill="black"/>
            </svg> 
          </button>

          <!-- 제목 -->
          <div class="title-display">
            ${this.truncateTitle(this.title)}
          </div>

          <!-- 임시 등록 버튼 -->
          <button 
            class="create-button" 
            @click="${this.addData}" 
            aria-label="임시등록"
          ><span>임시 등록</span>
          </button>
        </div>
      </div>
    `;
  }

  // 등록 버튼 핸들러 (추가 로직)
  private addData() {
    // 등록 버튼 클릭 시 처리할 내용 작성
    alert("등록되었습니다.");
  }
}
