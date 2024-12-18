import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './img-field-feed.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';
import bookmarkOff from "../../assets/images/bookmark-filled.svg";
import bookmarkOn from "../../assets/images/bookmark.svg";

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

      console.log('API 응답 데이터:', data); // 응답 데이터 로그

      // 'items' 배열을 추출하고, 이미지 경로를 절대 경로로 변환
      if (data.items && Array.isArray(data.items)) {
        this.feedData = data.items.map((item: any) => {
          const imgFieldName = item.img;  // img 필드 이름 (실제 이미지 필드의 이름 사용)
          const imgUrl = `https://compass-mighty.pockethost.io/api/files/reviews/${item.id}/${imgFieldName}`;
          console.log('이미지 URL:', imgUrl);
          return {
            ...item,
            isBookmarked: false,
            img: imgUrl
          };
        });
      } else {
        this.feedData = [];
      }

      console.log('최종 feedData:', this.feedData);

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
      // 북마크가 true인 경우 "북마크에 추가되었습니다" 메시지
      if (!item.isBookmarked) {
        item.isBookmarked = true;
        this.message = "북마크에 추가되었습니다";
        this.messageType = 'success';
      } else { // 북마크가 false인 경우 "북마크에서 제외되었습니다" 메시지
        item.isBookmarked = false;
        this.message = "북마크에서 제외되었습니다";
        this.messageType = 'error';
      }

      // 북마크 상태 변경 후, feedData 배열을 정렬
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
                  <img 
                    id="bookmark" 
                    src="${item.isBookmarked ? bookmarkOff : bookmarkOn}" 
                    alt="북마크 아이콘" 
                    @click="${() => this.toggleBookmark(item.id)}"
                  />
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
