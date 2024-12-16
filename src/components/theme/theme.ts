import { html, css, LitElement, CSSResultGroup, unsafeCSS, TemplateResult } from 'lit';
import styles from "../theme/theme.scss?inline";
import eye from "../../assets/images/eye.svg"
import button from "../../assets/images/plus-btn.svg"

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
  `;

  test: Item[] = [
    {
      id: 1,
      name: 'Item 1',
      description: html`
        <div>
          <p>입력해주세요.<span><img src="${eye}" alt="Example Image" /></span></p>
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

  private currentIndices: number[] = this.test.map(() => 0);
  private slideWidth: number[] = [];

  private prevSlide(index: number) {
    const itemsLength = this.test[index].subItems.length;
    const moveAmount = 1;
    const newIndex = (this.currentIndices[index] - moveAmount + itemsLength) % itemsLength;
    this.currentIndices[index] = newIndex;
    this.requestUpdate();
  }

  private nextSlide(index: number) {
    const itemsLength = this.test[index].subItems.length;
    const moveAmount = 1;
    const newIndex = (this.currentIndices[index] + moveAmount) % itemsLength;
    this.currentIndices[index] = newIndex;
    this.requestUpdate();
  }

  private goToSlide(index: number, slideIndex: number) {
    this.currentIndices[index] = slideIndex;
    this.requestUpdate();
  }

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

  private handleAddButtonClick() {
    console.log('플러스 버튼 클릭됨!'); // 원하는 동작 추가
    // 아이템 추가 로직 구현 가능
  }

  firstUpdated() {
    this.setSlideWidth();
    window.addEventListener('resize', () => this.setSlideWidth());
  }

  render() {
    return html`
      <div class="theme-wrap">
        ${this.test.map((item: Item, itemIndex: number) => html`
          <div class="sub-image">
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
                      <p>${subItem.title}</p>
                    </div>
                  </div>
                `)}
              </div>
              <div class="swiper-button-prev" @click="${() => this.prevSlide(itemIndex)}">←</div>
              <div class="swiper-button-next" @click="${() => this.nextSlide(itemIndex)}">→</div>
              <div class="swiper-pagination">
                ${item.subItems.map((_, slideIndex) => html`
                  <span
                    class="swiper-pagination-bullet ${this.currentIndices[itemIndex] === slideIndex ? 'swiper-pagination-bullet-active' : ''}"
                    @click="${() => this.goToSlide(itemIndex, slideIndex)}"
                  ></span>
                `)}
              </div>
            </div>
          </div>
        `)}


        <div class="theme-wrap">
            <div class="sub-image">
                <div class="add-item-card">
                    <button @click="${this.handleAddButtonClick}" class="add-button">
                        <img src="${button}" alt="Example Image" />
                    </button>
                </div>
            </div>
        </div>

      </div>
    `;
  }
}

customElements.define('theme-component', Theme);