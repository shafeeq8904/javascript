const main = document.getElementsByTagName("main")[0];

async function loadContent() {
    const hashlocation = window.location.hash.slice(1) || "home";
    console.log(hashlocation)
    const displayPage = `${hashlocation}.html`;

    try {
        const response = await fetch(displayPage);
        console.log(response)

        if (!response.ok) {
            throw new Error(`Failed to fetch ${displayPage}`);
        }

        const htmlContent = await response.text();
        document.title = hashlocation.charAt(0).toUpperCase() + hashlocation.slice(1);
        main.innerHTML = htmlContent;
    } 
    
    catch (error) {
        console.error("Error loading displayPage:", error);
        document.title = "Error";
        content.innerHTML = `
            <h1>404 - Page Not Found</h1>
            <p>Oops! The Page you're looking for doesn't exist.</p>
            <a href="#home">Go to Home</a>
        `;
    }
}

window.addEventListener("hashchange", loadContent);
window.addEventListener("DOMContentLoaded", loadContent);
