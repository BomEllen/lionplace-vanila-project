import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './horizon-image.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';
import bookmarkOff from "../../assets/images/bookmark-filled.svg";
import bookmarkOn from "../../assets/images/bookmark.svg";

class HorizonImage extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  // 이미지 데이터
  images: Array<any> = [];
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

      // 'items' 배열을 추출하고, 이미지 경로를 절대 경로로 변환
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
    // 북마크 상태를 반전시키기
    this.images[imageIndex].isBookmarked = !this.images[imageIndex].isBookmarked;
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
                    <img 
                      src="${image.isBookmarked ? bookmarkOff : bookmarkOn}" 
                      alt="북마크 아이콘" 
                      id="bookmark-icon" 
                      @click="${() => this.toggleBookmark(index)}" 
                      class="bookmark-icon"
                    />

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
    `;
  }
}

customElements.define('horizon-image', HorizonImage);
