document.addEventListener("DOMContentLoaded", loadBoardGame);

async function loadBoardGame()
{
    const params = new URLSearchParams(window.location.search);
    const gameFile = params.get("game");

    if (!gameFile)
    {
        console.warn("No game file provided in URL.");
        return;
    }

    try
    {
        const response = await fetch(
            `${BASE_PATH}/JSON Files/Games/BoardGames/${gameFile}`
        );

        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const game = await response.json();
        renderBoardGame(game);
    }
    catch (error)
    {
        console.error("Load error:", error);
    }
}

/* 
   OBSERVER (scroll animation)
 */

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


function renderBoardGame(game)
{
    if (!game) return;

    const observer = createObserver();

    // TITLE
    const titleEl = document.getElementById("game-title");
    setText("game-title", game.title);

    if (titleEl)
    {
        titleEl.classList.add("fade-item");
        observer.observe(titleEl);
    }

    // META
    const metaEl = document.getElementById("game-meta");
    if (metaEl)
    {
        metaEl.innerHTML = `
        <strong>
            ${game.year || ""}
            (${game.duration || ""})
            | ${game.projectYear || ""} Project
            <br>
            Theme: ${(game.themes || []).join(" | ")}
        </strong>
        `;

        metaEl.classList.add("fade-item");
        observer.observe(metaEl);
    }

    // OVERVIEW
    setText("overview-text", game.overview, true);
    setImage("overview-image", game.overviewImage);

    observeIfExists(observer, "overview-text");
    observeIfExists(observer, "overview-image");

    // CONTRIBUTION
    setText("contribution-text", game.contribution, true);
    observeIfExists(observer, "contribution-text");

    renderImageGroup(
        game.contributionImages,
        "contribution-images",
        observer
    );

    // PROCESS
    setText("process-text", game.process, true);
    observeIfExists(observer, "process-text");

    renderImageGroup(
        game.processImages,
        "process-images",
        observer
    );

    // MEMBERS
    renderMembers(game.members, observer);

    // LINKS
    renderLinks(game.gameLinks, observer);

    // PLAY TITLE
    setText("play-title", `Play ${game.title}`);
    observeIfExists(observer, "play-title");
}


function setText(id, value, allowHTML = false)
{
    const el = document.getElementById(id);
    if (!el) return;

    if (allowHTML)
        el.innerHTML = value || "";
    else
        el.textContent = value || "";
}

function setImage(id, src)
{
    const el = document.getElementById(id);
    if (!el) return;

    if (!src)
    {
        el.src = "";
        return;
    }

    el.src = `${BASE_PATH}/${src}`;
}

function observeIfExists(observer, id)
{
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.add("fade-item");
    observer.observe(el);
}



function renderImageGroup(images, containerId, observer)
{
    const container = document.getElementById(containerId);
    if (!container || !images) return;

    container.innerHTML = "";

    images.forEach(src =>
    {
        const img = document.createElement("img");
        img.src = `${BASE_PATH}/${src}`;
        img.classList.add("fade-item");

        container.appendChild(img);
        observer.observe(img);
    });

    container.classList.add("fade-item");
    observer.observe(container);
}


function renderMembers(members, observer)
{
    const list = document.getElementById("group-members");
    if (!list) return;

    list.innerHTML = "";

    if (!members) return;

    list.classList.add("fade-item");
    observer.observe(list);

    members.forEach(member =>
    {
        const li = document.createElement("li");
        li.textContent = member.name;
        list.appendChild(li);
    });
}


function renderLinks(links, observer)
{
    const container = document.getElementById("download-links");
    if (!container) return;

    container.innerHTML = "";

    if (!links) return;

    container.classList.add("fade-item");
    observer.observe(container);

    links.forEach(link =>
    {
        const a = document.createElement("a");
        a.classList.add("gameLink");

        const isExternal = link.type === "external";
        const isDownload = link.type === "download";

        const cleanUrl = (link.url || "")
            .trim()
            .replace(/^\/+/, "");

        if (isExternal)
        {
            a.href = link.url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
        }
        else
        {
            a.href = `${BASE_PATH}/${cleanUrl}`;
        }

        if (isDownload)
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
                <span>${link.label || "Download"}</span>
            `;
        }
        else
        {
            a.textContent = link.label || "Link";
        }

        container.appendChild(a);
    });
}