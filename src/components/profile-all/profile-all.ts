import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getImageURL } from "./../../api/getImageURL";
import { ProfilePopup } from "./profile-popup.ts";
import styles from "./profile-all.scss?inline";
import { CreateFeed } from "./create-feed.ts";
import { User } from "../../@types/type";
import "../../styles/sass/reset.scss";
import "./profile-popup.ts";
import "./create-feed.ts";

@customElement("profile-all")
class ProfileAll extends LitElement {
  @property({ type: Object }) userData = { avatar: "", userName: "" };

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.getUserData();
  }

  getUserData() {
    const data = JSON.parse(localStorage.getItem("auth")!).record as User;

    this.userData = { avatar: getImageURL(data.collectionId, data.id, data.avatar), userName: data.userName };
  }

  handleProfileEdit(e: Event) {
    const editBtn = (e.target as HTMLElement).closest("button") as HTMLButtonElement;
    const popup = this.renderRoot.querySelector("profile-popup") as ProfilePopup;

    editBtn.ariaExpanded = "true";
    popup.toggleVisibility();
  }

  handleCreateFeed(e: Event) {
    const editBtn = (e.target as HTMLElement).closest("button") as HTMLButtonElement;
    const popup = this.renderRoot.querySelector("create-feed") as CreateFeed;

    editBtn.ariaExpanded = "true";
    popup.toggleVisibility();
  }

  updateAriaExpanded(e: CustomEvent, targetName: string) {
    const isVisible = e.detail.isVisible;
    const target = this.renderRoot.querySelector(targetName);
    if (target != null) {
      target.ariaExpanded = isVisible.toString();
    }
  }

  render() {
    return html`
      <div class="profile-all">
        <div class="profile-all-wrap">
          <button @click=${this.handleProfileEdit} type="button" class="profile-edit-button" aria-expanded="false" aria-haspopup="true">
            <img src="${this.userData.avatar}" alt="${this.userData.userName}의 프로필 사진" />
            <span title="프로필 이미지 수정"></span>
          </button>
          <div class="profile-number">
            <p class="profile-nickname">
              <span>${this.userData.userName}</span>
              <svg role="img" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>업로드</title>
                <path
                  d="M4.5 3.5L6.75 1.25M6.75 1.25L9 3.5M6.75 1.25V5V8.75M3 4.99994C2.301 4.99994 1.9515 4.99994 1.67625 5.11394C1.49414 5.18933 1.32866 5.29986 1.18929 5.43924C1.04992 5.57861 0.939385 5.74408 0.864 5.92619C0.75 6.20144 0.75 6.55094 0.75 7.24994V10.8499C0.75 11.6899 0.75 12.1099 0.9135 12.4309C1.05731 12.7132 1.28677 12.9426 1.569 13.0864C1.88925 13.2499 2.30925 13.2499 3.14775 13.2499H10.353C11.1915 13.2499 11.6108 13.2499 11.931 13.0864C12.213 12.9424 12.4425 12.7129 12.5865 12.4309C12.75 12.1099 12.75 11.6907 12.75 10.8522V7.24994C12.75 6.55094 12.75 6.20144 12.636 5.92619C12.5606 5.74408 12.4501 5.57861 12.3107 5.43924C12.1713 5.29986 12.0059 5.18933 11.8237 5.11394C11.5485 4.99994 11.199 4.99994 10.5 4.99994"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </p>
            <ul>
              <li>
                <span>리뷰</span>
                <span>17</span>
              </li>
              <li>
                <span>사진</span>
                <span>19</span>
              </li>
              <li>
                <span>팔로잉</span>
                <span>0</span>
              </li>
              <li>
                <span>팔로워</span>
                <span>2</span>
              </li>
            </ul>
          </div>
        </div>
        <profile-popup @popup-changed=${(e: CustomEvent) => this.updateAriaExpanded(e, ".profile-edit-button")}></profile-popup>
        <a href="/" class="profile-coupon-btn">
          <span>쿠폰</span>
          <span>1</span>
        </a>
        <div class="profile-btn-wrap">
          <button @click=${this.handleCreateFeed} type="button" class="feed-button" aria-expanded="false" aria-haspopup="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6.5L4 12.5H1V9.5L7 3.5L9.15175 1.34825L9.1525 1.3475C9.44875 1.05125 9.59725 0.90275 9.76825 0.84725C9.91887 0.798312 10.0811 0.798312 10.2318 0.84725C10.4028 0.90275 10.5505 1.05125 10.8467 1.34675L12.1517 2.65175C12.4487 2.94875 12.5973 3.09725 12.6528 3.26825C12.7017 3.41888 12.7017 3.58113 12.6528 3.73175C12.5973 3.90275 12.4487 4.05125 12.1517 4.34825L10 6.50075L7 3.50075" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            피드 작성
          </button>
          <create-feed @popup-changed=${(e: CustomEvent) => this.updateAriaExpanded(e, ".feed-button")}></create-feed>
        </div>
      </div>
    `;
  }
}
