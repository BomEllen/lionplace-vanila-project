import { html, css, LitElement } from 'lit';
import "./timegps.scss";
import time from "../../assets/images/time&gps.svg"; 
import frame from "../../assets/images/frame 32.svg";
import "../../assets/sass/font.scss";


class Timegps extends LitElement {
  static styles = css`
    body {
    font-family: "Paperlogy", sans-serif;
    font-weight: 300;
    }

    .time-lte {
      display: flex;
      justify-content: space-between;
      margin: var(--space-sm);
    }
  `;

  render() {
    return html`
      <div class="time-lte">
        <img src="${time}" alt="Time and GPS" />
        <img src="${frame}" alt="Frame" />
      </div>
    `;
  }
}

customElements.define('time-gps', Timegps);
