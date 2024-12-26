import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './review-post.scss?inline';

@customElement("review-post")
class ReviewPost extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) title: string = '';
  @property({ type: String }) text: string = '';
  @property({ type: Number }) viewNumber: number = 0;
  @property({ type: String }) backgroundImage: string = '';
  @property({ type: Boolean }) titleError: boolean = false; // 제목 초과 오류 여부
  @property({ type: Boolean }) textError: boolean = false;   // 설명 초과 오류 여부

  // 최대 길이 설정
  private readonly MAX_TITLE_LENGTH = 30;
  private readonly MAX_TEXT_LENGTH = 100;

  // 타이틀 입력 핸들러
  handleTitleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length <= this.MAX_TITLE_LENGTH) {
      this.title = input.value;
      this.titleError = false; // 오류 없앰
      this.updateFormData();
    } else {
      this.titleError = true; // 오류 표시
    }
  }

  // 텍스트 입력 핸들러
  handleTextInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length <= this.MAX_TEXT_LENGTH) {
      this.text = input.value;
      this.textError = false; // 오류 없앰
      this.updateFormData();
    } else {
      this.textError = true; // 오류 표시
    }
  }

  // 커버 변경 버튼 클릭 시 파일 선택 창 열기
  handleCoverChange() {
    const input = this.renderRoot?.querySelector('input[type="file"]') as HTMLInputElement;
    input?.click();
  }

  // 파일 선택 후 이미지 처리
  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.backgroundImage = reader.result as string;
        this.updateFormData();
      };
      reader.readAsDataURL(file); // 이미지 파일을 Data URL로 읽기
    }
  }

  // 폼 데이터 변경 처리
  private updateFormData() {
    this.requestUpdate();  // 리렌더링을 트리거
    this.dispatchEvent(new CustomEvent('form-data-changed', {
      detail: { 
        title: this.title, 
        text: this.text, 
        backgroundImage: this.backgroundImage, 
        viewNumber: this.viewNumber 
      },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div class="plus-review-wrap">
        <!-- 제목 입력 영역 -->
        <div class="plus-review-content plus-review-content1">
          <input
            id="review-title"
            class="review-title"
            type="text"
            placeholder="제목을 입력해주세요."
            .value="${this.title}"
            @input="${this.handleTitleInput}"
          />
          <div class="text-count">
            <p><span>${this.title.length}</span>/${this.MAX_TITLE_LENGTH}</p>
          </div>
          <!-- 제목 길이 초과 시 경고 메시지 -->
          ${this.titleError ? html`<p class="error-message">제목은 최대 ${this.MAX_TITLE_LENGTH}자까지 입력할 수 있습니다.</p>` : ''}
        </div>

        <!-- 설명 입력 영역 -->
        <div class="plus-review-content plus-review-content2">
          <input
            id="review-list"
            class="review-list"
            type="text"
            placeholder="리스트 설명을 입력해주세요."
            .value="${this.text}"
            @input="${this.handleTextInput}"
          />
          <div class="text-count">
            <p><span>${this.text.length}</span>/${this.MAX_TEXT_LENGTH}</p>
          </div>
          <!-- 설명 길이 초과 시 경고 메시지 -->
          ${this.textError ? html`<p class="error-message">설명은 최대 ${this.MAX_TEXT_LENGTH}자까지 입력할 수 있습니다.</p>` : ''}
        </div>

        <!-- 커버 변경 영역 -->
        <div class="plus-review-content plus-review-content3">
          <button 
            class="cover-change" 
            aria-label="커버 변경" 
            @click="${this.handleCoverChange}"
          >
            커버 변경
          </button>
          <input 
            type="file" 
            accept="image/*" 
            @change="${this.handleFileChange}" 
            style="display:none"
          />
        </div>
      </div>
    `;
  }
}
