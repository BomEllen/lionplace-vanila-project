import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import styles from "./visit-record.scss?inline";
import { VisitData } from "../../@types/type";
import { getImageURL } from "../../api/get-image-url";

@customElement("visit-records")
class visitRecord extends LitElement {
  @state() visitRecords: VisitData[] | null = null;

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
      const visitRecords = await pb.collection("visitRecords").getFullList({ expand: "place,review.tags", sort: "+date" });

      this.visitRecords = visitRecords.map((item): VisitData => {
        if (item.review === "") {
          return {
            id: item.id,
            price: item.expand!.place.price,
            date: this.formatToDate(item.created),
            placeName: item.expand!.place.placeName,
            type: item.expand!.place.type,
            reviewText: "",
            reviewImg: "",
            reviewTags: [],
          };
        } else {
          const tags = item.expand!.review.expand!.tags.map((i: { text: string }) => i.text);
          return {
            id: "",
            type: "",
            price: item.expand!.place.price,
            date: this.formatToDate(item.created),
            placeName: item.expand!.place.placeName,
            reviewText: item.expand!.review.text,
            reviewImg: getImageURL(item.expand!.review.collectionId, item.expand!.review.id, item.expand!.review.img),
            reviewTags: tags,
          };
        }
      });
    } catch (err) {
      // 통신 실패 시 에러 메시지 출력
      console.log(err);
    }
  }

  render() {
    return html`
      <div class="review-visit-record-wrap">
        ${this.visitRecords?.map((item) => {
          if (item.reviewText !== "") {
            return html`<visit-record-complete .data=${item}></visit-record-complete>`;
          } else {
            return html`<visit-record-noreview .data=${item}></visit-record-noreview>`;
          }
        })}
      </div>
    `;
  }
}
