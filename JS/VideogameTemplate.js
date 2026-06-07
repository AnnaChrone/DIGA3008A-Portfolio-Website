document.addEventListener("DOMContentLoaded", loadVideoGame);

async function loadVideoGame()
{
    const params =
        new URLSearchParams(window.location.search);

    const gameFile =
        params.get("game");

    if(!gameFile) return;

    try
    {
        const response =
            await fetch(
                `../JSON Files/Games/VideoGames/${gameFile}`
            );

        const game =
            await response.json();

        renderVideoGame(game);
    }
    catch(error)
    {
        console.error(error);
    }
}

function renderVideoGame(game)
{
    document.getElementById("game-title")
        .textContent =
        game.title;

    document.getElementById("game-meta")
        .innerHTML =
        `
            <strong>${game.year}
            (${game.duration})
            |
            ${game.projectYear} Project
            <br>
            Theme:
            ${game.themes.join(" | ")}</strong>
        `;

    document.getElementById("overview-text")
        .textContent =
        game.overview;

    document.getElementById("overview-image")
        .src =
        game.overviewImage;

    document.getElementById("contribution-text")
        .textContent =
        game.contribution;

    renderImagePair(
        game.contributionImages,
        "contribution-images"
    );

    document.getElementById("process-text")
        .textContent =
        game.process;

    renderImagePair(
        game.processImages,
        "process-images"
    );

    renderSoftware(game.software);

    renderMembers(game.members);

    const linksContainer =
    document.getElementById("download-links");

linksContainer.innerHTML = "";

game.gameLinks.forEach(link =>
{
    const a =
        document.createElement("a");

    a.href =
        link.url;

    a.classList.add("gameLink");

    if(link.type === "external")
    {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    }

    if(link.type === "download")
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

    document.getElementById("play-title")
        .textContent =
        game.title;
}


function renderImagePair(images, containerId)
{
    const container =
        document.getElementById(containerId);

    container.innerHTML = "";

    images.forEach(image =>
    {
        const img =
            document.createElement("img");

        img.src = image;

        container.appendChild(img);
    });
}

function renderMembers(members)
{
    const list =
        document.getElementById("group-members");

    list.innerHTML = "";

    members.forEach(member =>
    {
        const li =
            document.createElement("li");

        li.textContent =
            `${member.name} (${member.role})`;

        list.appendChild(li);
    });
}

function renderSoftware(software)
{
    const list =
        document.getElementById("software-used");

    list.innerHTML = "";

    software.forEach(item =>
    {
        const li =
            document.createElement("li");

        li.textContent = item;

        list.appendChild(li);
    });
}