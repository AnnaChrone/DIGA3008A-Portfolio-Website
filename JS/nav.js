// HOME LINKS
const Homelinks = [
    { text: "Games", url: "./HTML/Games.html" },
    { text: "Engineering Projects", url: "./HTML/Engineering.html" },
    { text: "About Me", url: "./HTML/AboutMe.html" }
];

const homeContainer = document.getElementById("home-links");
const homeUl = document.createElement("ul");

Homelinks.forEach(homeLink => {
    const homeLi = document.createElement("li");
    const homeA = document.createElement("a");

    homeA.textContent = homeLink.text;
    homeA.href = homeLink.url;

    homeLi.appendChild(homeA);
    homeUl.appendChild(homeLi);
});

if (homeContainer) {
    homeContainer.appendChild(homeUl);
}

// PERSISTENT NAV
const NavBarlinks = [
    { text: "Home", url: "./index.html" },
    { text: "Games", url: "./HTML/Games.html" },
    { text: "Engineering", url: "./HTML/Engineering.html" },
    { text: "About", url: "./HTML/AboutMe.html" }
];

const navContainer = document.getElementById("persistent-nav");
const navUl = document.createElement("ul");

NavBarlinks.forEach(navLink => {
    const navLi = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = navLink.text;
    a.href = navLink.url;

    navLi.appendChild(a);
    navUl.appendChild(navLi);
});

if (navContainer) {
    navContainer.appendChild(navUl);
}