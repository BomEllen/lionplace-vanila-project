import { html, css, LitElement, unsafeCSS } from "lit";
import "./timegps.scss";
import time from "../../assets/images/time&gps.svg";
import frame from "../../assets/images/frame 32.svg";
import "../../styles/sass/font.scss";
import styles from './timegps.scss?inline';

class Timegps extends LitElement {
  static styles = css`
  ${unsafeCSS(styles)}
  
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

customElements.define("time-gps", Timegps);
