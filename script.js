const inputElement = document.getElementById("input");
const translateBtn = document.getElementById("translateBtn");
const outputElement = document.getElementById("output");
const fromLangSelect = document.getElementById("fromLang");
const toLangSelect = document.getElementById("toLang");
const swapBtn = document.getElementById("swapLang");
const themeToggle = document.getElementById("themeToggle");
const copyBtn = document.getElementById("copyBtn");

const languageMap = {
  uk: "uk_UA",
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  pt: "pt_PT",
  ru: "ru_RU",
  ja: "ja_JP",
  zh: "zh_CN",
  ko: "ko_KR",
  ar: "ar_SA",
  hi: "hi_IN",
  tr: "tr_TR",
  pl: "pl_PL",
  nl: "nl_NL",
  sv: "sv_SE",
  da: "da_DK"
};

document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme") || "light";
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

swapBtn.addEventListener("click", () => {
  const temp = fromLangSelect.value;
  fromLangSelect.value = toLangSelect.value;
  toLangSelect.value = temp;
});

async function translateText() {
  const text = inputElement.value.trim();

  if (!text) {
    outputElement.textContent = "Будь ласка, введіть текст для перекладу";
    copyBtn.style.display = "none";
    return;
  }

  outputElement.textContent = "⏳ Перекладаю...";
  outputElement.classList.add("loading");

  try {
    const safeText = encodeURIComponent(text);
    const fromLang = fromLangSelect.value;
    const toLang = toLangSelect.value;
    const email = "example@email.com";

    const url = `https://api.mymemory.translated.net/get?q=${safeText}&langpair=${fromLang}|${toLang}&de=${email}`;

    const response = await fetch(url);
    const data = await response.json();

    outputElement.classList.remove("loading");

    if (data.responseStatus === 200) {
      outputElement.textContent = data.responseData.translatedText;
      copyBtn.style.display = "block";
    } else {
      outputElement.textContent = "❌ Помилка перекладу. Спробуйте ще раз.";
      copyBtn.style.display = "none";
    }
  } catch (error) {
    outputElement.classList.remove("loading");
    outputElement.textContent = "❌ Помилка мережі. Перевірте з'єднання.";
    copyBtn.style.display = "none";
    console.error("Помилка:", error);
  }
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(outputElement.textContent).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "✓ Скопійовано!";
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  });
});

translateBtn.addEventListener("click", translateText);

inputElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    translateText();
  }
});
