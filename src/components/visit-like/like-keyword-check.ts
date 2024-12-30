import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./visit-like.scss?inline";
import pb from "../../api/pocketbase";
import { LikeKeywordData, Tag } from "../../@types/type";

@customElement("like-keyword-check")
class VisitLikeKeyword extends LitElement {
  //tags: LikeKeywordData[] = [];
  @property() tags: LikeKeywordData[] | null = null;
  //@property() data: LikeKeywordData | null = null;

  private isDragging: boolean = false;
  private startX: number | null = null;
  private scrollPosition: number | null = null;
  private lastMouseDownTarget: HTMLElement | null = null;
  private likeKeyword: HTMLElement | null = null;
  private type: string = "";

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  connectedCallback(): void {
    super.connectedCallback();
    // 연결 시 데이터 불러옴
    this.fetchData();
  }

  protected firstUpdated(): void {
    this.likeKeyword = this.renderRoot.querySelector(".like-keyword-check-wrap");
    if (this.likeKeyword) {
      this.likeKeyword.addEventListener("mousedown", this.handleMouseDown.bind(this));
      this.likeKeyword.addEventListener("mousemove", this.handleMouseMove.bind(this));
      this.likeKeyword.addEventListener("mouseup", this.handleMouseUp.bind(this));
      this.likeKeyword.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
    }
  }

  handleMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const likeKeyword = this.likeKeyword as HTMLElement;

    // 마우스가 눌릴 때, 현재 위치기록(startX) 및 드래그 시작(isDragging)임을 저장해 둠
    this.isDragging = true;
    this.startX = e.pageX - likeKeyword.offsetLeft;
    this.scrollPosition = likeKeyword.scrollLeft;
    likeKeyword.style.cursor = "grabbing";

    // 클릭 이벤트를 위해 lastMouseDownTarget에 현재 태그를 기록(마우스가 Up될때 같은 태그면 클릭됨)
    target.tagName === "BUTTON" ? (this.lastMouseDownTarget = target) : (this.lastMouseDownTarget = null);
  }

  handleMouseMove(e: MouseEvent) {
    // 마우스가 드래그 중일 때만 이벤트 처리(성능을 위해서)
    if (this.isDragging === true) {
      const likeKeyword = this.likeKeyword as HTMLElement;

      // 드래그 됨에 따라 스크롤을 이동해 줌
      const x = e.pageX - likeKeyword.offsetLeft;
      const walk = x - this.startX!;
      likeKeyword.scrollLeft = this.scrollPosition! - walk;
    }
  }

  handleMouseUp(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const likeKeyword = this.likeKeyword as HTMLElement;

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
    likeKeyword.style.cursor = "grab";
    this.scrollPosition = likeKeyword.scrollLeft;
    this.lastMouseDownTarget = null;
  }

  handleMouseLeave() {
    // 마우스가 ul 리스트 외부로 벗어났을 때, 드래그 상태를 풀어줌
    if (this.isDragging === true) {
      const kewordMenu = this.likeKeyword as HTMLElement;

      this.isDragging = false;
      kewordMenu.style.cursor = "grab";
    }
  }

  handleFocus(e: FocusEvent) {
    const focusedElement = e.target as HTMLElement;
    const likeKeyword = this.likeKeyword as HTMLElement;

    // 포커스된 항목이 화면 오른쪽에 있다면, 해당 항목을 화면에 보이도록 스크롤
    if (focusedElement && focusedElement.offsetLeft + focusedElement.offsetWidth > likeKeyword.scrollLeft + likeKeyword.offsetWidth) {
      likeKeyword.scrollLeft = focusedElement.offsetLeft + focusedElement.offsetWidth - likeKeyword.offsetWidth;
    }
  }

  async fetchData() {
    // expand 옵션을 통해 연결된 릴레이션(editedUser, = 피드 작성 유저정보)까지 받아서 한번에 확인 가능
    try {
      const queryString = location.search;
      const urlParams = new URLSearchParams(queryString);
      const type = urlParams.get("type");

      if (type != null) {
        this.type = type;

        const tags = await pb.collection("tags").getFullList({ filter: `type~'${this.type}'` });
        this.tags = tags.map((item): LikeKeywordData => {
          return {
            keywordText: item.text, // 배열을 문자열로 변환
          };
        });
      }
    } catch (err) {
      // 통신 실패 시 에러 메시지 출력
      console.log(err);
    }
  }

  render() {
    return html`
      <div class="like-keyword-check-container">
        <div class="like-keyword-check-wrap" @mousedown=${this.handleMouseDown} @mousemove=${this.handleMouseMove} @mouseup=${this.handleMouseUp} @mouseleave=${this.handleMouseLeave} @focusin=${this.handleFocus}>
          <div class="like-keyword-check-list">
            <ul>
              ${(this.tags || []).map(
                (tag) => html`
                  <li>
                    <div class="primary-btn">
                      <input type="checkbox" id="keyword-${tag.keywordText}" class="like-input" />
                      <label for="keyword-${tag.keywordText}" class="like-label">
                        <span>${tag.keywordText}</span>
                      </label>
                    </div>
                  </li>
                `
              )}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}
