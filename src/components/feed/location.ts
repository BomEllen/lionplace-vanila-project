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

  // location-menu를 찾아 변수에 담음
  protected firstUpdated(): void {
    this.locationMenu = this.renderRoot.querySelector(".location-menu");
  }

  handleMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const locationMenu = this.locationMenu as HTMLElement;

    // 마우스가 눌릴 때, 현재 위치기록(startX) 및 드래그 시작(isDragging)임을 저장해 둠
    this.isDragging = true;
    this.startX = e.pageX - locationMenu.offsetLeft;
    this.scrollPosition = locationMenu.scrollLeft;
    locationMenu.style.cursor = "grabbing";

    // 클릭 이벤트를 위해 lastMouseDownTarget에 현재 태그를 기록(마우스가 Up될때 같은 태그면 클릭됨)
    target.tagName === "BUTTON" ? (this.lastMouseDownTarget = target) : (this.lastMouseDownTarget = null);
  }

  handleMouseMove(e: MouseEvent) {
    // 마우스가 드래그 중일 때만 이벤트 처리(성능을 위해서)
    if (this.isDragging === true) {
      const locationMenu = this.locationMenu as HTMLElement;

      // 드래그 됨에 따라 스크롤을 이동해 줌
      const x = e.pageX - locationMenu.offsetLeft;
      const walk = x - this.startX!;
      locationMenu.scrollLeft = this.scrollPosition! - walk;
    }
  }

  handleMouseUp(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const locationMenu = this.locationMenu as HTMLElement;

    // handleMouseDown에서 저장해 둔 target과 현재 target이 같은지 비교
    // 그리고 target에 active가 존재하는지 확인해 없으면 target에만 active를 걸어줌
    if (target.tagName === "BUTTON" && target === this.lastMouseDownTarget && !target.classList.contains("active")) {
      locationMenu.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      target.classList.add("active");
    }

    // 드래그 종료(isDragging), 커서 스타일도 바꿔 주고(grab), 현재 스크롤 위치도 저장해 줌
    // lastMouseDownTarget 또한 다음 클릭 이벤트를 위해 초기화
    this.isDragging = false;
    locationMenu.style.cursor = "grab";
    this.scrollPosition = locationMenu.scrollLeft;
    this.lastMouseDownTarget = null;
  }

  handleMouseLeave() {
    // 마우스가 ul 리스트 외부로 벗어났을 때, 드래그 상태를 풀어줌
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
    if (focusedElement && focusedElement.offsetLeft + focusedElement.offsetWidth > locationMenu.scrollLeft + locationMenu.offsetWidth) {
      locationMenu.scrollLeft = focusedElement.offsetLeft + focusedElement.offsetWidth - locationMenu.offsetWidth;
    }
  }

  render() {
    return html`
      <nav class="location-nav">
        <ul class="location-menu" @focusin=${this.handleFocus} @mousedown=${this.handleMouseDown} @mousemove=${this.handleMouseMove} @mouseup=${this.handleMouseUp} @mouseleave=${this.handleMouseLeave}>
          <li><button class="active" type="button">전체</button></li>
          <li><button type="button">팔로잉</button></li>
          <li><button type="button">현위치</button></li>
          <li><button type="button">홍익대</button></li>
          <li><button type="button">합정역</button></li>
          <li><button type="button">망원동</button></li>
          <li><button type="button">동교동</button></li>
          <li><button type="button">연남동</button></li>
          <li><button type="button">서교동</button></li>
          <li><button type="button">포항시</button></li>
          <li><button type="button">해운대</button></li>
          <li><button type="button">수성구</button></li>
          <li><button type="button">왕십리</button></li>
          <li><button type="button">왕십리</button></li>
          <li><button type="button">왕십리</button></li>
          <li><button type="button">왕십리</button></li>
          <li><button type="button">왕십리</button></li>
          <li><button type="button">왕십리</button></li>
          <li><button type="button">왕십리</button></li>
        </ul>
      </nav>
    `;
  }
}
