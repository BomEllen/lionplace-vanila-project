import { html,css, LitElement, CSSResultGroup ,unsafeCSS} from 'lit';
import { customElement } from "lit/decorators.js";
import styles from './img-field-feed.scss?inline'; // SCSS를 인라인으로 불러옵니다.

interface FeedItem {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  text: string;
  isBookmarked: boolean;
  placeId: string | null;
  place: string;
  price: string;
}

interface PlaceInfo {
  placeName: string;
  address: string;
}

@customElement("image-field-feed")
class ImageFieldFeed extends LitElement {
  static styles: CSSResultGroup = css`
  ${unsafeCSS(styles)}
  `
  feedData: FeedItem[] = [];
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  places: Record<string, PlaceInfo> = {};

  async fetchPlaces() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/places/records');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        this.places = data.items.reduce((acc: Record<string, PlaceInfo>, item: any) => {
          if (item.id) {
            acc[item.id] = {
              placeName: item.placeName || '정보 없음',
              address: item.address || '정보 없음',
            };
          }
          return acc;
        }, {});
      } else {
        this.places = {};
      }
    } catch (error) {
      this.places = {};
    }
  }

  async fetchImages() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/reviews/records');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        this.feedData = data.items.map((item: any) => {
          const imgFieldName = item.img;
          const imgUrl = `https://compass-mighty.pockethost.io/api/files/reviews/${item.id}/${imgFieldName}`;
          const placeId = item.place?.id || null;
          const placeData = this.places[placeId] || { placeName: '정보 없음', address: '정보 없음' };
          return {
            id: item.id,
            img: imgUrl,
            title: item.title || '제목 없음',
            subtitle: item.subtitle || '',
            text: item.text || '',
            isBookmarked: false,
            placeId,
            place: item.place || '',
            price: item.price || '정보 없음',
          };
        });
      } else {
        this.feedData = [];
      }
      this.requestUpdate();
    } catch (error) {
      this.feedData = [];
    }
  }

  toggleBookmark(index: number) {
    const currentImage = this.feedData[index];
    currentImage.isBookmarked = !currentImage.isBookmarked;
    this.message = currentImage.isBookmarked ? '북마크에 추가되었습니다!' : '북마크에서 제외되었습니다!';
    this.messageType = currentImage.isBookmarked ? 'success' : 'error';
  
    // 메시지가 표시된 후 3초 뒤에 자동으로 사라지도록 설정
    setTimeout(() => {
      this.message = null;
      this.requestUpdate();
    }, 3000); // 3초 후 메시지 사라짐
    
    this.requestUpdate();
  }

  async firstUpdated() {
    try {
      await Promise.all([this.fetchPlaces(), this.fetchImages()]);
    } catch (error) {
      console.error('데이터 요청 중 오류 발생:', error);
    }
  }

  render() {
    return html`
      <section class="image-field-feed-container">
        <div class="image-list">
          ${this.feedData.length === 0
            ? html`<p>로딩 중...</p>`
            : this.feedData.map(
                (image, index) => html`
                  <div class="image-item">
                    <button @click="${() => this.toggleBookmark(index)}">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${image.isBookmarked ? '#FF7710' : '#aaa'}">
                        <path d="M2.3999 2.4C2.3999 1.08 3.4799 0 4.7999 0H19.1999C19.8364 0 20.4469 0.252856 20.897 0.702944C21.347 1.15303 21.5999 1.76348 21.5999 2.4V24L11.9999 19.2L2.3999 24V2.4Z" />
                      </svg>
                    </button>
                    <div class="image-wrap">
                      <img src="${image.img}" alt="${image.title}" />
                    </div>
                    <div class="text-overlay">
                      <h3>${this.places[image.place].placeName || '위치 없음'}</h3>
                      <p style="color: gray; font-size: 14px;">${this.places[image.place].address || '주소 정보 없음'}</p>
                    </div>
                  </div>
                `
              )}
        </div>
      </section>

      ${this.message ? html`<div class="bookmark-message ${this.messageType}">${this.message}</div>` : ''}
    `;
  }
}
