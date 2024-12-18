import { css, CSSResultGroup, html, LitElement, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import pb from "../../api/pocketbase";
import styles from "./post-list.scss?inline";
import { PostData } from "../../@types/type";
import { getImageURL } from "../../api/getImageURL";

@customElement("post-list")
class PostList extends LitElement {
  @state() dataList: PostData[] | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  formatToDate(isoString: string): string {
    const date = new Date(isoString);

    // 월, 일 추출
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 0-based index
    const day = date.getDate().toString().padStart(2, "0");

    // 요일 추출 (월요일부터 시작)
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];

    return `${month}.${day}.${weekday}`;
  }

  async fetchData() {
    const feeds = await pb.collection("feeds").getFullList({ expand: "editedUser" });

    this.dataList = feeds.map(
      (item): PostData => ({
        userImg: getImageURL(item.expand!.editedUser.collectionId, item.expand!.editedUser.id, item.expand!.editedUser.avatar),
        date: this.formatToDate(item.created),
        image: getImageURL(item.collectionId, item.id, item.image),
        text: item.text,
        userName: item.expand!.editedUser.userName,
        reviewCount: 0,
      })
    );
  }

  render() {
    return html`
      <ul>
        ${this.dataList?.map((item) => html`<custom-post .data=${item}></custom-post>`)}
      </ul>
    `;
  }
}
