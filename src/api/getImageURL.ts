// collectionId, id, filename을 받고 해당 파일의 링크를 반환하는 함수
export function getImageURL(collectionId: string, id: string, fileName: string): string {
  return `https://compass-mighty.pockethost.io/api/files/${collectionId}/${id}/${fileName}`;
}
