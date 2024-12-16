import "../../styles/sass/reset.scss";
import "../../styles/sass/font.scss";
import "./register.scss";
import pb from "../../api/pocketbase";
import { User } from "../../@types/type";

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

function isUserNameUnique(userArray: User[], inputId: string): boolean {
  let result = true;

  userArray.forEach((item) => {
    if (item.userName === inputId) {
      alert("중복된 아이디가 존재합니다. 다른 아이디를 사용해 주세요.");
      inputList[0].value = "";
      result = false;
    }
  });

  return result;
}

function alertAndProceed(msg: string): Promise<void> {
  return new Promise((res) => {
    alert(msg);
    res();
  });
}

async function createUserRecord() {
  const data = {
    password: inputList[2].value,
    passwordConfirm: inputList[3].value,
    email: inputList[1].value,
    userName: inputList[0].value,
  };

  const record = await pb.collection("users").create(data);
}

async function handleReg(e: Event) {
  e.preventDefault();
  const inputId = inputList[0].value;

  try {
    const record = (await pb.collection("users").getFullList()) as User[];

    if (isUserNameUnique(record, inputId)) {
      createUserRecord();

      alertAndProceed("회원가입이 완료되었습니다. 확인 버튼을 누르시면 로그인 페이지로 이동합니다.").then(() => {
        location.href = "/src/pages/login/"; // 로그인 페이지로 이동
      });
    }
  } catch (err) {
    console.log(err);
  }
}

inputList.forEach((item) => {
  item.addEventListener("change", () => {
    handleInput(inputList);
  });
});

loginBtn.addEventListener("click", handleReg);
