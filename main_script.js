import { getWikipediaSummary } from './wikipedia-api.js';

// Helper: Get category from cookie
function getCategoryFromCookie() {
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (let cookie of cookies) {
    if (cookie.startsWith("category=")) {
      return cookie.split("=")[1];
    }
  }
  return null;
}

// Helper: Truncate summary text to maxLength characters
function truncateSummary(text, maxLength = 250) {
  return text.length > maxLength ? text.slice(0, maxLength).trim() + "…" : text;
}

const category = getCategoryFromCookie();
const $container = $("#article_container");
const $title = $("#article_title");
const $summary = $("#article_summary");
const $url = $("#article_url");

// Fetch random article from local JSON and get summary
async function loadRandomItemAndSummary() {
  try {
    const response = await fetch('articles/' + category + '.json');
    const data = await response.json();
    const randomItem = data[Math.floor(Math.random() * data.length)];
    const result = await getWikipediaSummary(randomItem);

    return {
      articleName: result.title,
      summary: truncateSummary(result.summary),
      link: result.link
    };
  } catch (error) {
    console.error('Error loading data or fetching summary:', error);
    return null;
  }
}

// Animate out -> update -> animate in
async function animateArticleChange() {
  // Slide out animation
  $container.removeClass().addClass("article-slide-out-right");

  await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation

  const result = await loadRandomItemAndSummary();
  if (!result) return;

  // Update content
  $title.text(result.articleName);
  $summary.text(result.summary);
  $url.attr("href", result.link).text("Learn more");

  // Slide in animation
  $container.removeClass().addClass("article-slide-in-left");

  setTimeout(() => {
    $container.removeClass(); // Clean up animation class
  }, 500);
}

// Initial setup on page load
$(document).ready(() => {
  loadRandomItemAndSummary().then(result => {
    if (result) {
      $title.text(result.articleName);
      $summary.text(result.summary);
      $url.attr("href", result.link).text("Learn more");
    }
  });

  // Bind button click
  $("#new_article_btn").click(animateArticleChange);
});

document.getElementById("go_back_btn").addEventListener("click", function() {
  window.history.back(); // Go back to the previous page in history
});
