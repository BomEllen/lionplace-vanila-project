import { html, LitElement, css, CSSResultGroup, unsafeCSS, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./theme.scss?inline";

@customElement("theme-bar")
class Theme extends LitElement {
  private isDragging: boolean = false;
  private startX: number | null = null;
  private scrollPosition: number | null = null;
  private lastMouseDownTarget: HTMLElement | null = null;
  private themeMenu: HTMLElement | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  protected firstUpdated(): void {
    this.themeMenu = this.renderRoot.querySelector(".theme-menu");
  }

  handleMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const themeMenu = this.themeMenu as HTMLElement;

    this.isDragging = true;
    this.startX = e.pageX - themeMenu.offsetLeft;
    this.scrollPosition = themeMenu.scrollLeft;
    themeMenu.style.cursor = "grabbing";

    target.tagName === "BUTTON" ? (this.lastMouseDownTarget = target) : (this.lastMouseDownTarget = null);
  }

  handleMouseMove(e: MouseEvent) {
    if (this.isDragging === true) {
      const themeMenu = this.themeMenu as HTMLElement;

      const x = e.pageX - themeMenu.offsetLeft;
      const walk = x - this.startX!;
      themeMenu.scrollLeft = this.scrollPosition! - walk;
    }
  }

  handleMouseUp(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const themeMenu = this.themeMenu as HTMLElement;
    if (target.tagName === "BUTTON" && target === this.lastMouseDownTarget) {
      if (target.classList.contains("active")) {
        target.classList.remove("active");
      } else {
        target.classList.add("active");
      }
    }

    this.isDragging = false;
    themeMenu.style.cursor = "grab";
    this.scrollPosition = themeMenu.scrollLeft;
    this.lastMouseDownTarget = null;
  }

  handleMouseLeave() {
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
