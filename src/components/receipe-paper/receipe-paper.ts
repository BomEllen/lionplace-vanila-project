import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './receipe-paper.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';
import bookmarkOff from "../../assets/images/bookmark-filled.svg";
import bookmarkOn from "../../assets/images/bookmark.svg";

class ReceipePaper extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
    body{
    font-family: "Paperlogy", sans-serif;
    font-weight: 300;
    }
  `;

  reviews: Array<any> = []; // 리뷰 데이터
  message: string | null = null; // 북마크 메시지 상태
  messageType: 'success' | 'error' | null = null; // 메시지 유형 (성공/실패)

  // API에서 리뷰 데이터를 비동기적으로 가져오는 함수
  async fetchReviews() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/reviews/records');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // 'items' 배열을 추출하고, 이미지 경로를 절대 경로로 변환
      if (data.items && Array.isArray(data.items)) {
        this.reviews = data.items.map((item: any) => {
          const imgFieldName = item.img;  // img 필드 이름 (실제 이미지 필드의 이름 사용)
          const imgUrl = `https://compass-mighty.pockethost.io/api/files/reviews/${item.id}/${imgFieldName}`;
          return {
            ...item,
            isBookmarked: false, // 기본 북마크 상태
            src: imgUrl, // 절대 경로로 변환된 이미지 URL
          };
        });
      } else {
        this.reviews = [];
      }

      this.requestUpdate();
    } catch (error) {
      console.error('API 요청 실패:', error);
      this.reviews = [];
      this.message = '데이터를 불러오는 데 실패했습니다.';
      this.messageType = 'error';
      this.requestUpdate();
    }
  }

  // 북마크 토글 함수
  private toggleBookmark(index: number) {
    this.reviews[index].isBookmarked = !this.reviews[index].isBookmarked;
    this.message = this.reviews[index].isBookmarked ? '북마크에 추가되었습니다' : '북마크에서 제외되었습니다';
    this.messageType = this.reviews[index].isBookmarked ? 'success' : 'error';
    this.requestUpdate();

    // 1초 후 메시지 숨기기
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
      this.requestUpdate();
    }, 1000);
  }

  // 리뷰 삭제 함수
  private deleteReview(index: number) {
    this.reviews.splice(index, 1); // 배열에서 해당 항목 삭제
    this.requestUpdate(); // 화면 리렌더링
  }

  // 컴포넌트가 처음 렌더링된 후 호출
  async firstUpdated() {
    await this.fetchReviews();
  }

  render() {
    return html`
      <section class="receipe-paper-container">
        ${this.reviews.length === 0
          ? html`<p>로딩 중...</p>`
          : this.reviews.map((review, index) => html`
            <div class="receipe-paper">
              <!-- 닫기 버튼 -->
              <button class="close-button" @click="${() => this.deleteReview(index)}">×</button>
              <!-- 북마크 아이콘 -->
              <img 
                src="${review.isBookmarked ? bookmarkOn : bookmarkOff}" 
                alt="북마크 아이콘" 
                class="bookmark-icon" 
                @click="${() => this.toggleBookmark(index)}"
              />
              <!-- 리뷰 이미지 -->
              <div class="image-wrap">
                <img src="${review.src}" alt="${review.alt}" />
              </div>
              <!-- 리뷰 정보 -->
              <div class="text-wrap">
                <h3 class="title">${review.title}</h3>
                <p class="review">${review.subtitle}</p>
              </div>
            </div>
          `)}
      </section>

      <!-- 북마크 메시지 -->
      ${this.message 
        ? html`<div class="bookmark-message ${this.messageType}">
            ${this.message}
          </div>` 
        : ''}
    `;
  }
}

customElements.define('receipe-paper', ReceipePaper);
