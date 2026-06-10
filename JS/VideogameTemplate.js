document.addEventListener("DOMContentLoaded", loadVideoGame);

async function loadVideoGame()

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
            `${BASE_PATH}/JSON Files/Games/VideoGames/${gameFile}`
        );

        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const game = await response.json();
        renderVideoGame(game);
    }
    catch (error)
    {
        console.error("Load error:", error);
    }
}


function setText(id, value)
{
    const el = document.getElementById(id);
    if (!el) return;

    el.textContent = value || "";
}

function setHTML(id, value)
{
    const el = document.getElementById(id);
    if (!el) return;

    el.innerHTML = value || "";
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


function renderVideoGame(game)
{
    if (!game) return;

    // TITLE
    setText("game-title", game.title);

    setHTML(
    "game-meta",
    `<strong>${game.year || ""} (${game.duration || ""}) | ${game.projectYear || ""} Project<br>
    Theme: ${(game.themes || []).join(" | ")}</strong>`
);

    setHTML("overview-text", game.overview);
    setImage("overview-image", game.overviewImage);

    setHTML("contribution-text", game.contribution);
    renderImageGroup(game.contributionImages, "contribution-images");

    setHTML("process-text", game.process);
    renderImageGroup(game.processImages, "process-images");

    // STRUCTURED DATA (NO HTML)
    renderSoftware(game.software);
    renderMembers(game.members);
    renderLinks(game.gameLinks);

    // FOOTER TITLE
    setText("play-title", `Play ${game.title}`);
}


function renderImageGroup(images, containerId)
{
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    if (!images || images.length === 0) return;

    images.forEach(src =>
    {
        const img = document.createElement("img");

        if (src)
        {
            img.src = `${BASE_PATH}/${src}`;
        }

        container.appendChild(img);
    });
}

function renderSoftware(software)
{
    const list = document.getElementById("software-used");
    if (!list) return;

    list.innerHTML = "";

    if (!software) return;

    software.forEach(item =>
    {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}


function renderMembers(members)
{
    const list = document.getElementById("group-members");
    if (!list) return;

    list.innerHTML = "";

    if (!members) return;

    members.forEach(member =>
    {
        const li = document.createElement("li");
        li.textContent = `${member.name}`;
        list.appendChild(li);
    });
}


function renderLinks(links)
{
    const container = document.getElementById("download-links");
    if (!container) return;

    container.innerHTML = "";

    if (!links) return;

    links.forEach(link =>
{
    const a = document.createElement("a");

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