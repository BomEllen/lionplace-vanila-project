declare module "*.png" {
  const content: string; // 파일 경로를 string으로 처리
  export default content;
}

declare module "*.jpg" {
  const content: string; // 파일 경로를 string으로 처리
  export default content;
}

declare module "*.scss" {
  const content: string; // SCSS 모듈을 string으로 처리
  export default content;
}

declare module "*.svg" {
  const content: string; // 파일 경로를 string으로 처리
  export default content;
}

declare module "*.scss?inline" {
  const content: string;
  export default content;
}
