const quotes = [
      "The future belongs to those who prepare for it today.",
      "Success is the sum of small efforts, repeated day in and day out.",
      "Don’t watch the clock; do what it does. Keep going.",
      "Push yourself, because no one else is going to do it for you.",
      "The expert in anything was once a beginner.",
      "Your education is a dress rehearsal for a life that is yours to lead.",
    ];

    function updateQuote() {
      const quoteBox = document.getElementById("quote-box");
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteBox.textContent = quotes[randomIndex];
    }

    setInterval(updateQuote, 10000); // every 10 seconds
window.onload = function () {
  generateQuote();
  setInterval(generateQuote, 7000); // every 7 seconds
};
