import { html, css, LitElement, CSSResultGroup, unsafeCSS, TemplateResult } from 'lit';
import styles from "../theme/theme.scss?inline";
import eye from "../../assets/images/eye.svg";
import button from "../../assets/images/plus-btn.svg";
// import "../../styles/sass/base.scss"

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

class Theme extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
    body{
    font-family: "Paperlogy", sans-serif;
    font-weight: 300;
    }
  `;

  test: Item[] = [
    {
      id: 1,
      name: 'Item 1',
      description: html`
        <div>
          <p>입력해주세요.<span><img src="${eye}" alt="조회수수" /></span></p>
        </div>
      `,
      subItems: [
        { id: 1, title: 'Sub Item 1.1' },
        { id: 2, title: 'Sub Item 1.2' },
        { id: 3, title: 'Sub Item 1.3' },
        { id: 4, title: 'Sub Item 1.4' },
      ],
    },
  ];

  private currentIndices: number[] = this.test.map(() => 0);  // 초기 인덱스를 0으로 설정
  private slideWidth: number[] = [];
  private backgroundImageUrl: string = '';  // 백그라운드 이미지 URL 저장

  // 데이터 요청을 위한 비동기 함수
  async fetchBackgroundImage() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/reviews/records');  // 실제 API로 교체
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('API 응답 데이터:', data); // 응답 데이터 로그

      // 'items' 배열을 추출하고, 이미지 경로를 절대 경로로 변환
      if (data.items && Array.isArray(data.items)) {
        const imgFieldName = data.items[0].img;  // 이미지 필드 이름 (실제 이미지 필드의 이름 사용)
        const imgUrl = `https://compass-mighty.pockethost.io/api/files/reviews/${data.items[0].id}/${imgFieldName}`;
        console.log('이미지 URL:', imgUrl);

        this.backgroundImageUrl = imgUrl; // 가져온 이미지 URL 저장
        this.requestUpdate();  // URL이 갱신되면 다시 렌더링
      }
    } catch (error) {
      console.error('배경 이미지 요청 실패:', error);
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
    const swiperWrappers = this.shadowRoot?.querySelectorAll('.swiper-wrapper');
    swiperWrappers?.forEach((swiperWrapper, itemIndex) => {
      const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide');
      if (swiperSlides.length > 0) {
        const slideWidth = swiperSlides[0].clientWidth;
        this.slideWidth[itemIndex] = slideWidth;
      }
    });
  }

  // 플러스 버튼 클릭 핸들러
  private handleAddButtonClick() {
    console.log('플러스 버튼 클릭됨!');
    // 아이템 추가 로직 구현 가능
  }

  firstUpdated() {
    this.fetchBackgroundImage();  // 컴포넌트가 처음 렌더링될 때 백그라운드 이미지 요청
    this.setSlideWidth();
    window.addEventListener('resize', () => this.setSlideWidth());
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
      <div class="theme-wrap">
        ${this.test.map((item: Item, itemIndex: number) => html`
          <div class="sub-image" style="background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 50)), url('${this.backgroundImageUrl}');">
            <button>임시저장</button>
            <div class="text-box">
              <h2>${item.name}</h2>
              <div>${item.description}</div>
            </div>
            <div class="swiper-container">
              <div class="swiper-wrapper" style="transform: translateX(-${this.currentIndices[itemIndex] * (this.slideWidth[itemIndex] || 0)}px);">
                ${item.subItems.map((subItem: SubItem) => html`
                  <div class="swiper-slide">
                    <div class="sub-item">
                      <p><img src="${this.backgroundImageUrl}" alt=""/></p>
                    </div>
                  </div>
                `)}
              </div>
              <!-- prev 버튼 비활성화 체크 -->
              <div class="swiper-button-prev" @click="${() => this.prevSlide(itemIndex)}" ?disabled="${this.isPrevDisabled(itemIndex)}">←</div>
              <!-- next 버튼 비활성화 체크 -->
              <div class="swiper-button-next" @click="${() => this.nextSlide(itemIndex)}" ?disabled="${this.isNextDisabled(itemIndex)}">→</div>
              <div class="swiper-pagination">
                ${item.subItems.map((_, slideIndex) => html`
                  <span
                    class="swiper-pagination-bullet ${this.currentIndices[itemIndex] === slideIndex ? 'swiper-pagination-bullet-active' : ''} "
                    @click="${() => this.goToSlide(itemIndex, slideIndex)}"
                  ></span>
                `)}
              </div>
            </div>
          </div>
        `)}

        <!-- 플러스 버튼 영역 -->
        <div class="theme-wrap">
          <div class="sub-image">
            <div class="add-item-card">
              <button @click="${this.handleAddButtonClick}" class="add-button">
                <img src="${button}" alt="플러스 버튼 이미지" />
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('theme-component', Theme);
