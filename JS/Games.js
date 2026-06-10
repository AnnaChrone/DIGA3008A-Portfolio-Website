const carouselState = {};

let data = null;

document.addEventListener("DOMContentLoaded", loadGames);


async function loadGames()
{
    try
    {
        const response =
            await fetch(`${BASE_PATH}/JSON Files/Games/games.json`);

        data = await response.json();
console.log("BASE_PATH:", BASE_PATH);
console.log("Response URL:", `${BASE_PATH}/JSON Files/Games/games.json`);
console.log("Loaded data:", data);
        createCarousel(
            "video-games",
            "video-left",
            "video-right",
            data.videoGames,
            "VideoGameTemplate.html"
        );

        createCarousel(
            "board-games",
            "board-left",
            "board-right",
            data.boardGames,
            "BoardGameTemplate.html"
        );

        createCarousel(
            "blogs",
            "blog-left",
            "blog-right",
            data.Blogs,
            "GameBlogTemplate.html"
        );
    }
    catch(error)
    {
        console.error("Failed to load game data:", error);
    }
}

function createCarousel(
    containerId,
    leftButtonId,
    rightButtonId,
    items,
    basePage
)
{
    carouselState[containerId] = 0;

    const container =
        document.getElementById(containerId);

    renderCarousel(
        items,
        container,
        carouselState[containerId],
        basePage
    );

    document
        .getElementById(rightButtonId)
        .addEventListener("click", () =>
    {
        carouselState[containerId]++;

        renderCarousel(
            items,
            container,
            carouselState[containerId],
            basePage
        );
    });

    document
        .getElementById(leftButtonId)
        .addEventListener("click", () =>
    {
        carouselState[containerId]--;

        if(carouselState[containerId] < 0)
        {
            carouselState[containerId] =
                items.length - 1;
        }

        renderCarousel(
            items,
            container,
            carouselState[containerId],
            basePage
        );
    });
}

function renderCarousel(
    items,
    container,
    startIndex,
    basePage
)
{
    container.innerHTML = "";

    if(!items || items.length === 0)
    {
        container.innerHTML =
            "<p>No games found.</p>";
        return;
    }

    let visibleCards;
/*Determines amount of cards visible at a time per carousel, depending on screensize */
if (window.innerWidth <= 600)
{
    visibleCards = 1; // Mobile
}
else if (window.innerWidth <= 1024)
{
    visibleCards = 2; // Tablet
}
else
{
    visibleCards = 3; // Desktop
}

visibleCards = Math.min(visibleCards, items.length);
    for(let i = 0; i < visibleCards; i++)
    {
        const index =
            (startIndex + i) % items.length;

        const item =
            items[index];

        const card =
            document.createElement("article");

        card.classList.add("game-card");

        card.innerHTML = `
    <img
        src='${BASE_PATH}/${item.thumbnail}'
        alt="${item.title}"
        class="game-thumbnail"
    >

    <h3 class="game-title">
        ${item.title}
    </h3>

    <div class="card-accordion">
        <p class="card-overview">
            ${item.overview || ""}
        </p>
    </div>
`;

        card.addEventListener("click", () =>
        {
            window.location.href =
                `${basePage}?game=${item.file}`;
        });

        container.appendChild(card);
    }
}

window.addEventListener("resize", () =>
{
    if (!data) return;

    renderCarousel(
        data.videoGames,
        document.getElementById("video-games"),
        carouselState["video-games"],
        "VideoGameTemplate.html"
    );

    renderCarousel(
        data.boardGames,
        document.getElementById("board-games"),
        carouselState["board-games"],
        "BoardGameTemplate.html"
    );

    renderCarousel(
        data.Blogs,
        document.getElementById("blogs"),
        carouselState["blogs"],
        "GameBlogTemplate.html"
    );
});