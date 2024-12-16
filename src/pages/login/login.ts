import "../../styles/sass/reset.scss";
import "../../styles/sass/font.scss";
import "./login.scss";
import pb from "../../api/pocketbase";
import { alertAndProceed, handleInput } from "../../utils/sign-form";

const inputList = [...document.querySelectorAll("input")];
const loginBtn = document.querySelector(".btn-login") as HTMLButtonElement;

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
    handleInput(inputList, loginBtn);
  });
});

loginBtn.addEventListener("click", handleLogin);
