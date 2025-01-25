import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './review.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../styles/sass/reset.scss';
import '../../styles/sass/variables.scss';
import '../../styles/sass/font.scss';
import '../../components/theme/theme.ts';
import '../../components/category/category.ts';
import { customElement } from "lit/decorators.js";

@customElement("review-page")
class Review extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`
    <h2>테마<span> 1</span></h2>
    <theme-component></theme-component>
    <cate-gory></cate-gory>
    `;
  }
}
