const launchDate = new Date("2026-08-01T00:00:00+09:00");
const dDay = document.querySelector("#dDay");
const openNotify = document.querySelector("#openNotify");
const form = document.querySelector("#notifyForm");
const note = document.querySelector(".form-note");

function renderDday() {
  if (!dDay) return;

  const now = new Date();
  const diff = launchDate.getTime() - now.getTime();
  const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  dDay.textContent = `D-${String(days).padStart(3, "0")}`;
}

renderDday();

openNotify?.addEventListener("click", () => {
  form?.classList.remove("is-hidden");
  form?.querySelector("input")?.focus();
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  note.textContent = "알림 신청이 완료되었습니다. 8월 1일 소식을 전해드릴게요.";
  form.reset();
});
