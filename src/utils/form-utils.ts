const idRegex = /^[A-Za-z0-9]{3,}$/;
const emainRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pwRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

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

export function handleInput(inputList: HTMLInputElement[], loginBtn: HTMLButtonElement) {
  if (isSignUpValid(inputList)) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

export function alertAndProceed(msg: string): Promise<void> {
  return new Promise((res) => {
    alert(msg);
    res();
  });
}
