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

  render() {
    return html`
      <div class="visit-like-popup">
        <ul>
          <li>${this.data.placeName}</li>
          <li>${this.data.date}</li>
          <li>${this.data.price}</li>
        </ul>
      </div>
    `;
  }
}
