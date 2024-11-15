const apiKey = 'b3634558532140e5a39e8f12c1e63ca0';

function fetchNews(category = "general") {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayArticles(data.articles);
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            document.getElementById("newsContainer").innerHTML = "<p>Unable to fetch news at this time.</p>";
        });
}

function displayArticles(articles) {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = "";  

    if (articles.length === 0) {
        newsContainer.innerHTML = "<p>No articles found.</p>";
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.className = "news-item";
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}


fetchNews();

function filterNews(category) {
    fetchNews(category === "all" ? "general" : category);
}

function searchNews() {
    const query = document.getElementById("searchInput").value;
    if (!query) {
        fetchNews();  
        return;
    }

    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayArticles(data.articles);
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            document.getElementById("newsContainer").innerHTML = "<p>Unable to fetch news at this time.</p>";
        });
}
