import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import styles from "./profile-all.scss?inline";
import { User } from "../../@types/type";
import { getImageURL } from "./../../api/getImageURL";

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

    console.log(this.userData.avatar);
  }

  render() {
    return html`
      <div class="profile-all">
        <div class="profile-all-wrap">
          <a href="/" class="profile-edit-button">
            <img src="${this.userData.avatar}" alt="${this.userData.userName}의 프로필 사진" />
            <span title="프로필 이미지 수정"></span>
          </a>
          <div class="profile-number">
            <p class="profile-nickname">
              <span>${this.userData.userName}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <a href="/" class="profile-coupon-btn">
          <span>쿠폰</span>
          <span>1</span>
        </a>
        <div class="profile-btn-wrap">
          <button type="button">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6.5L4 12.5H1V9.5L7 3.5L9.15175 1.34825L9.1525 1.3475C9.44875 1.05125 9.59725 0.90275 9.76825 0.84725C9.91887 0.798312 10.0811 0.798312 10.2318 0.84725C10.4028 0.90275 10.5505 1.05125 10.8467 1.34675L12.1517 2.65175C12.4487 2.94875 12.5973 3.09725 12.6528 3.26825C12.7017 3.41888 12.7017 3.58113 12.6528 3.73175C12.5973 3.90275 12.4487 4.05125 12.1517 4.34825L10 6.50075L7 3.50075" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            피드 작성
          </button>
        </div>
      </div>
    `;
  }
}

// 리뷰 작성 버튼
// <button type="button">
//   <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M10.25 5.99991L7.25001 8.99991L5.75001 7.49991M8.93451 1.09416L9.85026 1.87416C10.0813 2.07066 10.3678 2.18916 10.6693 2.21391L11.8693 2.30991C12.2103 2.33714 12.5306 2.48494 12.7726 2.72682C13.0146 2.9687 13.1626 3.28885 13.19 3.62991L13.2853 4.82991C13.31 5.13216 13.4293 5.41941 13.6258 5.64966L14.4058 6.56466C14.6281 6.82528 14.7502 7.15661 14.7502 7.49916C14.7502 7.84171 14.6281 8.17304 14.4058 8.43366L13.6258 9.34941C13.4293 9.58041 13.31 9.86691 13.286 10.1692L13.19 11.3692C13.1628 11.7102 13.015 12.0305 12.7731 12.2725C12.5312 12.5145 12.2111 12.6625 11.87 12.6899L10.67 12.7859C10.3679 12.8098 10.081 12.9285 9.85026 13.1249L8.93451 13.9049C8.67383 14.1271 8.34252 14.2491 8.00001 14.2491C7.6575 14.2491 7.3262 14.1271 7.06551 13.9049L6.15051 13.1249C5.91954 12.9283 5.63239 12.8097 5.33001 12.7859L4.13001 12.6899C3.78883 12.6625 3.46859 12.5144 3.22669 12.2722C2.9848 12.03 2.83708 11.7096 2.81001 11.3684L2.71401 10.1692C2.68972 9.86722 2.57084 9.58063 2.37426 9.35016L1.59426 8.43366C1.37236 8.17315 1.25049 7.84212 1.25049 7.49991C1.25049 7.1577 1.37236 6.82667 1.59426 6.56616L2.37426 5.64966C2.57151 5.41866 2.68926 5.13216 2.71326 4.82991L2.80926 3.63066C2.83686 3.28933 2.98508 2.96898 3.22736 2.72698C3.46964 2.48497 3.79016 2.33712 4.13151 2.30991L5.33001 2.21466C5.63221 2.19053 5.91909 2.07163 6.14976 1.87491L7.06551 1.09491C7.3262 0.872753 7.6575 0.750732 8.00001 0.750732C8.34252 0.750732 8.67383 0.872003 8.93451 1.09416Z"
//       stroke="white"
//       stroke-width="1.5"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     />
//   </svg>
//   리뷰 작성
// </button>
