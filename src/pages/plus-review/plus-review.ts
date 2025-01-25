import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './plus-review.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';
import { customElement } from "lit/decorators.js";

@customElement("plus-review")
class PlusReview extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`
    `;
  }
}
