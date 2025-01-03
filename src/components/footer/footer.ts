import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./footer.scss?inline";
import { User } from "../../@types/type";

@customElement("custom-footer")
class CustomFooter extends LitElement {
  private SUPER_USER_ID = "0k5scs578ifjs9w";
  // 회원탈퇴가 불가능한 테스트용 아이디

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  // 로그아웃 버튼을 눌렀을 때, localStorage에서 정보 삭제 후 로그인 화면으로 이동
  handleLogout() {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("auth");
      localStorage.removeItem("pocketbase_auth");
      location.href = "/src/pages/login/";
    }
  }

  // 회원탈퇴 버튼을 눌렀을 때, localStorage에서 유저 정보 확인 후 이동할 지 물어봄
  handleDeleteAccount() {
    const record = JSON.parse(localStorage.getItem("auth") as string).record as User;

    // 회원탈퇴가 불가능한 테스트용 아이디일 경우, 회원탈퇴 불가능
    if (record.id === this.SUPER_USER_ID) {
      alert("해당 계정은 회원 탈퇴가 불가능합니다. 관리자에게 문의하세요.");
    } else if (confirm("정말 회원 탈퇴 하시겠습니까?")) {
      location.href = "/src/pages/delete-account/";
    }
  }

  render() {
    return html`
      <footer>
        <select name="languages" id="lang" aria-label="언어 선택">
          <option value="한국어">한국어</option>
          <option value="english">ENGLISH</option>
          <option value="日本語">日本語</option>
        </select>

        <div>
          <div class="account-btns">
            <button @click=${this.handleLogout} type="button" class="btn-logout">로그아웃</button>
            <button @click=${this.handleDeleteAccount} type="button" class="btn-delete-account">회원탈퇴</button>
          </div>
          <ul>
            <li><a href="https://help.naver.com/service/30026/category/bookmark?lang=ko" rel="external">네이버 예약 고객센터</a></li>
            <li><a href="https://new.smartplace.naver.com/help/policy" rel="external">이용약관</a></li>
            <li><a href="https://policy.naver.com/rules/privacy.html" rel="external">개인정보처리방침</a></li>
          </ul>

          <p>네이버(주)는 통신판매의 당사자가 아니며, 상품의 정보 및 쿠폰 사용 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</p>
          <p>(주) 네이버 사업자정보</p>
        </div>
      </footer>
    `;
  }
}
