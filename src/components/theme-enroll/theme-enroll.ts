import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './theme-enroll.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';
import '../review-post/review-post.ts'; // review-post 컴포넌트 추가
import { customElement } from "lit/decorators.js";

@customElement("theme-enroll")
class ThemeEnroll extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) title: string = '';
  @property({ type: String }) text: string = '';
  @property({ type: Number }) viewNumber: number = 0;
  @property({ type: String }) backgroundImage: string = '';

  private disabled = false;

  // 뒤로가기 버튼 핸들러
  private goBack() {
    window.location.href = "/src/pages/review/index.html"; // 메인 페이지 URL
  }

  // 폼 데이터 변경 이벤트 처리
  private handleFormDataChanged(event: CustomEvent) {
    const { title, text, backgroundImage, viewNumber } = event.detail;
    this.title = title;
    this.text = text;
    this.backgroundImage = backgroundImage;
    this.viewNumber = viewNumber;
  }

  // 서버로 데이터 전송
  private async addData() {
    if (!this.title.trim()) {
      // 제목이 비어있으면 알림을 띄우고 함수 종료
      alert("제목을 입력해주세요!");
      return;
    }

    const formData = new FormData();

    // 기본 폼 데이터 추가
    formData.append("title", this.title);
    formData.append("text", this.text);
    formData.append("viewNumber", String(this.viewNumber));
    formData.append("collectionId", "pbc_2649913063");
    formData.append("collectionName", "themes");
    formData.append("created", new Date().toISOString());
    formData.append("updated", new Date().toISOString());

    // backgroundImage가 있을 경우 파일명 처리
    if (this.backgroundImage) {
      const fileName = this.extractFileName(this.backgroundImage);
      const response = await fetch(this.backgroundImage);
      const blob = await response.blob(); // base64 데이터를 blob으로 변환

      // formData에 파일 추가
      formData.append("backgroundImage", blob, fileName);
    }

    this.disabled = true;

    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/themes/records', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('서버 오류');
      }

      const result = await response.json();

      if (result.success) {
        // 성공 시 피드 추가 성공 메시지 표시
        alert("피드 추가 성공!");
        this.fetchExistingData(); // 최신 데이터 가져오기
      } else {
        alert("피드 추가 성공!");
      }
    } catch (error) {
      // 오류 처리 (UI로 적절한 피드백을 주도록 수정 필요)
    } finally {
      this.disabled = false;
    }
  }

  // URL에서 파일명 추출 함수
  private extractFileName(url: string): string {
    const urlParts = url.split('/');
    const fileNameWithParams = urlParts[urlParts.length - 1]; // URL의 마지막 부분이 파일명과 파라미터
    const fileName = fileNameWithParams.split('?')[0]; // 파라미터 제거

    return fileName || 'image.png'; // 파일명이 없으면 기본값 사용
  }

  // 기존 데이터 가져오기
  private async fetchExistingData() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/themes/records');
      if (!response.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
      const data = await response.json();
      this.title = data.title || '';
      this.text = data.text || '';
      this.backgroundImage = data.backgroundImage || '';
      this.viewNumber = data.viewNumber || 0;
      this.requestUpdate(); // 컴포넌트 갱신
    } catch (error) {
      // 오류 처리 (UI로 적절한 피드백을 주도록 수정 필요)
    }
  }

  // 렌더링
  render() {
    return html`
      <div class="theme-enroll-wrap">
        <!-- 뒤로 가기 버튼 -->
        <button class="back-button" @click="${this.goBack}" aria-label="뒤로 가기">
          <svg role="img" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>뒤로 가기 버튼</title>
            <path d="M16.625 21.625L10.875 15.875C10.75 15.75 10.6617 15.6146 10.61 15.4687C10.5575 15.3229 10.5312 15.1667 10.5312 15C10.5312 14.8333 10.5575 14.6771 10.61 14.5312C10.6617 14.3854 10.75 14.25 10.875 14.125L16.625 8.375C16.8542 8.14583 17.1458 8.03125 17.5 8.03125C17.8542 8.03125 18.1458 8.14583 18.375 8.375C18.6042 8.60417 18.7188 8.89583 18.7188 9.25C18.7188 9.60417 18.6042 9.89583 18.375 10.125L13.5 15L18.375 19.875C18.6042 20.1042 18.7188 20.3958 18.7188 20.75C18.7188 21.1042 18.6042 21.3958 18.375 21.625C18.1458 21.8542 17.8542 21.9687 17.5 21.9687C17.1458 21.9687 16.8542 21.8542 16.625 21.625Z" fill="white"/>
          </svg>
        </button>

        <!-- 등록 버튼 -->
        <button 
          class="create-button" 
          @click="${this.addData}" 
          aria-label="등록" 
          ?disabled="${this.disabled}"
        >
          <svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>등록 버튼</title>
            <path d="M10 13.5998L15.9 7.6998C16.0834 7.51647 16.3167 7.4248 16.6 7.4248C16.8834 7.4248 17.1167 7.51647 17.3 7.6998C17.4834 7.88314 17.575 8.11647 17.575 8.3998C17.575 8.68314 17.4834 8.91647 17.3 9.0998L10.7 15.6998C10.5 15.8998 10.2667 15.9998 10 15.9998C9.73338 15.9998 9.50005 15.8998 9.30005 15.6998L6.70005 13.0998C6.51672 12.9165 6.42505 12.6831 6.42505 12.3998C6.42505 12.1165 6.51672 11.8831 6.70005 11.6998C6.88338 11.5165 7.11672 11.4248 7.40005 11.4248C7.68338 11.4248 7.91672 11.5165 8.10005 11.6998L10 13.5998Z" fill="white"/>
          </svg>
          <span>등록</span>
        </button>
      </div>

      <!-- review-post 컴포넌트 -->
      <review-post 
        @form-data-changed="${this.handleFormDataChanged}"></review-post>

      <!-- 배경 이미지 경로 -->
      <div class="background-image-path">
        <p>배경 이미지 경로: ${this.backgroundImage ? this.extractFileName(this.backgroundImage) : '없음'}</p>
      </div>
    `;
  }
}
