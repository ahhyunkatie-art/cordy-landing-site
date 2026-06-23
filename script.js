const launchDate = new Date("2026-08-01T00:00:00+09:00");
const FORM_ENDPOINT = "https://formspree.io/f/xpqgwleo";

const dDay = document.querySelector("#dDay");
const openNotify = document.querySelector("#openNotify");
const form = document.querySelector("#notifyForm");
const note = document.querySelector(".form-note");

function renderDday() {
  if (!dDay) return;

  const now = new Date();
  const diff = launchDate.getTime() - now.getTime();
  const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  dDay.textContent = `D-${String(days).padStart(2, "0")}`;
}

renderDday();

openNotify?.addEventListener("click", () => {
  form?.classList.remove("is-hidden");
  form?.querySelector("input")?.focus();
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!FORM_ENDPOINT) {
    note.textContent = "수집함 설정이 필요합니다. Formspree 엔드포인트를 script.js에 연결해 주세요.";
    return;
  }

  note.textContent = "알림 신청을 저장하는 중입니다.";

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Form submission failed");

    note.textContent = "알림 신청이 완료되었습니다. 8월 1일 소식을 전해드릴게요.";
    form.reset();
  } catch {
    note.textContent = "저장 중 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.";
  }
});
