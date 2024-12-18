import { html, LitElement, css, CSSResultGroup, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./post.scss?inline";
import pb from "../../api/pocketbase";
import { PostData } from "../../@types/type";

@customElement("custom-post")
class Post extends LitElement {
  @property({ type: Object }) data: PostData | null = null;

  static styles?: CSSResultGroup | undefined = css`
    ${unsafeCSS(styles)}
  `;

  handleFollow(e: Event) {
    console.log(e.target);
  }

  render() {
    const defaultImg = "../../assets/images/defaultImg.png";
    const defaultText = `'함께 성장하는 바른 교육' 이듬(EUID)과 멋쟁이 사자처럼 태킷(Techit) 스쿨이 만났습니다. '이듬' 교육이 지향하는 비전은 동반 성장에 있습니다. 강사에서 수강생으로 한 방향으로 흘러가는 지식 전달이 아닌, 함께 공감하고 이해하며 경험하는 교육 가치를 통해 공동의 혁신을 이끌어내는 것을 목표로 합니다. 멋쟁이 사자처럼 태킷 스쿨은 '함께'의 가치를 중요하게 생각합니다. 5년이 지나도, 10년이 지나도 IT 업계에 필요한 인재를 육성하는 교육을 제공하고, 기업의 HRD 파트너로 존재할 것이며 국내 대표 IT 교육 회사인 만큼 더 좋은 교육이 무엇인지를 끊임없이 고민하는 회사로 자리매김할 것입니다.`;
    const { userImg, date, image, text, userName, reviewCount } = this.data as PostData;

    return html`
      <li class="post-item">
        <div class="profile-follow">
          <div class="post-profile">
            <img src="${userImg === "" ? defaultImg : userImg}" alt="${userName}의 profile 사진" class="profile-img" />
            <span class="profile-name">${userName === "" ? "defaultName" : userName}</span>
            <span class="review-info">사진리뷰 ${reviewCount} | ${date === "" ? "12.18.수" : date}</span>
          </div>

          <button type="button" class="btn-follow" @click=${this.handleFollow}>팔로우</button>
        </div>

        <img src="${image === "" ? defaultImg : image}" alt="${userName}의 리뷰 사진" class="review-img" />

        <span class="review-text">${text === "" ? defaultText : text}</span>
      </li>
    `;
  }
}
