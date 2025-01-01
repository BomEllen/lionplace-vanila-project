import "../../styles/sass/reset.scss";
import "../../styles/sass/font.scss";
import "./delete-account.scss";
import pb from "../../api/pocketbase";
import { User } from "../../@types/type";
import { alertAndProceed, debounce, handleInput } from "../../utils/form-utils";

const inputList = [...document.querySelectorAll("input")];
const deleteAccountBtn = document.querySelector(".btn-delete-account") as HTMLButtonElement;
const auth = localStorage.getItem("auth");

if (auth === null) {
  alertAndProceed("로그인 되어있지 않은 상태로 접근이 불가능 합니다.").then(() => {
    history.back();
  });
}
const record = JSON.parse(auth as string).record as User;

const { id, userName } = record;

async function isPwRight(pw: string) {
  try {
    const authData = await pb.collection("users").authWithPassword(`${userName}`, `${pw}`);

    return true;
  } catch (err) {
    alert("비밀번호가 틀렸습니다.");
    inputList.forEach((item) => (item.value = ""));
    deleteAccountBtn.disabled = true;
    return false;
  }
}

// UserRecord를 삭제하는 함수
async function deleteUserRecord() {
  try {
    const record = await pb.collection("users").delete(id);
    console.log("User record deleted:", record);
  } catch (err) {
    console.log(err);
  }
}

async function handleDeleteAccount(e: Event) {
  e.preventDefault();

  try {
    const authValue = await isPwRight(inputList[0].value);

    if (authValue) {
      await deleteUserRecord();

      await alertAndProceed("회원탈퇴가 완료되었습니다. 확인 버튼을 누르시면 로그인 페이지로 이동합니다.");
      localStorage.removeItem("auth");
      localStorage.removeItem("pocketbase_auth");
      location.href = "/src/pages/login/"; // 로그인 페이지로 이동
    }
  } catch (err) {
    console.log(err);
  }
}

inputList.forEach((item) => {
  item.addEventListener("input", () => {
    const debounceHandleInput = debounce(handleInput, 300);
    debounceHandleInput(inputList, deleteAccountBtn);
  });
});

deleteAccountBtn.addEventListener("click", handleDeleteAccount);
