import { css, CSSResultGroup, html, LitElement, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./create-feed.scss?inline";
import pb from "../../api/pocketbase";
import { User } from "../../@types/type";
import { debounce } from "../../utils/form-utils";
import { LoadingSpinner } from "../loading-spinner/loading-spinner.ts";

@customElement("create-feed")
export class CreateFeed extends LitElement {
  // 파일 입력에 따른 미리보기를 위한 property
  @property() fileImage: { image: string; label: string } = {
    image: "",
    label: "",
  };
  // 팝업이 활성화 되면 True, 아니면 False
  @property() isVisible: boolean = false;

  // 탭으로 접근되는 모든 요소(버튼, 인풋, textarea 등)를 담음
  private focusableContents: HTMLElement[] | null = null;
  // 팝업 이전에 포커스를 담음(팝업이 풀리고 돌려주기 위함)
  private previousFocus: HTMLElement | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  firstUpdated(): void {
    this.focusableContents = Array.from(this.renderRoot.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    this.previousFocus = document.activeElement as HTMLElement;
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (!this.isVisible) {
      // 팝업이 꺼지면 포커스를 돌려줌
      this.restoreFocus();
    } else if (this.focusableContents != null) {
      // 팝업이 켜지고(팝업이 꺼지면 조건을 위에서 확인했으니), 탭으로 접근 가능한 요소들이 있다면 팝업의 첫 요소에 포커스
      this.focusableContents[0].focus();
    }
  }

  get spinner() {
    return this.renderRoot.querySelector("loading-spinner") as LoadingSpinner;
  }

  get textInput() {
    return this.renderRoot.querySelector("#text-input") as HTMLInputElement;
  }

  get imageInput() {
    return this.renderRoot.querySelector("#image-input") as HTMLInputElement;
  }

  get saveButton() {
    return this.renderRoot.querySelector("#save-profile-image") as HTMLButtonElement;
  }

  // profile-all에서 사용, 팝업을 활성화하는 버튼을 눌렀을 때 toggle, 이벤트도 발생시켜 해당 요소의 ARIA 속성에 영향을 주기 위함
  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.dispatchEvent(new CustomEvent("popup-changed", { detail: { isVisible: this.isVisible } }));
  }

  // 팝업이 꺼지고 포커스를 복구해주는 함수
  restoreFocus() {
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  // 파일 미리보기를 보여주고, 저장 버튼을 활성화/비활성화 해주는 함수
  handleUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) throw new Error("file값이 존재하지 않습니다.");

    const fileImage = {
      image: URL.createObjectURL(file),
      label: file.name,
    };

    this.fileImage = fileImage;

    if (this.saveButton.disabled && this.textInput.value.length >= 10) {
      this.saveButton.disabled = false;
      if (this.focusableContents !== null) this.focusableContents.push(this.saveButton);
    }
  }

  // 팝업이 닫혔을 때의 함수
  handleClose() {
    this.isVisible = false;
    this.fileImage = { image: "", label: "" };
    this.imageInput.value = "";
    this.textInput.value = "";
    this.saveButton.disabled = true;
    if (this.focusableContents?.length === 3) this.focusableContents.pop();

    this.dispatchEvent(new CustomEvent("popup-changed", { detail: { isVisible: this.isVisible } }));
  }

  // 저장 버튼이 눌리고, DB에 데이터를 전송하고 페이지를 이동해주는 함수
  async handleSave(e: Event) {
    e.preventDefault();

    const localData = JSON.parse(localStorage.getItem("auth") as string);
    const formData = new FormData();
    const imageInput = this.imageInput;

    if (imageInput.files && imageInput.files.length > 0) {
      const inputFile = imageInput.files[0];

      formData.append("image", inputFile);
      formData.append("text", this.textInput.value);
      formData.append("editedUser", (localData.record as User).id);
      try {
        this.spinner?.show();
        const record = await pb.collection("feeds").create(formData);
        this.spinner?.hide();
        location.href = "/src/pages/feed/";
      } catch (err) {
        throw err;
      }
    }
  }

  // 배경을 눌렀을 때, 팝업을 끄는 함수
  handleBackDropClick(e: Event) {
    const target = e.target as HTMLElement;

    if (target.tagName === "DIV" && target.classList.contains("popup-container")) this.handleClose();
  }

  // esc키를 누르면 팝업이 꺼지고, tab키를 눌렀을 때 팝업 내부의 요소들에만 포커스되도록 하는 함수
  handleKeyEvent(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this.handleClose();
    }
    if (e.key === "Tab" && this.focusableContents != null) {
      // 현재 focus중인 element는 shadowRoot로만 찾을 수 있어 임의로 사용했습니다.
      const activeElement = this.shadowRoot?.activeElement;
      const first = this.focusableContents[0] as HTMLElement;
      const last = this.focusableContents[this.focusableContents.length - 1] as HTMLElement;

      // Tab
      if (activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // textarea의 input을 확인해 저장 버튼을 활성화/비활성화 하는 함수
  handleTextAreaInput() {
    const input = this.textInput.value;
    const length = input.length;

    if (this.saveButton.disabled && this.imageInput.files?.length && length >= 10) {
      this.saveButton.disabled = false;
      if (this.focusableContents !== null) this.focusableContents.push(this.saveButton);
    } else if (!this.saveButton.disabled && length < 10) {
      this.saveButton.disabled = true;
      if (this.focusableContents?.length === 3) this.focusableContents.pop();
    }
  }

  render() {
    const { image, label } = this.fileImage;

    return html`
      <div @click=${this.handleBackDropClick} role="dialog" class="popup-container ${this.isVisible ? "visible" : ""}" aria-modal="true">
        <loading-spinner hidden transparent></loading-spinner>
        <div class="popup-content" @keydown=${this.handleKeyEvent}>
          <button @click=${this.handleClose} type="button" class="close-btn">X</button>
          <h2>피드 작성</h2>
          <form class="img-field">
            <label for="image-input">
              <div class="btn-upload">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.5 10.75H12.5L9.6875 7L7.4375 10L5.75 7.75L3.5 10.75ZM2 13.75C1.5875 13.75 1.2345 13.6033 0.941 13.3097C0.647 13.0157 0.5 12.6625 0.5 12.25V3.25C0.5 2.8375 0.647 2.4845 0.941 2.191C1.2345 1.897 1.5875 1.75 2 1.75H4.3625L5.75 0.25H10.25L11.6375 1.75H14C14.4125 1.75 14.7657 1.897 15.0597 2.191C15.3533 2.4845 15.5 2.8375 15.5 3.25V12.25C15.5 12.6625 15.3533 13.0157 15.0597 13.3097C14.7657 13.6033 14.4125 13.75 14 13.75H2ZM14 12.25V3.25H10.9625L9.59375 1.75H6.40625L5.0375 3.25H2V12.25H14Z"
                    fill="#19172E"
                  />
                </svg>
                피드 이미지 업로드
              </div>
            </label>
            <input @change=${this.handleUpload} type="file" id="image-input" accept=".png,.jpg,.webp" />
            <div id="image-preview-container">${image ? html`<img src="${image}" alt="파일명 : ${label}" />` : ""}</div>
            <label for="text-input">내용</label>
            <textarea @input=${debounce(() => this.handleTextAreaInput(), 300)} id="text-input" rows="10" cols="45" placeholder="최소 10자 이상 써주세요."></textarea>
            <button @click=${this.handleSave} type="submit" id="save-profile-image" disabled>저장</button>
          </form>
        </div>
      </div>
    `;
  }
}
