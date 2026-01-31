const inputElement = document.getElementById("input");
const translateBtn = document.getElementById("translateBtn");
const outputElement = document.getElementById("output");

async function translateText() {
  const text = inputElement.value.trim();

  if (!text) {
    outputElement.textContent = "Будь ласка, введіть текст для перекладу";
    return;
  }

  outputElement.textContent = "⏳ Перекладаю...";

  try {
    const safeText = encodeURIComponent(text);
    const email = "example@email.com";

    const url = `https://api.mymemory.translated.net/get?q=${safeText}&langpair=uk|en&de=${email}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200) {
      outputElement.textContent = data.responseData.translatedText;
    } else {
      outputElement.textContent =
        "❌ Помилка перекладу. Спробуйте ще раз.";
    }
  } catch (error) {
    outputElement.textContent = "❌ Помилка мережі. Перевірте з'єднання.";
    console.error("Помилка:", error);
  }
}

translateBtn.addEventListener("click", translateText);

inputElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    translateText();
  }
});
