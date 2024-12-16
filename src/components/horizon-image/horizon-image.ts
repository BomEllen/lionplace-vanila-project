import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './horizon-image.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../assets/sass/reset.scss';
import '../../assets/sass/variables.scss';
import '../../assets/sass/font.scss';
import bookmarkOff from "../../assets/images/bookmark-filled.svg"
import bookmarkOn from "../../assets/images/bookmark.svg"

class HorizonImage extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  // 이미지 데이터
  images = [
    {
      src: 'https://via.placeholder.com/200x200',
      alt: '이미지 1',
      title: '첫 번째 이미지 타이틀',
      description: '첫 번째 이미지에 대한 설명입니다. 이 설명은 길어지면 됩니다.',
      isBookmarked: false, // 북마크 상태 추가
    }
  ];

  // 북마크 토글 처리
  private toggleBookmark(imageIndex: number) {
    // 북마크 상태를 반전시키기
    this.images[imageIndex].isBookmarked = !this.images[imageIndex].isBookmarked;
    this.requestUpdate();  // 화면을 새로고침
  }

  render() {
    return html`
      <section class="horizon-image-container">
        <div class="image-list">
          ${this.images.map(
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
                  <img src="${image.src}" alt="${image.alt}" />
                </div>
                <div class="text-wrap">
                  <h3 class="title">${image.title}</h3>
                  <p class="description">${image.description}</p>
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
