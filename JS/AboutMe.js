document.addEventListener("DOMContentLoaded", initAboutPage);

function initAboutPage()
{
    initScrollAnimations();
}

function initScrollAnimations()
{
    const observer = new IntersectionObserver((entries, obs) =>
    {
        entries.forEach(entry =>
        {
            if (entry.isIntersecting)
            {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    });

    // Animate scroll for headings, paragraphs, and lists
    const elements = document.querySelectorAll(`
        #about-content h1,
        #about-content h2,
        #about-content h3,
        #about-content p,
        #about-content ul,
        #about-content li
    `);

    elements.forEach(el =>
    {
        el.classList.add("fade-item");
        observer.observe(el);
    });

    images.forEach(img =>
    {
        img.classList.add("fade-item");
        observer.observe(img);
    });
}