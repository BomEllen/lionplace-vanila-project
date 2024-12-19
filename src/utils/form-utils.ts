const idRegex = /^[A-Za-z0-9]{3,}$/; // id 정규식, 3자 이상의 영어나 숫자
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email 정규식
const pwRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; // pw 정규식, 특수문자 포함한 8자 이상의 값

// id, email, pw, check-pw 필드들을 정규식 처리해 검사한 뒤 T/F를 반환하는 함수
function isSignUpValid(inputList: HTMLInputElement[]): boolean {
  let count = 0;

  for (let item of inputList) {
    switch (item.id) {
      case "id-field":
        if (idRegex.test(item.value)) {
          count++;
        }
        break;
      case "email-field":
        if (emailRegex.test(item.value)) {
          count++;
        }
        break;
      case "pw-field":
        if (pwRegex.test(item.value)) {
          count++;
        }
        break;
      case "check-pw-field":
        if (inputList[2].value === item.value) {
          count++;
        }
        break;
    }
  }

  if (count === inputList.length) {
    return true;
  }
  return false;
}

// Input을 받았을 때 isSignUpValid 함수를 돌려 해당 버튼을 활성화/비활성화 처리
export function handleInput(inputList: HTMLInputElement[], loginBtn: HTMLButtonElement) {
  if (isSignUpValid(inputList)) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

// 버튼이 눌리고 로그인 성공 시
// 메시지를 알림창에 띄운 뒤, 확인을 눌러야(알림이 종료 되어야) 다음 함수 처리
export function alertAndProceed(msg: string): Promise<void> {
  return new Promise((res) => {
    alert(msg);
    res();
  });
}
