import "../../styles/sass/reset.scss";
import "../../styles/sass/font.scss";
import "./delete-account.scss";
import pb from "../../api/pocketbase";
import { User } from "../../@types/type";
import { alertAndProceed, debounce, handleInput } from "../../utils/form-utils";
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner";

const auth = localStorage.getItem("auth");

// 로그인된 상태가 아닌 채 접근 시 리디렉션
if (auth === null) {
  alertAndProceed("로그인 되어있지 않은 상태로 접근이 불가능 합니다.").then(() => {
    history.back();
  });
}

const loadingSpinner = document.querySelector("loading-spinner") as LoadingSpinner;
const inputList = [...document.querySelectorAll("input")];
const deleteAccountBtn = document.querySelector(".btn-delete-account") as HTMLButtonElement;
const record = JSON.parse(auth as string).record as User;
const { id, userName } = record;

// 유저의 비밀번호가 맞는지 확인하는 함수
async function isPwRight(pw: string) {
  try {
    const authData = await pb.collection("users").authWithPassword(`${userName}`, `${pw}`);

    return true;
  } catch (err) {
    loadingSpinner.hide();

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

// 회원 탈퇴 버튼이 눌리고, 회원탈퇴를 처리하는 함수
async function handleDeleteAccount(e: Event) {
  e.preventDefault();

  try {
    loadingSpinner.show();

    const authValue = await isPwRight(inputList[0].value);

    if (authValue) {
      await deleteUserRecord();
      loadingSpinner.hide();

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
