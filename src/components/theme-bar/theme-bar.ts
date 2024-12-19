import { html, LitElement, css, CSSResultGroup, unsafeCSS, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./theme-bar.scss?inline";

@customElement("theme-bar")
class ThemeBar extends LitElement {
  private isDragging: boolean = false;
  private startX: number | null = null;
  private scrollPosition: number | null = null;
  private lastMouseDownTarget: HTMLElement | null = null;
  private themeMenu: HTMLElement | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  // theme-menu를 찾아 변수에 담음
  protected firstUpdated(): void {
    this.themeMenu = this.renderRoot.querySelector(".theme-menu");
  }

  handleMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const themeMenu = this.themeMenu as HTMLElement;

    // 마우스가 눌릴 때, 현재 위치기록(startX) 및 드래그 시작(isDragging)임을 저장해 둠
    this.isDragging = true;
    this.startX = e.pageX - themeMenu.offsetLeft;
    this.scrollPosition = themeMenu.scrollLeft;
    themeMenu.style.cursor = "grabbing";

    // 클릭 이벤트를 위해 lastMouseDownTarget에 현재 태그를 기록(마우스가 Up될때 같은 태그면 클릭됨)
    target.tagName === "BUTTON" ? (this.lastMouseDownTarget = target) : (this.lastMouseDownTarget = null);
  }

  handleMouseMove(e: MouseEvent) {
    // 마우스가 드래그 중일 때만 이벤트 처리(성능을 위해서)
    if (this.isDragging === true) {
      const themeMenu = this.themeMenu as HTMLElement;

      // 드래그 됨에 따라 스크롤을 이동해 줌
      const x = e.pageX - themeMenu.offsetLeft;
      const walk = x - this.startX!;
      themeMenu.scrollLeft = this.scrollPosition! - walk;
    }
  }

  handleMouseUp(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const themeMenu = this.themeMenu as HTMLElement;

    // handleMouseDown에서 저장해 둔 target과 현재 target이 같은지 비교
    // 그리고 target에 active가 존재하는지 확인해 없으면 target에만 active를 걸어줌
    if (target.tagName === "BUTTON" && target === this.lastMouseDownTarget) {
      if (target.classList.contains("active")) {
        target.classList.remove("active");
      } else {
        target.classList.add("active");
      }
    }

    // 드래그 종료(isDragging), 커서 스타일도 바꿔 주고(grab), 현재 스크롤 위치도 저장해 줌
    // lastMouseDownTarget 또한 다음 클릭 이벤트를 위해 초기화
    this.isDragging = false;
    themeMenu.style.cursor = "grab";
    this.scrollPosition = themeMenu.scrollLeft;
    this.lastMouseDownTarget = null;
  }

  handleMouseLeave() {
    // 마우스가 ul 리스트 외부로 벗어났을 때, 드래그 상태를 풀어줌
    if (this.isDragging === true) {
      const themeMenu = this.themeMenu as HTMLElement;

      this.isDragging = false;
      themeMenu.style.cursor = "grab";
    }
  }

  handleFocus(e: FocusEvent) {
    const focusedElement = e.target as HTMLElement;
    const themeMenu = this.themeMenu as HTMLElement;

    // 포커스된 항목이 화면 오른쪽에 있다면, 해당 항목을 화면에 보이도록 스크롤
    if (focusedElement && focusedElement.offsetLeft + focusedElement.offsetWidth > themeMenu.scrollLeft + themeMenu.offsetWidth) {
      themeMenu.scrollLeft = focusedElement.offsetLeft + focusedElement.offsetWidth - themeMenu.offsetWidth;
    }
  }

  render() {
    return html`
      <nav class="theme-nav">
        <ul class="theme-menu" @mousedown=${this.handleMouseDown} @mousemove=${this.handleMouseMove} @mouseup=${this.handleMouseUp} @mouseleave=${this.handleMouseLeave} @focusin=${this.handleFocus}>
          <li><button class="active" type="button">한식</button></li>
          <li><button type="button">아이와 함께</button></li>
          <li><button type="button">양식</button></li>
          <li><button type="button">문화예술</button></li>
          <li><button type="button">오마카세</button></li>
          <li><button type="button">중식</button></li>
          <li><button type="button">한정식</button></li>
          <li><button type="button">흑백요리사</button></li>
          <li><button type="button">일식</button></li>
        </ul>
      </nav>
    `;
  }
}
