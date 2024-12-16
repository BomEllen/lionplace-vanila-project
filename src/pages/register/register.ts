import "../../styles/sass/reset.scss";
import "../../styles/sass/font.scss";
import "./register.scss";
import pb from "../../api/pocketbase";
import { User } from "../../@types/type";
import { alertAndProceed, handleInput } from "../../utils/form-utils";

const inputList = [...document.querySelectorAll("input")];
const loginBtn = document.querySelector(".btn-login") as HTMLButtonElement;

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

async function createUserRecord() {
  const data = {
    userName: inputList[0].value,
    email: inputList[1].value,
    password: inputList[2].value,
    passwordConfirm: inputList[3].value,
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
    handleInput(inputList, loginBtn);
  });
});

loginBtn.addEventListener("click", handleReg);
