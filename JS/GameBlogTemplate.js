document.addEventListener("DOMContentLoaded", loadBlog);

async function loadBlog()
{
    const params = new URLSearchParams(window.location.search);

    const blogFile = params.get("blog") || params.get("game");

    console.log("URL:", window.location.href);
    console.log("Params:", window.location.search);
    console.log("BLOG FILE:", blogFile);

    if (!blogFile) return;

    try
    {
        const response = await fetch(
            `${BASE_PATH}/JSON Files/Games/GameBlogs/${blogFile}`
        );

        const blog = await response.json();

        renderBlog(blog);
    }
    catch (error)
    {
        console.error(error);
    }
}


function createObserver()
{
    return new IntersectionObserver((entries, obs) =>
    {
        entries.forEach(entry =>
        {
            if (entry.isIntersecting)
            {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    });
}


function renderBlog(blog)
{
    const observer = createObserver();

    const titleEl = document.getElementById("blog-title");
    const dateEl = document.getElementById("publish-date");
    const heroEl = document.getElementById("hero-image");

    // TITLE
    titleEl.textContent = `${blog.gameTitle}: ${blog.blogTitle}`;
    titleEl.classList.add("fade-item");
    observer.observe(titleEl);

    // DATE
    dateEl.textContent = blog.publishDate;
    dateEl.classList.add("fade-item");
    observer.observe(dateEl);

    // HERO IMAGE
    heroEl.src = `${BASE_PATH}/${blog.heroImage}`;
    heroEl.classList.add("fade-item");
    observer.observe(heroEl);

    // SECTIONS
    renderBlogSections(blog.sections, observer);

    // LINKS
    renderLinks(blog.gameLinks, observer);

    // PLAY TITLE
    const playTitle = document.getElementById("play-title");
    playTitle.textContent = `Play ${blog.gameTitle}`;
    playTitle.classList.add("fade-item");
    observer.observe(playTitle);
}


function renderBlogSections(sections, observer)
{
    const container = document.getElementById("blog-content");
    container.innerHTML = "";

    sections.forEach(section =>
    {
        const article = document.createElement("article");
        article.classList.add("blog-section", "fade-item");

        let html = `<h2>${section.heading}</h2>`;

        section.content.forEach(block =>
        {
            if (block.type === "paragraph")
            {
                html += `<p>${block.text}</p>`;
            }

            if (block.type === "imagePair")
            {
                html += `
                    <div class="blog-image-pair">
                        ${block.images.map(img =>
                            `<img class="fade-item" src="${BASE_PATH}/${img}" alt="">`
                        ).join("")}
                    </div>
                `;
            }
        });

        article.innerHTML = html;

        container.appendChild(article);
        observer.observe(article);

        // IMPORTANT: observe images after render
        const imgs = article.querySelectorAll("img");
        imgs.forEach(img => observer.observe(img));
    });
}


function renderLinks(links, observer)
{
    const container = document.getElementById("download-links");

    container.innerHTML = "";

    if (!links) return;

    container.classList.add("fade-item");
    observer.observe(container);

    links.forEach(link =>
    {
        const a = document.createElement("a");
        a.classList.add("gameLink");

        const isExternal = link.type === "external";

        a.href = isExternal
            ? link.url
            : `${BASE_PATH}/${link.url}`;

        if (isExternal)
        {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
        }

        /*Includes an SVG of the download button if the link is a download */
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
            a.textContent = link.label;
        }

        container.appendChild(a);
    });
}