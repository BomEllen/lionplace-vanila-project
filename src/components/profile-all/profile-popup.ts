import { css, CSSResultGroup, html, LitElement, unsafeCSS } from "lit";
import styles from "./profile-popup.scss?inline";
import { customElement, property } from "lit/decorators.js";

@customElement("profile-popup")
export class ProfilePopup extends LitElement {
  @property() fileImage: { image: string; label: string } = {
    image: "",
    label: "",
  };
  @property() isVisible: boolean = false;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  get input() {
    return this.renderRoot.querySelector("input");
  }

  handleUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) throw new Error("file값이 존재하지 않습니다.");

    const fileImage = {
      image: URL.createObjectURL(file),
      label: file.name,
    };

    this.fileImage = fileImage;

    console.log(this.fileImage);
  }

  toggleVisibility() {
    console.log("toggle");

    this.isVisible = !this.isVisible;
  }

  handleClose(e: Event) {
    e.preventDefault();

    this.isVisible = false;
  }

  render() {
    const image = this.fileImage.image;

    return html`
      <div class="popup-container ${this.isVisible ? "visible" : ""}">
        <div class="popup-content">
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
            <div id="image-preview-container">${image ? html`<img src="${image}" alt="" />` : ""}</div>
            <button type="submit" id="save-profile-image">저장</button>
          </form>
        </div>
      </div>
    `;
  }
}
