const form = document.getElementById("requestForm");
const formStatus = document.getElementById("formStatus");
const toTopBtn = document.getElementById("toTopBtn");
const fields = ["name", "phone", "message"];
const WHATSAPP_NUMBER = "+77751959135";

// Attach smooth scroll to internal anchor links for better UX.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const showFieldError = (input, message) => {
  const group = input.closest(".input-group");
  const errorElement = group.querySelector(".error-message");
  group.classList.add("error");
  errorElement.textContent = message;
};

const clearFieldError = (input) => {
  const group = input.closest(".input-group");
  const errorElement = group.querySelector(".error-message");
  group.classList.remove("error");
  errorElement.textContent = "";
};

const validateField = (input) => {
  const value = input.value.trim();

  if (!value) {
    showFieldError(input, "Заполните это поле");
    return false;
  }

  if (input.id === "phone") {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) {
      showFieldError(input, "Введите корректный телефон");
      return false;
    }
  }

  clearFieldError(input);
  return true;
};

const openWhatsApp = ({ name, phone, message }) => {
  const text =
    `Новая заявка с сайта IT Fusion%0A%0A` +
    `Имя: ${encodeURIComponent(name)}%0A` +
    `Телефон: ${encodeURIComponent(phone)}%0A` +
    `Сообщение: ${encodeURIComponent(message)}`;
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(waUrl, "_blank", "noopener,noreferrer");
};

fields.forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => validateField(input));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  let isValid = true;
  fields.forEach((id) => {
    const input = document.getElementById(id);
    if (!validateField(input)) isValid = false;
  });

  if (!isValid) return;

  const payload = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  openWhatsApp(payload);
  formStatus.textContent = "Открываю WhatsApp для отправки заявки...";
  form.reset();
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 320) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
