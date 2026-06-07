document.addEventListener("DOMContentLoaded", loadBlog);

async function loadBlog()
{
    const params = new URLSearchParams(window.location.search);

const blogFile = params.get("blog") || params.get("game");
console.log("URL:", window.location.href);
console.log("Params:", window.location.search);
console.log("BLOG FILE:", blogFile);
    if(!blogFile) return;

    try
    {
        const response =
            await fetch(
                `../JSON Files/Games/GameBlogs/${blogFile}`
            );

        const blog =
            await response.json();
    console.log("BLOG FILE:", blogFile);
        renderBlog(blog);
    }
    catch(error)
    {
        console.error(error);
    }
}

function renderBlog(blog)
{
    document.getElementById("blog-title")
        .textContent =
        `${blog.gameTitle}: ${blog.blogTitle}`;

    document.getElementById("publish-date")
        .textContent =
        blog.publishDate;

    document.getElementById("hero-image")
        .src =
        blog.heroImage;

    document.getElementById("background-text")
        .textContent =
        blog.background;

    renderBlogSections(blog.sections);

    document.getElementById("game-link")
        .href =
        blog.gameLink;
}

function renderBlogSections(sections)
{
    const container =
        document.getElementById("blog-content");

    container.innerHTML = "";

    sections.forEach(section =>
    {
        const article =
            document.createElement("article");

        article.classList.add(
            "blog-section"
        );

        let html =
            `<h2>${section.heading}</h2>`;

        section.content.forEach(block =>
        {
            if(block.type === "paragraph")
            {
                html +=
                    `<p>${block.text}</p>`;
            }

            if(block.type === "imagePair")
            {
                html += `
                    <div class="blog-image-pair">
                        <img src="${block.images[0]}">
                        <img src="${block.images[1]}">
                    </div>
                `;
            }
        });

        article.innerHTML = html;

        container.appendChild(article);
    });
}