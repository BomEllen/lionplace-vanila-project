import { html, css, LitElement, CSSResultGroup, unsafeCSS } from 'lit';
import styles from './horizon-image.scss?inline';
import { customElement } from "lit/decorators.js";

// FeedItem 인터페이스 정의
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

// 장소 정보 예시 (실제로는 서버나 데이터베이스에서 로드될 수 있음)
interface PlaceInfo {
  placeName: string;
  address: string;
}

@customElement("horizon-image")
class HorizonImage extends LitElement {
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}
    body {
      font-family: "Paperlogy", sans-serif;
      font-weight: 300;
    }

    /* 북마크 버튼 스타일 */
    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      outline: none;
    }

    button:focus {
      outline: 2px solid #FF7710;
    }

    /* 텍스트 오버플로우 처리 */
    .text-wrap p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  images: FeedItem[] = [];
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  places: Record<string, PlaceInfo> = {};

  // 장소 정보를 가져오는 비동기 함수
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
      console.error('Places API 요청 실패:', error);
      this.places = {};
    }
  }

  // 이미지 데이터를 가져오는 비동기 함수
  async fetchImages() {
    try {
      const response = await fetch('https://compass-mighty.pockethost.io/api/collections/reviews/records');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (data.items && Array.isArray(data.items)) {
        this.images = await Promise.all(
          data.items.map(async (item: any) => {
            const imgFieldName = item.img;
            const imgUrl = `https://compass-mighty.pockethost.io/api/files/reviews/${item.id}/${imgFieldName}`;
            const placeId = item.place?.id || null;
            const placeData = this.places[placeId] || { placeName: '정보 없음', address: '정보 없음' };

            // 이미지 프리로드 (이미지를 미리 로드)
            const img = new Image();
            img.src = imgUrl;
            await img.decode(); // 이미지가 디코딩될 때까지 기다림

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
          })
        );
      } else {
        this.images = [];
      }

      this.requestUpdate();
    } catch (error) {
      console.error('API 요청 실패:', error);
      this.images = [];
    }
  }

  // 북마크 토글 함수
  toggleBookmark(index: number) {
    const currentImage = this.images[index];
    currentImage.isBookmarked = !currentImage.isBookmarked;

    this.message = currentImage.isBookmarked
      ? '북마크에 추가되었습니다!'
      : '북마크에서 제외되었습니다!';
    this.messageType = currentImage.isBookmarked ? 'success' : 'error';

    setTimeout(() => {
      this.message = null;
      this.requestUpdate();
    }, 3000); // 3초 후 메시지 사라짐
    
    this.requestUpdate();
  }

  // 컴포넌트가 처음 렌더링된 후 호출
  async firstUpdated() {
    try {
      // 장소 정보와 이미지 데이터를 병렬로 요청
      await Promise.all([this.fetchPlaces(), this.fetchImages()]);
    } catch (error) {
      console.error('데이터 요청 중 오류 발생:', error);
    }
  }

  // 렌더링 함수
  render() {
    return html`
      <section class="horizon-image-container">
        <div class="image-list">
          ${this.images.length === 0
            ? html`<p>로딩 중...</p>`
            : this.images.map(
                (image, index) => html`
                  <div class="image-item">
                    <button 
                      @click="${() => this.toggleBookmark(index)}"
                      aria-label="${image.isBookmarked ? '북마크 취소' : '북마크 추가'}"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="${image.isBookmarked ? '#FF7710' : '#aaa'}"
                      >
                        <path
                          d="M2.3999 2.4C2.3999 1.08 3.4799 0 4.7999 0H19.1999C19.8364 0 20.4469 0.252856 20.897 0.702944C21.347 1.15303 21.5999 1.76348 21.5999 2.4V24L11.9999 19.2L2.3999 24V2.4Z"
                        />
                      </svg>
                    </button>
                    <div class="image-wrap">
                      <img 
                        src="${image.img}" 
                        alt="${image.title || '이미지'}" 
                        loading="lazy"
                      />
                    </div>
                    <div class="text-wrap">
                      <h3>${this.places[image.place]?.placeName || '위치 없음'}</h3>
                      <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${image.text}</p>
                      <p style="color: gray; font-size: 14px;">${this.places[image.place]?.address || '주소 정보 없음'}</p>
                    </div>
                  </div>
                `
              )}
        </div>
      </section>

      <!-- 북마크 메시지 -->
      ${this.message
        ? html`<div class="bookmark-message ${this.messageType}">
            ${this.message}
          </div>`
        : ''}
    `;
  }
}
