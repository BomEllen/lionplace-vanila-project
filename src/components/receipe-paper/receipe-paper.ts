import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './receipe-paper.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../assets/sass/reset.scss';
import '../../assets/sass/variables.scss';
import '../../assets/sass/font.scss';
import bookmarkOff from "../../assets/images/bookmark-filled.svg"
import bookmarkOn from "../../assets/images/bookmark.svg"

class ReceipePaper extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  // 간단한 리뷰 데이터
  reviews = [
    {
      src: 'https://via.placeholder.com/300x200', // 이미지
      alt: '커피 리뷰 이미지 1',
      title: '맛있는 커피',
      review: '어느 집 커피가 맛있드라. 꼭 마셔보세요!',
      isBookmarked: false, // 북마크 상태
    },
    {
      src: 'https://via.placeholder.com/300x200',
      alt: '커피 리뷰 이미지 2',
      title: '훌륭한 디저트',
      review: '디저트도 같이 먹으면 맛있다고 하네요. 추천!',
      isBookmarked: false, // 북마크 상태
    }
  ];

  // 북마크 토글 처리
  private toggleBookmark(index: number) {
    this.reviews[index].isBookmarked = !this.reviews[index].isBookmarked;
    this.requestUpdate();
  }

  render() {
    return html`
      <section class="receipe-paper-container">
        ${this.reviews.map((review, index) => html`
          <div class="receipe-paper">
            <!-- 북마크 아이콘 -->
            <img 
              src="${review.isBookmarked ? bookmarkOff : bookmarkOn}" 
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
              <p class="review">${review.review}</p>
            </div>
          </div>
        `)}
      </section>
    `;
  }
}

customElements.define('receipe-paper', ReceipePaper);
