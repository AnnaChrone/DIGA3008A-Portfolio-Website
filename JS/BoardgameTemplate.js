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


function renderBoardGame(game)
{
    if (!game) return;

    // TITLE
    setText("game-title", game.title);

    // META
    setText(
        "game-meta",
        `
        <strong>
            ${game.year || ""}
            (${game.duration || ""})
            | ${game.projectYear || ""} Project
            <br>
            Theme: ${(game.themes || []).join(" | ")}
        </strong>
        `,
        true
    );

    // OVERVIEW (HTML allowed)
    setText("overview-text", game.overview, true);
    setImage("overview-image", game.overviewImage);

    // CONTRIBUTION
    setText("contribution-text", game.contribution, true);
    renderImageGroup(game.contributionImages, "contribution-images");

    // PROCESS
    setText("process-text", game.process, true);
    renderImageGroup(game.processImages, "process-images");

    // MEMBERS
    renderMembers(game.members);

    // LINKS
    renderLinks(game.gameLinks);

    // PLAY TITLE
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

        img.src = `${BASE_PATH}/${src}`;

        container.appendChild(img);
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

        a.href = link.url || "#";
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