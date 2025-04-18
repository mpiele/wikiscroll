export async function getWikipediaSummary(articleTitle) {
    try {
        // Encode the article title for the API request
        const encodedTitle = encodeURIComponent(articleTitle);

        // Construct the API URL
        const apiUrl = `https://en.wikipedia.org/w/api.php?` +
            `action=query` +
            `&format=json` +
            `&titles=${encodedTitle}` +
            `&prop=extracts|info` +
            `&exintro` +
            `&explaintext` +
            `&inprop=url` +
            `&origin=*`;

        // Fetch data from Wikipedia API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Get the page data (Wikipedia returns pages in an object)
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        // Check if the page exists
        if (pageId === "-1") {
            return {
                error: "Article not found"
            };
        }

        const page = pages[pageId];
        
        // Extract relevant information
        let summary = page.extract || "No summary available";

        // If no summary is available, fetch a fallback summary or section
        if (summary === "No summary available") {
            // You can choose to fallback to a more general description or specific section
            summary = page.title + " article has no summary, but you can read more at: " + page.fullurl;
        }

        const result = {
            title: page.title,
            link: page.fullurl,
            summary: summary
        };

        return result;
    } catch (error) {
        console.error("Error fetching Wikipedia data:", error);
        return {
            error: "Failed to fetch article data"
        };
    }
}
