import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { User } from "../../@types/type";
import pb from "../../api/pocketbase";
import "../../styles/sass/reset.scss";
import styles from "./visit-like.scss?inline";
import { debounce } from "../../utils/form-utils";

@customElement("visit-review")
class VisitReview extends LitElement {
  private textCount: HTMLElement | null = null;

  @property() fileImage: { image: string; label: string } = {
    image: "",
    label: "",
  };

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  get textInput() {
    return this.renderRoot.querySelector("#review-area") as HTMLInputElement;
  }

  get submitButton() {
    return this.renderRoot.querySelector(".review-submit-btn") as HTMLButtonElement;
  }

  get imageInput() {
    return this.renderRoot.querySelector("#file") as HTMLInputElement;
  }

  firstUpdated(): void {
    this.textCount = this.renderRoot.querySelector(".text-count") as HTMLElement;
    console.log(this.textCount);
  }

  handleTextAreaInput() {
    const input = this.textInput.value;
    const length = input.length;

    if (this.textCount != null) {
      this.textCount.innerHTML = `${length}<span>/400</span>`;
    }

    if (this.submitButton.disabled && this.imageInput.files?.length && length >= 10) {
      this.submitButton.disabled = false;
    } else if (!this.submitButton.disabled && length < 10) {
      this.submitButton.disabled = true;
    }
  }

  handleUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) throw new Error("file값이 존재하지 않습니다.");

    const fileImage = {
      image: URL.createObjectURL(file),
      label: file.name,
    };

    this.fileImage = fileImage;

    if (this.submitButton.disabled && this.textInput.value.length >= 10) {
      this.submitButton.disabled = false;
    }
  }

  async handleSave(e: Event) {
    alert("등록하기 기능은 미구현입니다.😥 이전 페이지로 되돌아갑니다.");
    history.back();

    // e.preventDefault();

    // const localData = JSON.parse(localStorage.getItem("auth") as string);
    // const formData = new FormData();
    // const imageInput = this.imageInput;

    // if (imageInput.files && imageInput.files.length > 0) {
    //   const inputFile = imageInput.files[0];

    //   formData.append("img", inputFile);
    //   formData.append("text", this.textInput.value);
    //   formData.append("userName", (localData.record as User).userName);
    //   try {
    //     const record = await pb.collection("reviews").create(formData);

    //     location.href = "/src/pages/feed/";
    //   } catch (err) {
    //     throw err;
    //   }
    // }
  }

  render() {
    const { image, label } = this.fileImage;
    return html`
      <div class="visit-review-section">
        <h3>리뷰를 남겨주세요</h3>
        <div class="review-photo-btn">
          <input @change=${this.handleUpload} type="file" name="file" id="file" accept=".png,.jpg,.webp" />
          <label for="file">
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.5 10.75H12.5L9.6875 7L7.4375 10L5.75 7.75L3.5 10.75ZM2 13.75C1.5875 13.75 1.2345 13.6033 0.941 13.3097C0.647 13.0157 0.5 12.6625 0.5 12.25V3.25C0.5 2.8375 0.647 2.4845 0.941 2.191C1.2345 1.897 1.5875 1.75 2 1.75H4.3625L5.75 0.25H10.25L11.6375 1.75H14C14.4125 1.75 14.7657 1.897 15.0597 2.191C15.3533 2.4845 15.5 2.8375 15.5 3.25V12.25C15.5 12.6625 15.3533 13.0157 15.0597 13.3097C14.7657 13.6033 14.4125 13.75 14 13.75H2ZM14 12.25V3.25H10.9625L9.59375 1.75H6.40625L5.0375 3.25H2V12.25H14Z"
                fill="#19172E"
              />
            </svg>
            사진추가
          </label>
        </div>
        <div id="review-image-preview">${image ? html`<img src="${image}" alt="파일명 : ${label}" />` : ""}</div>
        <div class="review-area-wrap">
          <textarea id="review-area" placeholder="최소 10자 이상 써주세요." maxlength="400" @input=${debounce(() => this.handleTextAreaInput(), 300)}></textarea>
          <p>
            <span id="text-count" class="text-count">0<span>/400</span></span>
          </p>
        </div>

        <div class="review-btn-wrap">
          <button type="button" class="review-notes-btn">
            <span>리뷰 작성 유의사항</span>
          </button>
          <button @click=${this.handleSave} type="button" class="review-submit-btn" disabled>등록하기</button>
        </div>
      </div>
    `;
  }
}
