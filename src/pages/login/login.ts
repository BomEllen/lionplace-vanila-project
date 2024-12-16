import "../../styles/sass/reset.scss";
import "../../styles/sass/font.scss";
import "./login.scss";
import pb from "../../api/pocketbase";

const idRegex = /^[A-Za-z0-9]{3,}$/;
const emainRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pwRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

const inputList = [...document.querySelectorAll("input")];
const loginBtn = document.querySelector(".btn-login") as HTMLButtonElement;

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
        if (emainRegex.test(item.value)) {
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

function handleInput(inputList: HTMLInputElement[]) {
  if (isSignUpValid(inputList)) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

function alertAndProceed(msg: string): Promise<void> {
  return new Promise((res) => {
    alert(msg);
    res();
  });
}

async function handleLogin(e: Event) {
  e.preventDefault();

  const [userName, pw] = [inputList[0].value, inputList[1].value];

  // const [userName, pw] = ["test@naver.com", "league951!"];

  try {
    const authData = await pb.collection("users").authWithPassword(userName, pw);

    console.log("로그인 성공");

    alertAndProceed("로그인 성공! 확인 버튼을 누르시면 메인 페이지로 이동합니다.").then(() => {
      location.href = "/src/"; // 로그인 페이지로 이동
    });
  } catch (err) {
    console.log("로그인 실패");
    console.log(err);
  }
}

inputList.forEach((item) => {
  item.addEventListener("change", () => {
    handleInput(inputList);
  });
});

loginBtn.addEventListener("click", handleLogin);
