const contentDiv = document.querySelector('.content');
const loader = document.getElementById('loader');
const resetBtn = document.getElementById("resetBtn");

let page = 1;
const limit = 5;
let isLoading = false;

const fetchData = async () => {
    if (isLoading) return;

    isLoading = true;
    loader.style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            data.forEach(post => {
                const item = document.createElement('div');
                item.classList.add('item');
                item.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                contentDiv.appendChild(item);
            });

            page++;
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            isLoading = false;
            loader.style.display = 'none';
        }
    }, 3000);
};

function onScroll() {
    if (isLoading) return; 

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        //loader.style.display = 'block'; 
        fetchData();
    }
}

function resetContent() {
    contentDiv.innerHTML = "";
    page = 1;
    fetchData();
}

resetBtn.addEventListener("click", resetContent);
window.addEventListener("scroll", onScroll);
fetchData();
