import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './img-field-feed.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';

// FeedItem 인터페이스 정의
interface FeedItem {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  text: string;
  isBookmarked: boolean;
}

class ImageFieldFeed extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
    body{
      font-family: "Paperlogy", sans-serif;
      font-weight: 300;
    }
  `;

  feedData: FeedItem[] = [];
  message: string | null = null; // 북마크 메시지 상태
  messageType: 'success' | 'error' | null = null; // 메시지 유형 (성공/실패)

  // 데이터 요청을 위한 비동기 함수
  async fetchFeedData() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/reviews/records');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // 'items' 배열을 추출하고, 이미지 경로를 절대 경로로 변환
      if (data.items && Array.isArray(data.items)) {
        this.feedData = data.items.map((item: any) => {
          const imgFieldName = item.img;  // img 필드 이름 (실제 이미지 필드의 이름 사용)
          const imgUrl = `https://compass-mighty.pockethost.io/api/files/reviews/${item.id}/${imgFieldName}`;
          return {
            ...item,
            isBookmarked: false,
            img: imgUrl
          };
        });
      } else {
        this.feedData = [];
      }

      this.requestUpdate();
    } catch (error) {
      console.error('API 요청 실패:', error);
      this.feedData = [];
    }
  }

  // 북마크 토글 함수
  toggleBookmark(itemId: number) {
    const item = this.feedData.find((feedItem) => feedItem.id === itemId);
    if (item) {
      // 북마크 상태 변경 후, feedData 배열을 정렬
      if (!item.isBookmarked) {
        item.isBookmarked = true;
        this.message = "북마크에 추가되었습니다";
        this.messageType = 'success';
      } else {
        item.isBookmarked = false;
        this.message = "북마크에서 제외되었습니다";
        this.messageType = 'error';
      }

      this.feedData = [
        ...this.feedData.filter((feedItem) => feedItem.isBookmarked),
        ...this.feedData.filter((feedItem) => !feedItem.isBookmarked),
      ];

      this.requestUpdate();

      // 1초 후 메시지 숨기기
      setTimeout(() => {
        this.message = null;
        this.messageType = null;
        this.requestUpdate();
      }, 1000);
    }
  }

  // 컴포넌트가 처음 렌더링된 후 호출
  async firstUpdated() {
    await this.fetchFeedData();
  }

  render() {
    return html`
      <div class="image-container-wrapper">
        ${this.feedData.length === 0
          ? html`<p>로딩 중...</p>`
          : this.feedData.map(
              (item) => html`
                <section class="image-text-container">
                  <img src="${item.img}" alt="${item.title}" />
                  <button 
                    id="bookmark" 
                    aria-label="${item.isBookmarked ? '북마크에서 제외' : '북마크 추가'}"
                    @click="${() => this.toggleBookmark(item.id)}">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      width="24" height="24"
                      fill="${item.isBookmarked ? '#FF7710' : '#aaa'}">
                      <path d="M2.3999 2.4C2.3999 1.08 3.4799 0 4.7999 0H19.1999C19.8364 0 20.4469 0.252856 20.897 0.702944C21.347 1.15303 21.5999 1.76348 21.5999 2.4V24L11.9999 19.2L2.3999 24V2.4Z" />
                    </svg>
                  </button>
                  <div class="text-overlay">
                    <p>${item.text}</p>
                    <h2>${item.title}</h2>
                  </div>
                </section>
              `
            )}
      </div>

      <!-- 북마크 메시지 -->
      ${this.message 
        ? html`<div class="bookmark-message ${this.messageType}">
            ${this.message}
          </div>` 
        : ''}
    `;
  }
}

customElements.define('image-field-feed', ImageFieldFeed);
