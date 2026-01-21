let quotesByMood = {};
let lastQuoteIndex = -1;

const quoteText = document.getElementById("quote");
const movieText = document.getElementById("movie");
const moodButtons = document.querySelectorAll("[data-mood]");

function loadQuotes() {
  fetch("quotes.json")
    .then(res => res.json())
    .then(data => {
      quotesByMood = data;
      applyMoodTheme();
      showQuote();
    })
    .catch(err => console.error(err));
}

function getRandomQuote() {
  const quotes = quotesByMood[currentMood];
  if (!quotes || quotes.length === 0) return null;

  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === lastQuoteIndex && quotes.length > 1);

  lastQuoteIndex = index;
  return quotes[index];
}

function showQuote() {
  const quote = getRandomQuote();
  if (!quote) return;

  quoteText.textContent = `"${quote.text}"`;
  movieText.textContent = `— ${quote.movie}`;

  quoteText.classList.remove("animate");
  movieText.classList.remove("animate");
  void quoteText.offsetWidth;
  quoteText.classList.add("animate");
  movieText.classList.add("animate");
}

function applyMoodTheme() {
  document.body.className = currentMood;
}

moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentMood = button.dataset.mood;

    moodButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    applyMoodTheme();
    showQuote();
  });

  button.addEventListener("mousemove", event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});
const shareBtn = document.getElementById("shareBtn");

const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const text = `${quoteText.textContent} ${movieText.textContent}`;
    navigator.clipboard.writeText(text);

    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => {
      copyBtn.textContent = "📋 Copy";
    }, 1200);
  });
}


loadQuotes();
document
  .querySelector(`[data-mood="${currentMood}"]`)
  .classList.add("active");
loadQuotes()

