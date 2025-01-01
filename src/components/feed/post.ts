import { html, LitElement, css, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./post.scss?inline";
import { PostData } from "../../@types/type";

@customElement("custom-post")
class Post extends LitElement {
  @property({ type: Object }) data: PostData | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  handleFollow(e: Event) {
    // 차후 follow 버튼을 클릭 시 팔로우 수가 늘어나고(profile-all과 DB에 적용)
    // 다시 누르면 팔로우가 풀리는 기능을 염두함
    console.log(e.target);
  }

  render() {
    const { userImg, date, image, text, userName, reviewCount } = this.data as PostData;

    return html`
      <div class="post-item">
        <div class="profile-follow">
          <div class="post-profile">
            <img src="${userImg}" alt="${userName}의 profile 사진" class="profile-img" width="28px" height="28px" />
            <span class="profile-name">${userName}</span>
            <span class="review-info">사진리뷰 ${reviewCount} | ${date}</span>
          </div>

          <button type="button" class="btn-follow" @click=${this.handleFollow}>팔로우</button>
        </div>

        <img src="${image}" alt="${userName}의 리뷰 사진" class="review-img" />

        <span class="review-text">${text}</span>
      </div>
    `;
  }
}
