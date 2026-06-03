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
    { text: "Home", url: "/index.html" },
    { text: "Games", url: "/HTML/Games.html" },
    { text: "Engineering", url: "/HTML/Engineering.html" },
    { text: "About", url: "/HTML/AboutMe.html" }
];

const navContainer = document.getElementById("persistent-nav");
const navUl = document.createElement("ul");

NavBarlinks.forEach(navLink => {
    const navLi = document.createElement("li");
    const navA = document.createElement("a");

    navA.textContent = navLink.text;
    navA.href = navLink.url;

    navLi.appendChild(navA);
    navUl.appendChild(navLi);
});

if (navContainer) {
    navContainer.appendChild(navUl);
}

const contactLinks = [
    {
        type: "email",
        text: "me@email.com",
        url: "mailto:me@email.com"
    },
    {
        type: "instagram",
        url: "https://instagram.com/joanna_chronis",
        icon: "./Media/InstaLogo.png"
    },
    {
        type: "linkedin",
        url: "https://www.linkedin.com/in/joanna-chronis-04821b3b0/",
        icon: "./Media/LinkedInLogo.png"
    },
    {
        type: "discord",
        url: "https://discordapp.com/users/743488118811918386",
        icon: "./Media/DiscordLogo.png"
    }
];

const contactContainer = document.getElementById("contact-me");

const contactTitle = document.createElement("h2");
contactTitle.textContent = "Contact Me";

const contactEmail = document.createElement("p");
contactEmail.textContent = contactLinks[0].text;

const contactUl = document.createElement("ul");

// skip first item as it is not a link
contactLinks.slice(1).forEach(link => {
    const contactLi = document.createElement("li");
    const contactA = document.createElement("a");

    contactA.href = link.url;
    contactA.target = "_blank";

    const img = document.createElement("img");
    img.src = link.icon;
    img.alt = link.type;

    contactA.appendChild(img);
    contactLi.appendChild(contactA);
    contactUl.appendChild(contactLi);
});

contactContainer.appendChild(contactTitle);
contactContainer.appendChild(contactEmail);
contactContainer.appendChild(contactUl);