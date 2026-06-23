const FORM_ENDPOINT = "https://formspree.io/f/xpqgwleo";

function updateCountdown() {
  const el = document.querySelector("[data-launch-date]");
  if (!el) return;

  const launch = new Date(`${el.dataset.launchDate}T00:00:00+09:00`);
  const today = new Date();
  const todayKst = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  todayKst.setHours(0, 0, 0, 0);

  const diff = launch.getTime() - todayKst.getTime();
  const days = Math.max(0, Math.ceil(diff / 86400000));
  el.textContent = `D-${String(days).padStart(2, "0")}`;
}

function setupNotifyForm() {
  const openButton = document.querySelector(".notify-open");
  const form = document.querySelector(".notify-form");
  const message = document.querySelector(".form-message");

  if (openButton && form) {
    openButton.addEventListener("click", () => {
      form.classList.add("is-open");
      form.querySelector("input[type='email']")?.focus();
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
      message.textContent = "수집함 설정이 필요합니다. Formspree 엔드포인트를 script.js에 연결해 주세요.";
      message.className = "form-message is-warning";
      return;
    }

    message.textContent = "신청 중입니다...";
    message.className = "form-message";

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("request failed");

      form.reset();
      message.textContent = "출시 알림 신청이 완료되었습니다.";
      message.className = "form-message is-success";
    } catch {
      message.textContent = "잠시 후 다시 시도해 주세요.";
      message.className = "form-message is-warning";
    }
  });
}

updateCountdown();
setupNotifyForm();
