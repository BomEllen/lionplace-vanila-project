import { html, css, LitElement, CSSResultGroup, unsafeCSS, TemplateResult } from "lit";
import styles from "../theme/theme.scss?inline";
import eye from "../../assets/images/eye.svg";
import button from "../../assets/images/plus-btn.svg";
import { customElement } from "lit/decorators.js";
import "../loading-spinner/loading-spinner.ts";
import { LoadingSpinner } from "../loading-spinner/loading-spinner.ts";

// Item 및 SubItem 인터페이스 정의
interface SubItem {
  id: number;
  title: string;
}

interface Item {
  id: number;
  name: string;
  description: TemplateResult;
  subItems: SubItem[];
  isAddButton?: boolean; // 플러스 버튼 여부를 나타내는 속성 추가
}

@customElement("theme-component")
class Theme extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
    body {
      font-family: "Paperlogy", sans-serif;
      font-weight: 300;
    }
  `;

  test: Item[] = [
    {
      id: 1,
      name: "연남동 / 성수동 카페",
      description: html`
        <div>
          <p>
            입력해주세요.<span>
              <svg role="img" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>조회수 수</title>
                <path
                  d="M6.00008 2.5C8.14508 2.5 9.93158 3.7145 11.3326 6.077L11.4426 6.2665L11.4651 6.3165L11.4801 6.358L11.4871 6.3855L11.4941 6.4265L11.4996 6.4765V6.5315L11.4926 6.587C11.4893 6.60557 11.485 6.62393 11.4796 6.642L11.4601 6.696L11.4421 6.7335L11.4341 6.7485C10.0521 9.1665 8.28408 10.4385 6.15658 10.498L6.00008 10.5C3.80208 10.5 1.98158 9.2255 0.566083 6.748C0.522938 6.67247 0.500244 6.58699 0.500244 6.5C0.500244 6.41301 0.522938 6.32753 0.566083 6.252C1.98158 3.7745 3.80208 2.5 6.00008 2.5ZM6.00008 5C5.60226 5 5.22073 5.15804 4.93942 5.43934C4.65812 5.72064 4.50008 6.10218 4.50008 6.5C4.50008 6.89782 4.65812 7.27936 4.93942 7.56066C5.22073 7.84196 5.60226 8 6.00008 8C6.39791 8 6.77944 7.84196 7.06074 7.56066C7.34205 7.27936 7.50008 6.89782 7.50008 6.5C7.50008 6.10218 7.34205 5.72064 7.06074 5.43934C6.77944 5.15804 6.39791 5 6.00008 5Z"
                  fill="#19172E"
                />
              </svg>
            </span>
          </p>
          <p>
            뚜비 디저트 카페<span> <img src="${eye}" alt="조회수수" /></span> <span>12</span>
          </p>
        </div>
      `,
      subItems: [
        { id: 1, title: "Sub Item 1.1" },
        { id: 2, title: "Sub Item 1.2" },
        { id: 3, title: "Sub Item 1.3" },
        { id: 4, title: "Sub Item 1.4" },
      ],
    },
  ];

  private currentIndices: number[] = this.test.map(() => 0); // 초기 인덱스를 0으로 설정
  private slideWidth: number[] = [];
  private backgroundImageUrl: string = ""; // 백그라운드 이미지 URL 저장

  get spinner() {
    return this.renderRoot.querySelector("loading-spinner") as LoadingSpinner;
  }

  // 데이터 요청을 위한 비동기 함수
  async fetchBackgroundImage() {
    try {
      this.spinner?.show();

      const response = await fetch("https://compass-mighty.pockethost.io/api/collections/reviews/records"); // 실제 API로 교체
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
  
      // 'items' 배열을 추출하고, 이미지 경로를 절대 경로로 변환
      if (data.items && Array.isArray(data.items)) {
        const imgFieldName = data.items[0].backgroundImage; // 이미지 필드 이름 (실제 이미지 필드의 이름 사용)
        
        // imgFieldName 값이 정상적으로 추출되었는지 확인
        
        const imgUrl = `https://compass-mighty.pockethost.io/api/files/pbc_2649913063/1gy3b3v0ba3rc5z/image01_acznxbmutf.jpg?token=`;
  
        this.backgroundImageUrl = imgUrl; // 가져온 이미지 URL 저장
        this.requestUpdate(); // URL이 갱신되면 다시 렌더링
      }

      this.spinner?.hide();
    } catch (error) {
      console.error("배경 이미지 요청 실패:", error);
    }
  }

  // 이전 슬라이드로 이동
  private prevSlide(index: number) {
    const itemsLength = this.test[index].subItems.length;
    const moveAmount = 1;
    // 첫 번째 슬라이드에서 이전으로 가면 마지막 슬라이드로 돌아가도록 처리
    const newIndex = (this.currentIndices[index] - moveAmount + itemsLength) % itemsLength;
    this.currentIndices[index] = newIndex;
    this.requestUpdate();
  }

  // 다음 슬라이드로 이동 (1번이 화면에 보이면 바로 0번으로 돌아가도록 설정)
  private nextSlide(index: number) {
    const itemsLength = this.test[index].subItems.length;
    const moveAmount = 1;
    const currentIndex = this.currentIndices[index];

    // 슬라이드가 1번에 도달하면 0번으로 돌아가도록 설정
    if (currentIndex === 1) {
      this.currentIndices[index] = 0;
    } else {
      const newIndex = (currentIndex + moveAmount) % itemsLength;
      this.currentIndices[index] = newIndex;
    }
    this.requestUpdate();
  }

  // 특정 슬라이드로 이동
  private goToSlide(index: number, slideIndex: number) {
    this.currentIndices[index] = slideIndex;
    this.requestUpdate();
  }

  // 슬라이드 폭 계산
  private setSlideWidth() {
    this.slideWidth = [];
    const swiperWrappers = this.shadowRoot?.querySelectorAll(".swiper-wrapper");
    swiperWrappers?.forEach((swiperWrapper, itemIndex) => {
      const swiperSlides = swiperWrapper.querySelectorAll(".swiper-slide");
      if (swiperSlides.length > 0) {
        const slideWidth = swiperSlides[0].clientWidth;
        this.slideWidth[itemIndex] = slideWidth;
      }
    });
  }

  // 플러스 버튼 클릭 핸들러
  private handleAddButtonClick() {
    window.location.href = "/src/pages/plus-review/"; // 또는 window.location.assign("/plus-review");
  }

  private handleMoveButtonClick() {
    window.location.href = "/src/pages/theme-enroll-wrap/"; // 또는 window.location.assign("/plus-review");
  }

  firstUpdated() {
    this.fetchBackgroundImage(); // 컴포넌트가 처음 렌더링될 때 백그라운드 이미지 요청
    this.setSlideWidth();
    window.addEventListener("resize", () => this.setSlideWidth());
  }

  // prev/next 버튼 비활성화 여부 체크
  private isPrevDisabled(index: number): boolean {
    return this.currentIndices[index] === 0;
  }

  private isNextDisabled(index: number): boolean {
    const itemsLength = this.test[index].subItems.length;
    return this.currentIndices[index] === itemsLength - 1;
  }

  render() {
    return html`
      <loading-spinner></loading-spinner>
      <div class="theme-wrap">
        ${this.test.map(
          (item: Item, itemIndex: number) => html`
            <div class="sub-image" @click="${this.handleMoveButtonClick}" style="background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 50)), url('${this.backgroundImageUrl}');">
              <button>임시저장</button>
              <div class="text-box">
                <h2>${item.name}</h2>
                <div>${item.description}</div>
              </div>
              <div class="swiper-container">
                <div class="swiper-wrapper" style="transform: translateX(-${this.currentIndices[itemIndex] * (this.slideWidth[itemIndex] || 0)}px);">
                  ${item.subItems.map(
                    (subItem: SubItem) => html`
                      <div class="swiper-slide">
                        <div class="sub-item">
                          <p><img src="${this.backgroundImageUrl}" alt="" /></p>
                        </div>
                      </div>
                    `
                  )}
                </div>
                <!-- prev 버튼 비활성화 체크 -->
                <div class="swiper-button-prev" @click="${() => this.prevSlide(itemIndex)}" ?disabled="${this.isPrevDisabled(itemIndex)}">←</div>
                <!-- next 버튼 비활성화 체크 -->
                <div class="swiper-button-next" @click="${() => this.nextSlide(itemIndex)}" ?disabled="${this.isNextDisabled(itemIndex)}">→</div>
                <div class="swiper-pagination">${item.subItems.map((_, slideIndex) => html` <span class="swiper-pagination-bullet ${this.currentIndices[itemIndex] === slideIndex ? "swiper-pagination-bullet-active" : ""} " @click="${() => this.goToSlide(itemIndex, slideIndex)}"></span> `)}</div>
              </div>
            </div>
          `
        )}

        <!-- 플러스 버튼 기능 영역 -->
        <div class="theme-wrap">
          <div class="sub-image">
            <div class="add-item-card">
              <button @click="${this.handleAddButtonClick}" class="add-button">
                <svg role="img" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <title>플러스 버튼 이미지</title>
                  <path d="M9 16.875C6.91142 16.875 4.90838 16.0453 3.43153 14.5685C1.95469 13.0916 1.125 11.0886 1.125 9C1.125 6.91142 1.95469 4.90838 3.43153 3.43153C4.90838 1.95469 6.91142 1.125 9 1.125C11.0886 1.125 13.0916 1.95469 14.5685 3.43153C16.0453 4.90838 16.875 6.91142 16.875 9C16.875 11.0886 16.0453 13.0916 14.5685 14.5685C13.0916 16.0453 11.0886 16.875 9 16.875Z" fill="#FF7710" stroke="#FF7710" />
                  <path d="M6.1875 8.4375H11.8125C11.9617 8.4375 12.1048 8.49676 12.2102 8.60225C12.3157 8.70774 12.375 8.85082 12.375 9C12.375 9.14918 12.3157 9.29226 12.2102 9.39775C12.1048 9.50324 11.9617 9.5625 11.8125 9.5625H6.1875C6.03832 9.5625 5.89524 9.50324 5.78975 9.39775C5.68426 9.29226 5.625 9.14918 5.625 9C5.625 8.85082 5.68426 8.70774 5.78975 8.60225C5.89524 8.49676 6.03832 8.4375 6.1875 8.4375Z" fill="white" />
                  <path d="M8.4375 11.8125V6.1875C8.4375 6.03832 8.49676 5.89524 8.60225 5.78975C8.70774 5.68426 8.85082 5.625 9 5.625C9.14918 5.625 9.29226 5.68426 9.39775 5.78975C9.50324 5.89524 9.5625 6.03832 9.5625 6.1875V11.8125C9.5625 11.9617 9.50324 12.1048 9.39775 12.2102C9.29226 12.3157 9.14918 12.375 9 12.375C8.85082 12.375 8.70774 12.3157 8.60225 12.2102C8.49676 12.1048 8.4375 11.9617 8.4375 11.8125Z" fill="white" />
                </svg>
                <p>
                  내 리뷰만<br />
                  모아 <br />테마만들기
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
