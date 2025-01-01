import { css, CSSResultGroup, html, LitElement, PropertyValues, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./profile-popup.scss?inline";
import pb from "../../api/pocketbase";
import { User } from "../../@types/type";

@customElement("profile-popup")
export class ProfilePopup extends LitElement {
  @property() fileImage: { image: string; label: string } = {
    image: "",
    label: "",
  };
  @property() isVisible: boolean = false;

  private contentArea: HTMLElement | null = null;
  private focusableContents: HTMLElement[] | null = null;
  private previousFocus: HTMLElement | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  firstUpdated(): void {
    this.contentArea = this.renderRoot.querySelector(".popup-content") as HTMLElement;
    this.focusableContents = Array.from(this.contentArea.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    this.previousFocus = document.activeElement as HTMLElement;
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (!this.isVisible) {
      this.restoreFocus();
    } else if (this.focusableContents != null) {
      this.focusableContents[0].focus();
    }
  }

  restoreFocus() {
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  get input() {
    return this.renderRoot.querySelector("input") as HTMLInputElement;
  }

  get saveButton() {
    return this.renderRoot.querySelector("#save-profile-image") as HTMLButtonElement;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.dispatchEvent(new CustomEvent("popup-changed", { detail: { isVisible: this.isVisible } }));
  }

  handleUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) throw new Error("file값이 존재하지 않습니다.");

    const fileImage = {
      image: URL.createObjectURL(file),
      label: file.name,
    };

    this.fileImage = fileImage;

    this.saveButton.disabled = false;
    if (this.focusableContents !== null) this.focusableContents.push(this.saveButton);
  }

  handleClose() {
    this.isVisible = false;
    this.fileImage = { image: "", label: "" };
    this.input.value = "";
    this.saveButton.disabled = true;
    if (this.focusableContents?.length === 3) this.focusableContents.pop();

    this.dispatchEvent(new CustomEvent("popup-changed", { detail: { isVisible: this.isVisible } }));
  }

  async handleSave(e: Event) {
    e.preventDefault();

    const localDataString = localStorage.getItem("auth");
    if (!localDataString) {
      console.error("localStorage에 'auth' 데이터가 없습니다."); 
      alert("로그인이 필요합니다. 다시 로그인해주세요."); 
      return;
    }

    let localData;
    try {
      localData = JSON.parse(localDataString);
    } catch {
      console.error("localStorage 'auth' 데이터가 올바른 JSON 형식이 아닙니다."); 
      alert("데이터를 불러오는 데 실패했습니다. 다시 로그인해주세요."); 
      return;
    }

    const localRecord = localData.record as User;
    if (!localRecord) {
      console.error("'auth' 데이터에 record 속성이 없습니다."); 
      alert("사용자 데이터를 불러오는 데 실패했습니다. 다시 로그인해주세요."); 
      return;
    }

    const formData = new FormData();
    if (this.input.files && this.input.files.length > 0) {
      const inputFile = this.input.files[0];

      for (const [key, value] of Object.entries(localRecord)) {
        if (key === "avatar") {
          formData.append("avatar", inputFile);
        } else {
          formData.append(key, value);
        }
      }

      try {
        const record = await pb.collection("users").update(localRecord.id, formData);

        localRecord.avatar = record.avatar;
        localData.record = localRecord;

        localStorage.setItem("auth", JSON.stringify(localData));
        location.reload();
      } catch (error) {
        console.error("서버에 데이터를 저장하는 도중 오류가 발생했습니다.", error); 
        alert("저장에 실패했습니다. 다시 시도해주세요."); 
      }
    }
  }

  handleBackDropClick(e: Event) {
    const target = e.target as HTMLElement;

    if (target.tagName === "DIV" && target.classList.contains("popup-container")) this.handleClose();
  }

  handleKeyEvent(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this.handleClose();
    }
    if (e.key === "Tab" && this.focusableContents != null) {
      const activeElement = this.shadowRoot?.activeElement;
      const first = this.focusableContents[0] as HTMLElement;
      const last = this.focusableContents[this.focusableContents.length - 1] as HTMLElement;

      if (activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  render() {
    const { image, label } = this.fileImage;

    return html`
      <div @click=${this.handleBackDropClick} role="dialog" class="popup-container ${this.isVisible ? "visible" : ""}" aria-modal="true">
        <div class="popup-content" @keydown=${this.handleKeyEvent}>
          <button @click=${this.handleClose} type="button" class="close-btn">X</button>
          <h2>프로필 이미지 수정</h2>
          <form class="img-field">
            <label for="image-input">
              <div class="btn-upload">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.5 10.75H12.5L9.6875 7L7.4375 10L5.75 7.75L3.5 10.75ZM2 13.75C1.5875 13.75 1.2345 13.6033 0.941 13.3097C0.647 13.0157 0.5 12.6625 0.5 12.25V3.25C0.5 2.8375 0.647 2.4845 0.941 2.191C1.2345 1.897 1.5875 1.75 2 1.75H4.3625L5.75 0.25H10.25L11.6375 1.75H14C14.4125 1.75 14.7657 1.897 15.0597 2.191C15.3533 2.4845 15.5 2.8375 15.5 3.25V12.25C15.5 12.6625 15.3533 13.0157 15.0597 13.3097C14.7657 13.6033 14.4125 13.75 14 13.75H2ZM14 12.25V3.25H10.9625L9.59375 1.75H6.40625L5.0375 3.25H2V12.25H14Z"
                    fill="#19172E"
                  />
                </svg>
                변경할 이미지 업로드
              </div>
            </label>
            <input @change=${this.handleUpload} type="file" id="image-input" accept=".png,.jpg,.webp" />
            <div id="image-preview-container">${image ? html`<img src="${image}" alt="파일명 : ${label}" />` : ""}</div>
            <button @click=${this.handleSave} type="submit" id="save-profile-image" disabled>저장</button>
          </form>
        </div>
      </div>
    `;
  }
}
