import { html, LitElement, css, CSSResultGroup, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./location.scss?inline";

@customElement("location-bar")
class Location extends LitElement {
  private isDragging: boolean = false;
  private startX: number | null = null;
  private scrollPosition: number | null = null;
  private lastMouseDownTarget: HTMLElement | null = null;
  private locationMenu: HTMLElement | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  protected firstUpdated(): void {
    this.locationMenu = this.renderRoot.querySelector(".location-menu");
  }

  handleMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const locationMenu = this.locationMenu as HTMLElement;

    this.isDragging = true;
    this.startX = e.pageX - locationMenu.offsetLeft;
    this.scrollPosition = locationMenu.scrollLeft;
    locationMenu.style.cursor = "grabbing";

    target.tagName === "BUTTON" ? (this.lastMouseDownTarget = target) : (this.lastMouseDownTarget = null);
  }

  handleMouseMove(e: MouseEvent) {
    if (this.isDragging === true) {
      const locationMenu = this.locationMenu as HTMLElement;

      const x = e.pageX - locationMenu.offsetLeft;
      const walk = x - this.startX!;
      locationMenu.scrollLeft = this.scrollPosition! - walk;
    }
  }

  handleMouseUp(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const locationMenu = this.locationMenu as HTMLElement;
    if (target.tagName === "BUTTON" && target === this.lastMouseDownTarget && !target.classList.contains("active")) {
      locationMenu.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      target.classList.add("active");
    }

    this.isDragging = false;
    locationMenu.style.cursor = "grab";
    this.scrollPosition = locationMenu.scrollLeft;
    this.lastMouseDownTarget = null;
  }

  handleMouseLeave() {
    if (this.isDragging === true) {
      const locationMenu = this.locationMenu as HTMLElement;

      this.isDragging = false;
      locationMenu.style.cursor = "grab";
    }
  }

  handleFocus(e: FocusEvent) {
    const focusedElement = e.target as HTMLElement;
    const locationMenu = this.locationMenu as HTMLElement;

    // 포커스된 항목이 화면 오른쪽에 있다면, 해당 항목을 화면에 보이도록 스크롤
    if (focusedElement && focusedElement.offsetLeft + focusedElement.offsetWidth * 2 > locationMenu.scrollLeft + locationMenu.offsetWidth) {
      locationMenu.scrollLeft = focusedElement.offsetLeft + focusedElement.offsetWidth * 2 - locationMenu.offsetWidth;
    }
  }

  render() {
    return html`
      <nav class="location-nav">
        <button class="btn-location" type="button"><img src="../../assets/navitems/map.svg" alt="현 위치 로고" /><span>현위치</span></button>

        <ul class="location-menu" @focusin=${this.handleFocus} @mousedown=${this.handleMouseDown} @mousemove=${this.handleMouseMove} @mouseup=${this.handleMouseUp} @mouseleave=${this.handleMouseLeave}>
          <li><button class="active" type="button">전체</button></li>
          <li><button type="button">팔로잉</button></li>
          <li><button type="button">홍익대</button></li>
          <li><button type="button">합정역</button></li>
          <li><button type="button">망원동</button></li>
          <li><button type="button">동교동</button></li>
          <li><button type="button">연남동</button></li>
          <li><button type="button">서교동</button></li>
        </ul>
      </nav>
    `;
  }
}
