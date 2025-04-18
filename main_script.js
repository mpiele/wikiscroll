import { getWikipediaSummary } from './wikipedia-api.js';

async function loadRandomItemAndSummary() {
  try {
    // Fetch data from the JSON file
    const response = await fetch('articles/history.json');
    const data = await response.json();

    // Pick a random item from the array
    const randomItem = data[Math.floor(Math.random() * data.length)];

    // Fetch the Wikipedia summary for the random item
    const result = await getWikipediaSummary(randomItem);

    // Return an object with the article name, summary, and link
    return {
      articleName: result.title,
      summary: result.summary,
      link: result.link
    };

  } catch (error) {
    console.error('Error loading data or fetching summary:', error);
    return null; // Return null if there's an error
  }
}

loadRandomItemAndSummary().then(result => {
    if (result) {
        console.log('Article Name:', result.articleName);
        console.log('Summary:', result.summary);
        console.log('Link:', result.link);

        $("#article_title").text(result.articleName);
        $("#article_summary").text(result.summary);
        $("#article_url").attr("href", result.link);

    } else {
        console.log('Error retrieving article data');
    }
    });

// Call the function and use the returned data
$("#new_article_btn").click(function () {   
    loadRandomItemAndSummary().then(result => {
        if (result) {
            console.log('Article Name:', result.articleName);
            console.log('Summary:', result.summary);
            console.log('Link:', result.link);
    
            $("#article_title").text(result.articleName);
            $("#article_summary").text(result.summary);
            $("#article_url").attr("href", result.link);
    
        } else {
            console.log('Error retrieving article data');
        }
        });
});