/* version 1 - real api not passing test because of slow api response.

const api_quote_url = "https://forismatic-proxy.herokuapp.com/";

// function getQuote fetches the quote and sets the elements. getQuote is called on pageload and with
// the new quote button
async function getQuote() {
  const response = await fetch(api_quote_url);
  const quote = await response.json();
  let { quoteAuthor, quoteText } = quote;
  quoteText = quoteText.trim();
  document.getElementById("text").textContent = `"${quoteText}"`;
  document.getElementById("author").textContent = quoteAuthor;
  document.getElementById(
    "tweet-quote"
  ).href = `https://twitter.com/intent/tweet?hashtags=quotes&text="${quoteText}" ~ ${quoteAuthor}`;
  document.getElementById(
    "wiki"
  ).href = `https://en.wikipedia.org/wiki/${quoteAuthor}`;
}

getQuote();

*/

/* version 2 */

const api_quote_url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

let quoteData = {};

async function getData() {
  const response = await fetch(api_quote_url);
  return (quoteData = await response.json());
}

function getQuote() {
  getData()
    .then(() => {
      let quotes = quoteData.quotes.map((quote) => {
        return { quote: quote.quote, author: quote.author };
      });

      let newQuote =
        quoteData.quotes[Math.floor(Math.random() * quotes.length)];

      let { quote, author } = newQuote;

      document.getElementById("author").textContent = author;

      quote = quote.trim();
      document.getElementById("text").textContent = `"${quote}"`;

      document.getElementById(
        "tweet-quote"
      ).href = `https://twitter.com/intent/tweet?hashtags=quotes&text="${quote}" ~ ${author}`;
      document.getElementById(
        "wiki"
      ).href = `https://en.wikipedia.org/wiki/${author}`;
    })
    .catch(() => {
      document.getElementById("author").textContent =
        "There should be a quote somewhere";

      document.getElementById("text").textContent = "Anonymous";
    });
}

getQuote();
