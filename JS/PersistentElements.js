const BASE_PATH =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
        ? ""
        : "/DIGA3008A-Portfolio-Website";

const THEMES = [
    "theme-green-light",
    "theme-green-dark",
    "theme-blue-light",
    "theme-blue-dark"
];

function getCurrentTheme() {
    return THEMES.find(t => document.body.classList.contains(t));
}

function getMode() {
    return localStorage.getItem("mode"); // "light" or "dark"
}

function setMode(mode) {
    localStorage.setItem("mode", mode);
    applyTheme();
}

function applyTheme() {
    const id = document.body.id;

    const isEngineering =
        id === "engineering-page-body" ||
        id === "indiv-engineering-page-body";

    const mode = getMode() || "light";

    const theme =
        isEngineering
            ? (mode === "dark" ? "theme-blue-dark" : "theme-blue-light")
            : (mode === "dark" ? "theme-green-dark" : "theme-green-light");

    document.body.classList.remove(...THEMES);
    document.body.classList.add(theme);
}

function createThemeToggle() {
    const wrapper = document.createElement("div");
    wrapper.className = "theme-toggle";

    const label = document.createElement("label");
    label.innerText = "🌙";

    const input = document.createElement("input");
    input.type = "checkbox";

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return { wrapper, input };
}

function initThemeToggle(input) {
    const mode = getMode() || "light";

    input.checked = mode === "dark";

    applyTheme();

    input.addEventListener("change", () => {
        setMode(input.checked ? "dark" : "light");
    });
}

const NavBarlinks = [
    { text: "Home", url: `${BASE_PATH}/index.html` },
    { text: "Games", url: `${BASE_PATH}/HTML/Games.html` },
    { text: "Engineering", url: `${BASE_PATH}/HTML/Engineering.html` },
    { text: "About", url: `${BASE_PATH}/HTML/AboutMe.html` }
];

const contactLinks = [
    {
        type: "email",
        text: "jnchronis1@gmail.com",
        url: "mailto:jnchronis1@gmail.com"
    },
    {
        type: "linkedin",
        url: "https://www.linkedin.com/in/joanna-chronis-04821b3b0/",
        icon: `${BASE_PATH}/Media/ContactLinkImages/LinkedInLogo.png`
    },
    {
        type: "discord",
        url: "https://discordapp.com/users/743488118811918386",
        icon: `${BASE_PATH}/Media/ContactLinkImages/DiscordLogo.png`
    },
    {
        type: "instagram",
        url: "https://instagram.com/joanna_chronis",
        icon: `${BASE_PATH}/Media/ContactLinkImages/InstaLogo.png`
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.getElementById("persistent-nav");

    if (navContainer) {
        const navUl = document.createElement("ul");

        NavBarlinks.forEach(navLink => {
            const navLi = document.createElement("li");
            const navA = document.createElement("a");

            navA.textContent = navLink.text;
            navA.href = navLink.url;

            navLi.appendChild(navA);
            navUl.appendChild(navLi);
        });

        const { wrapper, input } = createThemeToggle();
        const toggleLi = document.createElement("li");
        toggleLi.appendChild(wrapper);

        navUl.appendChild(toggleLi);
        navContainer.appendChild(navUl);

        initThemeToggle(input);
    }

    const contactContainer = document.getElementById("contact-me");

    if (contactContainer) {
        const contactTitle = document.createElement("h2");
        contactTitle.textContent = "Contact Me";

        const contactEmail = document.createElement("p");
        contactEmail.textContent = contactLinks[0].text;
        contactEmail.id = "email-address";

        const contactUl = document.createElement("ul");

        contactLinks.slice(1).forEach(link => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = link.url;
            a.target = "_blank";

            const img = document.createElement("img");
            img.src = link.icon;
            img.alt = link.type;

            a.appendChild(img);
            li.appendChild(a);
            contactUl.appendChild(li);
        });

        contactContainer.appendChild(contactTitle);
        contactContainer.appendChild(contactEmail);
        contactContainer.appendChild(contactUl);
    }
});