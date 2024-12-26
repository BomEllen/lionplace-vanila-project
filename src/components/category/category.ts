import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import styles from "./category.scss?inline"; // SCSS를 인라인으로 불러옵니다.
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import "../horizon-image/horizon-image.ts"; // <horizon-image> 컴포넌트 임포트
import "../image-field-feed/image-field-feed.ts"; // <image-field-feed> 컴포넌트 임포트
import { customElement } from "lit/decorators.js";
@customElement("cate-gory")
class Category extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
    body {
      font-family: "Paperlogy", sans-serif;
      font-weight: 300;
    }
  `;

  activeTab: string = "all"; // 기본적으로 '전체' 탭 활성화
  selectedSortOption: string = "views"; // 기본 정렬 기준은 '조회순'
  reviews: any[] = []; // API로부터 받아온 리뷰 데이터
  loading: boolean = true; // 로딩 상태

  // 탭 클릭 핸들러
  handleTabClick(tab: string) {
    this.activeTab = tab; // 클릭한 탭에 따라 상태 변경
    this.requestUpdate(); // 상태가 변경되면 업데이트
  }

  // 정렬 기준 변경 핸들러
  handleSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSortOption = selectElement.value;
    this.requestUpdate(); // 정렬 기준 변경 시 상태 업데이트
  }

  // API에서 데이터 가져오기
  async fetchData() {
    try {
      const response = await fetch("https://compass-mighty.pockethost.io/api/collections/reviews/records");
      const data = await response.json();
      this.reviews = data.items; // API에서 가져온 데이터 저장
      this.loading = false;
      this.requestUpdate();
    } catch (error) {
      console.error("Error fetching data:", error);
      this.loading = false;
    }
  }

  // 데이터 정렬
  sortData() {
    if (this.selectedSortOption === "views") {
      return this.reviews.sort((a, b) => b.views - a.views); // 조회순
    } else if (this.selectedSortOption === "popularity") {
      return this.reviews.sort((a, b) => b.popularity - a.popularity); // 인기순
    } else if (this.selectedSortOption === "newest") {
      return this.reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // 최신순
    }
    return this.reviews;
  }

  // 컴포넌트가 처음 로드될 때 데이터 가져오기
  firstUpdated() {
    this.fetchData(); // 데이터 fetch
  }

  render() {
    const sortedReviews = this.sortData(); // 정렬된 리뷰 데이터

    return html`
      <article class="category-wrap">
        <!-- 탭 부분: role="tablist"와 각각의 tab에 대한 설명을 추가 -->
        <div class="container">
          <section class="content" role="tablist">
            <!-- 전체 탭 -->
            <button class="tab-content" id="tab1" role="tab" aria-controls="content1" aria-selected="${this.activeTab === "all"}" @click="${() => this.handleTabClick("all")}">
              <svg role="img" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>전체 탭</title>
                <path d="M2.9812 4.48096H14.9812" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.9812 8.98096H14.9812" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.9812 13.481H14.9812" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>전체</span>
            </button>

            <!-- 사진 탭 -->
            <button class="tab-content" id="tab2" role="tab" aria-controls="content2" aria-selected="${this.activeTab === "photo"}" @click="${() => this.handleTabClick("photo")}">
              <svg role="img" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>사진 탭</title>
                <path
                  d="M4.5 12.75H13.5L10.6875 9L8.4375 12L6.75 9.75L4.5 12.75ZM3 15.75C2.5875 15.75 2.2345 15.6033 1.941 15.3097C1.647 15.0157 1.5 14.6625 1.5 14.25V5.25C1.5 4.8375 1.647 4.4845 1.941 4.191C2.2345 3.897 2.5875 3.75 3 3.75H5.3625L6.75 2.25H11.25L12.6375 3.75H15C15.4125 3.75 15.7657 3.897 16.0597 4.191C16.3533 4.4845 16.5 4.8375 16.5 5.25V14.25C16.5 14.6625 16.3533 15.0157 16.0597 15.3097C15.7657 15.6033 15.4125 15.75 15 15.75H3ZM15 14.25V5.25H11.9625L10.5938 3.75H7.40625L6.0375 5.25H3V14.25H15Z"
                  fill="black"
                />
              </svg>
              <span>사진</span>
            </button>
          </section>

          <!-- 정렬 기준: label을 통해 시멘틱하게 접근성 강화 -->
          <label for="sort-options" class="sr-only">정렬 기준</label>
          <select id="sort-options" name="sort-options" aria-label="정렬 기준" @change="${this.handleSortChange}">
            <option value="views" ?selected="${this.selectedSortOption === "views"}">조회순</option>
            <option value="popularity" ?selected="${this.selectedSortOption === "popularity"}">인기순</option>
            <option value="newest" ?selected="${this.selectedSortOption === "newest"}">최신순</option>
          </select>
        </div>

        <!-- 로딩 상태 표시 -->
        ${this.loading
          ? html`<p>로딩 중...</p>`
          : html`
              <!-- 조건부 렌더링: 클릭한 탭에 따라 다른 컴포넌트 렌더링 -->
              ${
                this.activeTab === "all"
                  ? html`<horizon-image .reviews="${sortedReviews}"></horizon-image>` // '전체' 탭 클릭 시 <horizon-image> 표시
                  : html`<image-field-feed .reviews="${sortedReviews}" .sortOption="${this.selectedSortOption}"></image-field-feed>` // '사진' 탭 클릭 시 <image-field-feed> 표시
              }
            `}
      </article>
    `;
  }
}
