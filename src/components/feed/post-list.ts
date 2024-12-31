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
    // 연결 시 데이터 불러옴
    this.fetchData();
  }

  // isoString("2024-12-16 05:20:58.524Z")을 "12.16.월"로 바꿔주는 함수
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
    // expand 옵션을 통해 연결된 릴레이션(editedUser, = 피드 작성 유저정보)까지 받아서 한번에 확인 가능
    try {
      const feeds = await pb
        .collection("feeds")
        .getFullList({ expand: "editedUser" });

      this.dataList = feeds.map(
        (item): PostData => ({
          userImg: getImageURL(
            item.expand!.editedUser.collectionId,
            item.expand!.editedUser.id,
            item.expand!.editedUser.avatar
          ),
          date: this.formatToDate(item.created),
          image: getImageURL(item.collectionId, item.id, item.image),
          text: item.text,
          userName: item.expand!.editedUser.userName,
          reviewCount: 0,
        })
      );
    } catch (err) {
      // 통신 실패 시 에러 메시지 출력
      console.log(err);
    }
  }

  render() {
    return html`
      <ul>
        ${this.dataList?.map(
          (_, index, arr) =>
            html`<custom-post
              .data=${arr[arr.length - 1 - index]}
            ></custom-post>`
        )}
      </ul>
    `;
  }
}
