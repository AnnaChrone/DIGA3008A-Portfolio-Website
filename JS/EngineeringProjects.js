// Populating the cards on the overall engineering page
document.addEventListener("DOMContentLoaded", loadProjects);

async function loadProjects() {
    const container = document.getElementById("projects-container");

    try {
        const response = await fetch(`${BASE_PATH}/JSON Files/Engineering/projects.json`);
        const projects = await response.json();

        // Create IntersectionObserver for scroll animation
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target); // animate only once
                }
            });
        }, {
            threshold: 0.15
        });

        projects.forEach(project => {
            const card = document.createElement("article");
            card.classList.add("project-card");

            card.innerHTML = `
                <img 
                    class="project-thumbnail" 
                    src="${BASE_PATH}/${project.thumbnail}"
                    alt="${project.title}"
                >
                <div class="project-title">
                    ${project.title}
                </div>
            `;

            card.addEventListener("click", () => {
                window.location.href =
                    `EngineeringProjectTemplate.html?project=${project.jsonFile}`;
            });

            container.appendChild(card);

            // Start observing after it's added to DOM
            observer.observe(card);
        });

    } catch (error) {
        console.error("Error loading projects:", error);
    }
}