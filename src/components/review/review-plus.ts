import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './review-plus.scss?inline';
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';
import { customElement } from "lit/decorators.js";

@customElement("review-plus")
class ReviewPlus extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  private showModal = false;
  private reviews: Array<{ userName: string, text: string, img: string, id: string }> = [];
  private selectedReviews: Set<number> = new Set();
  private noDataMessage = '';
  private selectedReviewContents: Array<{ userName: string, text: string, img: string, id: string }> = [];
  private isDragMode: boolean = false;
  
  private loggedInUserName = localStorage.getItem('userName') || ''; // 로그인한 유저의 userName

  // 이미지 URL을 resolve하는 메서드
  private resolveImageUrl(imgFieldName: string, id: string): string {
    const baseUrl = 'https://compass-mighty.pockethost.io/api/files/reviews';
    return `${baseUrl}/${id}/${imgFieldName}`;
  }

  // 리뷰 추가하기 버튼 클릭 시 동작하는 함수
  private async openReviewPopup() {
    if (this.selectedReviewContents.length >= 10) {
      alert("리뷰는 최대 10개까지 추가할 수 있습니다.");
      return;
    }

    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/reviews/records');
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        // 로그인된 사용자의 리뷰만 필터링하는 부분을 제거
        this.reviews = data.items.map((item: any) => ({
          userName: item.userName,
          text: item.text,
          img: item.img,
          id: item.id,
        }));
        
        if (this.reviews.length === 0) {
          this.noDataMessage = '리뷰가 없습니다.';
        } else {
          this.noDataMessage = '';
        }
      } else {
        this.reviews = [];
        this.noDataMessage = '데이터가 없습니다.';
      }
      this.showModal = true;
      this.requestUpdate();
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      this.noDataMessage = '데이터 로드 실패. 다시 시도해주세요.';
    }
  }

  private closeModal() {
    this.showModal = false;
    this.requestUpdate();
  }

  private toggleReviewSelection(index: number) {
    if (this.selectedReviews.has(index)) {
      this.selectedReviews.delete(index);
    } else {
      this.selectedReviews.add(index);
    }
    this.updateSelectedReviews();
  }

  private updateSelectedReviews() {
    this.selectedReviewContents = this.reviews.filter((_, index) => this.selectedReviews.has(index));
    this.requestUpdate();
  }

  // 순서 변경 모드 시작
  private startDragMode() {
    this.isDragMode = !this.isDragMode;
    this.requestUpdate();
  }

  private onDragStart(event: DragEvent, index: number) {
    if (!this.isDragMode) return;
    const draggedElement = event.target as HTMLElement;
    draggedElement.classList.add('dragging');
    event.dataTransfer?.setData('text/plain', index.toString());
  }

  private onDragOver(event: DragEvent, index: number) {
    if (!this.isDragMode) return;
    event.preventDefault();
    const targetElement = event.target as HTMLElement;
    if (!targetElement.classList.contains('dragging')) {
      targetElement.classList.add('drag-over');
    }
  }

  private onDragLeave(event: DragEvent, index: number) {
    if (!this.isDragMode) return;
    const targetElement = event.target as HTMLElement;
    targetElement.classList.remove('drag-over');
  }

  private onDrop(event: DragEvent, index: number) {
    if (!this.isDragMode) return;
    const draggedIndex = parseInt(event.dataTransfer?.getData('text/plain') || '0');
    this.swapReviews(draggedIndex, index);
    const targetElement = event.target as HTMLElement;
    targetElement.classList.remove('drag-over');
  }

  private swapReviews(fromIndex: number, toIndex: number) {
    const temp = this.selectedReviewContents[fromIndex];
    this.selectedReviewContents[fromIndex] = this.selectedReviewContents[toIndex];
    this.selectedReviewContents[toIndex] = temp;
    this.requestUpdate();
  }

  private onDragEnd(event: DragEvent) {
    const draggedElement = event.target as HTMLElement;
    draggedElement.classList.remove('dragging');
  }

  private deleteAllReviews() {
    this.selectedReviews.clear();
    this.selectedReviewContents = [];
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="review-plus-wrap">
        <div class="review-plus-top">
          <p class="review-count" aria-live="polite">
            리뷰 <span aria-hidden="true">${this.selectedReviewContents.length}</span>/10
          </p>

          <div class="button-wrap">
            <button class="temporary-save" aria-label="임시 저장">임시저장</button>
            <button
              class="change-order ${this.isDragMode ? 'active' : ''}"
              aria-label="순서 변경"
              @click="${this.startDragMode}"
            >
              순서 변경
            </button>
            <button class="delete-all" aria-label="전체 삭제" @click="${this.deleteAllReviews}">전체삭제</button>
          </div>
        </div>

        <div class="center-content">
          ${this.selectedReviewContents.length === 0
            ? html`<p class="center-text">내가 작성한 리뷰를 추가해 <br />새로운 테마 리스트를 만들어보세요.</p>`
            : html`
                <div class="selected-reviews">
                  <ul>
                    ${this.selectedReviewContents.map(
                      (review, index) => html`
                        <li
                          draggable="true"
                          @dragstart="${(event: DragEvent) => this.onDragStart(event, index)}"
                          @dragover="${(event: DragEvent) => this.onDragOver(event, index)}"
                          @dragleave="${(event: DragEvent) => this.onDragLeave(event, index)}"
                          @drop="${(event: DragEvent) => this.onDrop(event, index)}"
                          @dragend="${(event: DragEvent) => this.onDragEnd(event)}"
                          class="${this.selectedReviews.has(index) ? 'selected' : ''}" >
                          <img src="${this.resolveImageUrl(review.img, review.id)}" alt="${review.userName}" />
                          <p>${review.text}</p>
                        </li>
                      `)}
                  </ul>
                </div>
              `}

        </div>

        <button class="review-choice-button" aria-label="리뷰 추가" @click="${this.openReviewPopup}">리뷰 추가하기</button>

        ${this.showModal
          ? html`
              <div class="modal">
                <div class="modal-content">
                  <h2>리뷰 목록</h2>
                  ${this.noDataMessage
                    ? html`<p>${this.noDataMessage}</p>`
                    : html`
                        <ul>
                          ${this.reviews.map(
                            (review, index) => html`
                              <li
                                @click="${() => this.toggleReviewSelection(index)}"
                                class="${this.selectedReviews.has(index) ? 'selected' : ''}" >
                                <img src="${this.resolveImageUrl(review.img, review.id)}" alt="${review.userName}" />
                                <p> ${review.text}</p>
                              </li>
                            `)}
                        </ul>
                      `}

                  <button @click="${this.closeModal}" aria-label="닫기">X</button>
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }
}
