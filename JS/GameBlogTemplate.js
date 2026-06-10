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
                `${BASE_PATH}/JSON Files/Games/GameBlogs/${blogFile}`
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
        `${BASE_PATH}/${blog.heroImage}`;

    renderBlogSections(blog.sections);

    const linksContainer =
        document.getElementById("download-links");

    linksContainer.innerHTML = "";

    if (blog.gameLinks)
    {
        blog.gameLinks.forEach(link =>
        {
            const a =
                document.createElement("a");

            // Prefix local links with BASE_PATH
            a.href =
                link.type === "external"
                    ? link.url
                    : `${BASE_PATH}/${link.url}`;

            a.classList.add("gameLink");

            if (link.type === "external")
            {
                a.target = "_blank";
                a.rel = "noopener noreferrer";
            }

            if (link.type === "download")
            {
                a.setAttribute("download", "");

                a.innerHTML = `
                    <svg class="download-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3v10m0 0l4-4m-4 4l-4-4"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M4 17v3h16v-3"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"/>
                    </svg>
                    ${link.label}
                `;
            }
            else
            {
                a.textContent =
                    link.label;
            }

            linksContainer.appendChild(a);
        });
    }

    document.getElementById("play-title")
        .textContent =
        `Play ${blog.gameTitle}`;
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
                        ${block.images.map(image =>
                            `<img src="${BASE_PATH}/${image}" alt="">`
                        ).join("")}
                    </div>
                `;
            }
        });

        article.innerHTML = html;

        container.appendChild(article);
    });
}