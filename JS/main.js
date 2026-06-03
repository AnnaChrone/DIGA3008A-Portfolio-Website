const links = [
    {
        text: "Games",
        url: "./HTML/Games.html"
    },
    {
        text: "Engineering Projects",
        url: "./HTML/Engineering.html"
    },
    {
        text: "About Me",
        url: "./HTML/AboutMe.html"
    }
];

const container = document.getElementById("home-links");

const ul = document.createElement("ul");

links.forEach(link => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = link.text;
    a.href = link.url;

    li.appendChild(a);
    ul.appendChild(li);
});

container.appendChild(ul);