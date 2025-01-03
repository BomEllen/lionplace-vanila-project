import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getImageURL } from "../../api/get-image-url"; // 이미지 URL을 가져오는 API
import styles from './theme-enroll.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';


@customElement("theme-enroll-wrap")
class ThemeEnrollWrap extends LitElement {
  @property({ type: Object }) userData = { avatar: "", userName: "" };
  @property({ type: String }) backgroundImageUrl: string = ""; // 배경 이미지 URL
  @property({ type: String }) title: string = ""; // 제목을 저장할 변수
  @property({ type: String }) text: string = ""; // 제목을 저장할 변수

  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  // 컴포넌트가 연결될 때, 사용자 데이터를 가져오는 함수
  connectedCallback() {
    super.connectedCallback();
    this.getUserData();
    this.fetchTitle(); // 제목 데이터를 불러오는 함수 호출
    this.fetchBackgroundImage(); // 배경 이미지 요청 함수 호출
  }

  // 사용자 데이터 가져오기
  getUserData() {
    const data = JSON.parse(localStorage.getItem("auth")!).record; // 사용자 데이터를 localStorage에서 가져옴
    this.userData = {
      avatar: getImageURL(data.collectionId, data.id, data.avatar), // getImageURL API를 통해 avatar 이미지 URL을 가져옵니다.
      userName: data.userName, // 사용자 이름
    };
  }

  // 서버에서 title 데이터 가져오기
  private async fetchTitle() {
    try {
      const response = await fetch("https://compass-mighty.pockethost.io/api/collections/themes/records");
      if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");

      const data = await response.json();
      this.title = data.text || "연남동 / 합정 데이트";
      this.requestUpdate(); // 데이터 갱신 후 리렌더링
    } catch (error) {
      console.error("Error fetching title:", error);
    }
  }

  // 배경 이미지 URL을 가져오는 함수
  private async fetchBackgroundImage() {
    try {
      const response = await fetch("https://compass-mighty.pockethost.io/api/collections/reviews/records");
      if (!response.ok) throw new Error("배경 이미지를 가져오는 데 실패했습니다.");

      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        const imgFieldName = data.items[0].img; // 이미지 필드 이름 (실제 이미지 필드의 이름 사용)
        const imgUrl = `https://compass-mighty.pockethost.io/api/files/reviews/${data.items[0].id}/${imgFieldName}`;
        this.backgroundImageUrl = imgUrl; // 가져온 이미지 URL 저장
        this.requestUpdate(); // 이미지가 갱신되면 다시 렌더링
      }
    } catch (error) {
      console.error("배경 이미지 요청 실패:", error);
    }
  }

  // 제목 길이 제한 함수
  private truncateTitle(title: string, maxLength: number = 20): string {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "..."; // 제목 길이가 20자를 넘으면 '...'을 추가
    }
    return title;
  }

  // 뒤로가기 버튼 핸들러
  private goBack() {
    window.location.href = "/src/pages/review/index.html"; // 메인 페이지 URL
  }

  render() {
    return html`
      <!-- 상단바 -->
      <div class="theme-enroll-wrap">
        <header class="header">
          <!-- 뒤로 가기 버튼 -->
          <button class="back-button" @click="${this.goBack}">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19l-7-7 7-7" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <!-- 제목 -->
          <h1 class="title">${this.truncateTitle(this.title)}</h1>
          <!-- 등록 버튼 -->
          <button class="create-button">임시 등록</button>
        </header>

        <!-- 배경 이미지와 텍스트 -->
        <div class="theme-info" style="background-image: url('${this.backgroundImageUrl}')">
          <h2>${this.title}</h2>
          <p>${this.text}</p>
        </div>

        <!-- 프로필 정보 -->
        <section class="profile-wrap">
          <div class="profile">
            <img src="${this.userData.avatar}" alt="프로필 이미지" />
            <div class="profile-details">
              <p>${this.userData.userName}</p>
              <ul>
                <li>리뷰: <strong>17</strong></li>
                <li>사진: <strong>19</strong></li>
                <li>팔로워: <strong>2</strong></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}
