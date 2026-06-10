// HOME LINKS
const Homelinks = [
    { text: "Games", url: "./HTML/Games.html", image: "./Media/games.png" },
    { text: "Engineering Projects", url: "./HTML/Engineering.html", image: "./Media/engineering.png" },
    { text: "About Me", url: "./HTML/AboutMe.html", image: "./Media/me.jpg" }
];

const homeContainer = document.getElementById("home-links");
const homeUl = document.createElement("ul");
const previewImage = document.getElementById("preview-image");

Homelinks.forEach(homeLink => {
    const homeLi = document.createElement("li");
    const homeA = document.createElement("a");

    homeA.textContent = homeLink.text;
    homeA.href = homeLink.url;

const defaultImage = "./Media/pixel-art-style-floral-garden-illustration.jpg";

//when link is hovered on, the preview image will change and fade in
homeA.addEventListener("mouseenter", () => {
    previewImage.style.opacity = 0;

    setTimeout(() => {
        previewImage.src = `${BASE_PATH}/homeLink.image`;
        previewImage.style.opacity = 1;
    }, 150);
});

homeA.addEventListener("mouseleave", () => {
    previewImage.style.opacity = 0;

    setTimeout(() => {
        previewImage.src = defaultImage;
        previewImage.style.opacity = 1;
    }, 150);
});

    homeLi.appendChild(homeA);
    homeUl.appendChild(homeLi);
});

if (homeContainer) {
    homeContainer.appendChild(homeUl);
}
