import "../../styles/sass/reset.scss";
import "../../styles/sass/font.scss";
import "./register.scss";
import pb from "../../api/pocketbase";
import { User } from "../../@types/type";
import { alertAndProceed, debounce, handleInput } from "../../utils/form-utils";
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner";

const inputList = [...document.querySelectorAll("input")];
const loginBtn = document.querySelector(".btn-login") as HTMLButtonElement;
const loadingSpinner = document.querySelector("loading-spinner") as LoadingSpinner;

// 중복된 아이디(userName)가 존재하는지 확인하는 함수(T/F를 반환)
function isInputUnique(userArray: User[], inputId: string, inputEmail: string): boolean {
  let result = true;

  userArray.forEach((item) => {
    console.log(item);

    if (item.userName === inputId) {
      alert("중복된 아이디가 존재합니다. 다른 아이디를 사용해 주세요.");
      inputList[0].value = "";
      inputList[0].classList.add("error");
      inputList[0].focus();
      result = false;
      setTimeout(() => inputList[0].classList.remove("error"), 300);
    }
    if (item.email === inputEmail) {
      alert("중복된 메일이 존재합니다. 다른 메일을 사용해 주세요.");
      inputList[1].value = "";
      inputList[1].classList.add("error");
      inputList[1].focus();
      result = false;
      setTimeout(() => inputList[0].classList.remove("error"), 300);
    }
  });

  return result;
}

// UserRecord를 만들어 포켓베이스에 저장하는 함수
async function createUserRecord() {
  try {
    const response = await fetch("/defaultUserImage.png");
    if (!response.ok) {
      throw new Error("Failed to fetch default image.");
    }
    const imageBlob = await response.blob();

    const data = {
      userName: inputList[0].value,
      email: inputList[1].value,
      password: inputList[2].value,
      passwordConfirm: inputList[3].value,
      avatar: imageBlob,
      emailVisibility: "true",
    };

    const formData = new FormData();
    for (const key in data) {
      if (key === "avatar") {
        formData.append(key, data[key], "default-avatar.png"); // 파일 이름 지정 가능
      } else {
        formData.append(key, data[key as keyof typeof data]);
      }
    }

    const record = await pb.collection("users").create(formData);
    console.log("User record created:", record);
    loadingSpinner.hide();
  } catch (err) {
    loadingSpinner.hide();
    throw err;
  }
}

async function handleReg(e: Event) {
  e.preventDefault();

  try {
    loadingSpinner.show();
    const record = (await pb.collection("users").getFullList()) as User[];
    console.log(record);

    loadingSpinner.hide();
    if (isInputUnique(record, inputList[0].value, inputList[1].value)) {
      loadingSpinner.show();
      await createUserRecord();

      await alertAndProceed("회원가입이 완료되었습니다. 확인 버튼을 누르시면 로그인 페이지로 이동합니다.");

      location.href = "/src/pages/login/"; // 로그인 페이지로 이동
    }
  } catch (err) {
    loadingSpinner.hide();
    console.log(err);
  }
}

inputList.forEach((item) => {
  item.addEventListener("input", () => {
    const debounceHandleInput = debounce(handleInput, 300);
    debounceHandleInput(inputList, loginBtn);
  });
});

loginBtn.addEventListener("click", handleReg);
