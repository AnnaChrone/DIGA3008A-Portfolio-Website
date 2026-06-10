document.addEventListener("DOMContentLoaded", loadProject);

async function loadProject() {
    const container = document.getElementById("project-container");

    const params = new URLSearchParams(window.location.search);
    const projectFile = params.get("project");

    if (!projectFile) {
        console.error("No project file provided in URL");
        return;
    }

    try {
        const response = await fetch(`${BASE_PATH}/JSON Files/Engineering/${projectFile}`);
        const project = await response.json();

        renderProject(project, container);

    } catch (error) {
        console.error("Error loading project:", error);
    }
}

function renderProject(project, container) {
    container.innerHTML = "";

    //Project Title
    const header = document.createElement("section");
    header.classList.add("project-header");

    header.innerHTML = `
        <h1>${project.title}</h1>
        <p><strong>${project.year} (${project.duration}) | ${project.schoolYear} Project</strong></p>
        <p><strong>Project Type: ${project.type.join(", ")}</strong></p>
    `;

    container.appendChild(header);

    //Rendering each section of the project
    let i = 0;

    while (i < project.sections.length) {
        const section = project.sections[i];

        //Image grouping logic
        if (section.type === "image") {

            const images = [];

            while (
                i < project.sections.length &&
                project.sections[i].type === "image"
            ) {
                images.push(project.sections[i]);
                i++;
            }

            if (images.length === 1) {
                renderSingleImage(images[0], container);
            } else {
                renderImageGroup(images, container);
            }

            continue;
        }

        //Text sections
        if (
            section.type === "overview" ||
            section.type === "contribution" ||
            section.type === "technical"
        ) {
            const block = document.createElement("section");
            block.classList.add("project-text-block");

            block.innerHTML = `
                <h2>${section.heading}</h2>
                <p>${section.content}</p>
            `;

            container.appendChild(block);
        }

//If block type is download
        if (section.type === "download") {

    const downloadBlock = document.createElement("section");
    downloadBlock.classList.add("project-download-block");

    downloadBlock.innerHTML = `
        ${section.heading ? `<h2>${section.heading}</h2>` : ""}
            
        <a class="download-link" href="${BASE_PATH}/${section.file}" download>
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

            ${section.label}
        </a>
    `;

    container.appendChild(downloadBlock);
}

        i++;
    }
}

//Rendering for if there is only one image between text
function renderSingleImage(image, container) {
    const fig = document.createElement("figure");
    fig.classList.add("project-image-block");

    fig.innerHTML = `
        <img src="${BASE_PATH}/${image.src}" alt="${image.caption || ""}">
        ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ""}
    `;

    container.appendChild(fig);
}

//Rendering for if there are multiple images in a row
function renderImageGroup(images, container) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("project-image-group");

    images.forEach(img => {
        const fig = document.createElement("figure");

        fig.innerHTML = `
            <img src="${BASE_PATH}/${img.src}" alt="${img.caption || ""}">
            ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ""}
        `;

        wrapper.appendChild(fig);
    });

    container.appendChild(wrapper);
}