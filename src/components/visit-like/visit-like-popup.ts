import { html, css, LitElement, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./visit-like.scss?inline";

@customElement("visit-like-popup")
class VisitLikePopup extends LitElement {
  private data = { placeName: "", date: "", price: "" };

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);

    const placeName = urlParams.get("placeName");
    const date = urlParams.get("date");
    const price = urlParams.get("price");

    if (placeName != null && date != null && price != null) {
      this.data = {
        placeName: placeName,
        date: date,
        price: price,
      };
    }
  }

  handleClick() {
    history.back();
  }

  render() {
    return html`
      <div class="visit-like-popup">
        <ul>
          <li>${this.data.placeName}</li>
          <li>${this.data.date}</li>
          <li>${this.data.price}</li>
        </ul>
        <button @click=${this.handleClick} type="button" class="popup-close-btn">
          <svg role="img" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>이 페이지 나가기</title>
            <path d="M13 13L7 7M7 7L1 1M7 7L13 1M7 7L1 13" stroke="#19172E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    `;
  }
}
