import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './category.scss?inline'; // SCSS를 인라인으로 불러옵니다.
import '../../assets/sass/reset.scss';
import '../../assets/sass/variables.scss';
import '../../assets/sass/font.scss';
import allBlack from "../../assets/images/all-black.svg"
import onlyPhotoBlack from "../../assets/images/only-img-black.svg"

class Category extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}

  `;

  render() {
    return html`
    <article class="category-wrap">
    <section class="content">
        <!-- Tab Content 1 -->
        <section class="tab-content" id="content1" role="tabpanel" aria-labelledby="tab1">
            <img src="${allBlack}" alt="전체" />
            <span>전체</span>
        </section>

        <!-- Tab Content 2 -->
        <section class="tab-content" id="content2" role="tabpanel" aria-labelledby="tab2">
            <img src="${onlyPhotoBlack}" alt="사진" />
            <span>사진</span>
        </section>
    </section>

    <!-- Select Box -->
        <label for="sort-options">정렬 기준</label>
        <select id="sort-options" name="sort-options" aria-label="정렬 기준">
            <option value="views">조회수순</option>
            <option value="popularity">인기수순</option>
            <option value="newest">최신수순</option>
        </select>
</article>
    `;
  }
}

customElements.define('cate-gory', Category);
