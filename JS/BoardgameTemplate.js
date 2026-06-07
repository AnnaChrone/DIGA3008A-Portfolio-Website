document.addEventListener("DOMContentLoaded", loadBoardGame);

async function loadBoardGame()
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
                `../JSON Files/Games/BoardGames/${gameFile}`
            );

        const game =
            await response.json();

        renderBoardGame(game);
    }
    catch(error)
    {
        console.error(error);
    }
}

function renderBoardGame(game)
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

    renderMembers(game.members);

    document.getElementById("rules-link")
        .href =
        game.rulesFile;

    document.getElementById("reflection-link")
        .href =
        game.reflectionFile;

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