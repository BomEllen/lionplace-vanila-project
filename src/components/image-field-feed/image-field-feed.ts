import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './img-field-feed.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../assets/sass/reset.scss';
import '../../assets/sass/variables.scss';
import '../../assets/sass/font.scss';
import bookmarkOff from "../../assets/images/bookmark-filled.svg";
import bookmarkOn from "../../assets/images/bookmark.svg";

interface FeedItem {
  id: number;
  imageUrl: string;
  title: string;
  text: string;
  isBookmarked: boolean; // 북마크 상태를 나타내는 속성 추가
}

class ImageFieldFeed extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  feedData: FeedItem[] = []; // API에서 가져온 feed 데이터를 저장

  // 데이터 요청을 위한 비동기 함수
  async fetchFeedData() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/reviews/records'); // 실제 API URL로 변경
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // JSON 형식으로 파싱

      console.log('API 응답 데이터:', data); // 응답 데이터 로그 확인

      // 데이터에서 'items' 배열을 추출
      if (data.items) {
        this.feedData = data.items; // 'items' 배열을 사용
      } else {
        this.feedData = []; // 'items' 배열이 없으면 빈 배열로 처리
      }

      this.requestUpdate(); // 데이터를 받아온 후 UI 업데이트
    } catch (error) {
      console.error('API 요청 실패:', error);
      this.feedData = []; // API 요청 실패 시 빈 배열로 처리
    }
  }

  // 북마크 토글 함수
  toggleBookmark(itemId: number) {
    const item = this.feedData.find((feedItem) => feedItem.id === itemId);
    if (item) {
      item.isBookmarked = !item.isBookmarked; // 북마크 상태 토글
      this.requestUpdate(); // 상태 변경 후 컴포넌트를 다시 렌더링
    }
  }

  // firstUpdated는 컴포넌트가 처음 렌더링된 후 호출되는 메소드
  async firstUpdated() {
    await this.fetchFeedData(); // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  }

  render() {
    return html`
      <!-- 로딩 중 상태 처리 -->
      ${this.feedData.length === 0
        ? html`<p>로딩 중...</p>` // 데이터가 없을 때 표시
        : this.feedData.map(
            (item) => html`
              <section class="image-text-container">
                <img src="${item.imageUrl}" alt="${item.title}" />
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
    `;
  }
}

customElements.define('image-field-feed', ImageFieldFeed);
