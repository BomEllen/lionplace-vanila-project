import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../styles/sass/reset.scss";
import "../../styles/sass/variables.scss";
import "../../styles/sass/font.scss";
import styles from "./loading-spinner.scss?inline";

@customElement("loading-spinner")
export class LoadingSpinner extends LitElement {
  // CSS 스타일 정의
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  // hidden 속성: true이면 스피너가 숨겨짐
  @property({ type: Boolean, reflect: true }) hidden = false;
  @property({ type: Boolean }) transparent = false;

  connectedCallback(): void {
    super.connectedCallback();
  }

  // 렌더링: hidden 속성에 따라 클래스 동적 추가
  render() {
    return html`
      <div class="loader-wrapper ${this.hidden ? "hidden" : ""} ${this.transparent ? "transparent" : ""}">
        <span class="loader"></span>
      </div>
    `;
  }

  // 스피너 보이기
  show() {
    this.hidden = false;
  }

  // 스피너 숨기기
  hide() {
    this.hidden = true;
  }
}

/*
컴포넌트 사용법


해당 컴포넌트를 넣고자 하는 html에 아래와 같이 불러온 후
<loading-spinner></loading-spinner>


아래와 같은 js코드로 사용할 수 있습니다. 
<script>
  const spinner = document.querySelector('loading-spinner');

  // 스피너 표시
  spinner.show();

  // 3초 후 스피너 숨기기
  setTimeout(() => {
  spinner.hide();
  }, 3000);
</script>


혹은 아래와 같이 아얘 html의 hidden 속성을 이용하여 제어 할 수도 있습니다. 
편한 방법으로 사용해주세요.

<script>
  const spinner = document.querySelector('loading-spinner');

  // 속성을 제거하여 스피너 표시
  spinner.hidden = false;
</script>
*/
