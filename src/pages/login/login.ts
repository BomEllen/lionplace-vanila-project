import "../../styles/sass/reset.scss";
import "../../styles/sass/font.scss";
import "./login.scss";
import pb from "../../api/pocketbase";
import { handleInput, debounce, alertAndProceed } from "../../utils/form-utils";

const inputList = [...document.querySelectorAll("input")];
const loginBtn = document.querySelector(".btn-login") as HTMLButtonElement;

async function handleLogin(e: Event) {
  e.preventDefault();

  // 각각 순서대로 아이디, 비밀번호
  const [userName, pw] = [inputList[0].value, inputList[1].value];

  try {
    const { record, token } = await pb.collection("users").authWithPassword(userName, pw);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        record,
        token,
      })
    );

    console.log("로그인 성공");

    alertAndProceed("로그인 성공! 확인 버튼을 누르시면 메인 페이지로 이동합니다.").then(() => {
      location.href = "/src/pages/feed/"; // 피드 페이지로 이동
    });
  } catch (err) {
    // 차후 로그인 실패 시 알림 처리 예정
    console.log("로그인 실패");
    console.log(err);
  }
}

inputList.forEach((item) => {
  item.addEventListener("input", () => {
    const debounceHandleInput = debounce(handleInput, 300);
    debounceHandleInput(inputList, loginBtn);
  });
});

loginBtn.addEventListener("click", handleLogin);
