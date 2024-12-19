import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './horizon-image.scss?inline'; // SCSS를 인라인으로 불러옵니다.
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

class HorizonImage extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
    body {
      font-family: "Paperlogy", sans-serif;
      font-weight: 300;
    }
  `;

  images: FeedItem[] = [];
  message: string | null = null; // 북마크 메시지 상태
  messageType: 'success' | 'error' | null = null; // 메시지 유형 (성공/실패)

  // 데이터 요청을 위한 비동기 함수
  async fetchImages() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/reviews/records');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      console.log('API 응답 데이터:', data); // 응답 데이터 로그

      if (data.items && Array.isArray(data.items)) {
        this.images = data.items.map((item: any) => {
          const imgFieldName = item.img;  // img 필드 이름 (실제 이미지 필드의 이름 사용)
          const imgUrl = `https://compass-mighty.pockethost.io/api/files/reviews/${item.id}/${imgFieldName}`;
          return {
            ...item,
            isBookmarked: false,
            img: imgUrl
          };
        });
      } else {
        this.images = [];
      }

      console.log('최종 images:', this.images);

      this.requestUpdate();
    } catch (error) {
      console.error('API 요청 실패:', error);
      this.images = [];
    }
  }

  // 북마크 토글 처리
  private toggleBookmark(imageIndex: number) {
    this.images[imageIndex].isBookmarked = !this.images[imageIndex].isBookmarked;
    this.message = this.images[imageIndex].isBookmarked ? "북마크에 추가되었습니다" : "북마크에서 제외되었습니다";
    this.messageType = this.images[imageIndex].isBookmarked ? 'success' : 'error';
    
    // 메시지 표시 후 1초 후에 사라지도록 처리
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
      this.requestUpdate();
    }, 1000);
    
    this.requestUpdate();  // 화면을 새로고침
  }

  // 컴포넌트가 처음 렌더링된 후 호출
  async firstUpdated() {
    await this.fetchImages();
  }

  render() {
    return html`
      <section class="horizon-image-container">
        <div class="image-list">
          ${this.images.length === 0
            ? html`<p>로딩 중...</p>`
            : this.images.map(
                (image, index) => html`
                  <div class="image-item">
                    <!-- 북마크 아이콘 -->
                    <svg 
                      @click="${() => this.toggleBookmark(index)}"
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      width="24" height="24"
                      fill="${image.isBookmarked ? '#FF7710' : '#aaa'}"
                      class="bookmark-icon">
                      <path d="M2.3999 2.4C2.3999 1.08 3.4799 0 4.7999 0H19.1999C19.8364 0 20.4469 0.252856 20.897 0.702944C21.347 1.15303 21.5999 1.76348 21.5999 2.4V24L11.9999 19.2L2.3999 24V2.4Z" />
                    </svg>

                    <div class="image-wrap">
                      <img src="${image.img}" alt="${image.title}" />
                    </div>
                    <div class="text-wrap">
                      <h3 class="title">${image.title}</h3>
                      <p class="description">${image.text}</p>
                      <p class="description">${image.subtitle}</p>
                    </div>
                  </div>
                `
              )}
        </div>
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

customElements.define('horizon-image', HorizonImage);
