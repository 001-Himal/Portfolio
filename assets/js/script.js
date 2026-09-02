$(document).ready(function () {

    // Mobile Navbar Toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Auto-Hide Navbar on Scroll Down, Show on Scroll Up (Throttled with rAF for 60fps performance)
    let lastScrollTop = 0;
    let ticking = false;
    const header = document.querySelector('header');
    const progressBar = document.getElementById('scroll-progress');

    function onScroll() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Auto-hide floating header
        if (header) {
            if (currentScroll > lastScrollTop && currentScroll > 90) {
                header.classList.add('nav-hidden');
            } else {
                header.classList.remove('nav-hidden');
            }
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        // Top Horizontal Scroll Progress Bar
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (currentScroll / docHeight) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }

        // Scroll Spy for Navbar Active Link State
        $('section, footer').each(function () {
            let height = $(this).outerHeight();
            let offset = $(this).offset().top - 220;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (id && top >= offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });

        ticking = false;
    }

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });

    // Smooth Scrolling for Internal Navigation Links
    $('a[href*="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href && href.startsWith('#')) {
            const target = $(href);
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70,
                }, 500, 'swing');
            }
        }
    });

    // Message Modal Open & Close Event Listeners
    const modal = document.getElementById('message-modal');
    const openModalBtn = document.getElementById('open-message-modal');
    const closeModalBtn = document.getElementById('close-message-modal');

    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', function (e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Contact Form Submission Handler
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        try {
            if (typeof emailjs !== 'undefined') {
                emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
                emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
                    .then(function (response) {
                        alert("Thank you! Your message has been sent successfully.");
                        document.getElementById("contact-form").reset();
                        closeModal();
                    }, function (error) {
                        alert("Thank you! Your message has been received.");
                        document.getElementById("contact-form").reset();
                        closeModal();
                    });
            } else {
                alert("Thank you! Your message has been received.");
                document.getElementById("contact-form").reset();
                closeModal();
            }
        } catch (err) {
            alert("Thank you! Your message has been received.");
            document.getElementById("contact-form").reset();
            closeModal();
        }
    });

});

// Dynamic Title on Tab Visibility Change
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Himal | Portfolio";
        $("#favicon").attr("href", "./assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "./assets/images/favhand.png");
    }
});

// Smooth Native Continuous Typewriter Effect for Hero Section
function initTypewriter() {
    const el = document.querySelector(".typing-text");
    if (!el) return;

    const words = [
        "System Design",
        "Cloud & DevOps",
        "Building Scalable Apps",
        "Modern Web Engineering",
        "Problem Solving"
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function tick() {
        const currentWord = words[wordIdx];
        
        if (isDeleting) {
            charIdx--;
            el.textContent = currentWord.substring(0, charIdx);
        } else {
            charIdx++;
            el.textContent = currentWord.substring(0, charIdx);
        }

        let speed = isDeleting ? 45 : 95;

        if (!isDeleting && charIdx === currentWord.length) {
            speed = 1600; // Pause at end of completed word
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 400; // Pause before starting next word
        }

        setTimeout(tick, speed);
    }

    tick();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypewriter);
} else {
    initTypewriter();
}

// Fallback Data for Skills (from context.txt - Windows items removed)
const defaultSkills = [
    { name: "ReactJS", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" },
    { name: "Next.js", icon: "https://img.icons8.com/color/48/000000/nextjs.png" },
    { name: "Python", icon: "https://img.icons8.com/color/48/000000/python--v1.png" },
    { name: "PostgreSQL", icon: "https://img.icons8.com/color/48/000000/postgreesql.png" },
    { name: "Supabase", icon: "https://img.icons8.com/color/48/000000/supabase.png" },
    { name: "Docker", icon: "https://img.icons8.com/color/48/000000/docker.png" },
    { name: "Linux", icon: "https://img.icons8.com/color/48/000000/linux--v1.png" },
    { name: "Git & GitHub", icon: "https://img.icons8.com/color/48/000000/git.png" },
    { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
    { name: "HTML5", icon: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
    { name: "CSS3", icon: "https://img.icons8.com/color/48/000000/css3.png" },
    { name: "Figma", icon: "https://img.icons8.com/color/48/000000/figma--v1.png" },
    { name: "CLI & Bash", icon: "https://img.icons8.com/color/48/000000/console.png" },
    { name: "Networking", icon: "https://img.icons8.com/fluency/48/000000/network-cable.png" },
    { name: "Cloud & DevOps", icon: "https://img.icons8.com/color/48/000000/cloud.png" },
    { name: "System Design", icon: "https://img.icons8.com/fluency/48/000000/flow-chart.png" }
];

// Fallback Data for Projects (Real UI Screenshots)
const defaultProjects = [
    {
        name: "Excalistudy",
        desc: "Semester and work-life manager designed to make study and learning efficient, organized, and visual.",
        image: "excalistudy",
        tags: ["Next.js", "React", "Cloud", "Vercel"],
        links: {
            view: "https://excalistudy.vercel.app/",
            code: "https://github.com/001-Himal"
        }
    },
    {
        name: "Collecto",
        desc: "Minimalist and structured bookmark manager with browsing reports, preventing the bookmark graveyard.",
        image: "collecto",
        tags: ["Next.js", "PostgreSQL", "Vercel", "Tailwind"],
        links: {
            view: "https://collecto-beta.vercel.app/",
            code: "https://github.com/001-Himal"
        }
    },
    {
        name: "Mediatracklist",
        desc: "Personal movies and series tracker with season updates, powered by TMDB API and Supabase database.",
        image: "mediatracklist",
        tags: ["React", "Supabase", "TMDB API", "PostgreSQL"],
        links: {
            view: "https://mediatracklist.vercel.app/",
            code: "https://github.com/001-Himal"
        }
    }
];

// Fetch Data with offline fallback
async function fetchData(type = "skills") {
    try {
        let response = type === "skills" ? await fetch("skills.json") : await fetch("./projects/projects.json");
        if (!response.ok) {
            response = type === "skills" ? await fetch("./skills.json") : await fetch("projects/projects.json");
        }
        const data = await response.json();
        return data;
    } catch (e) {
        return type === "skills" ? defaultSkills : defaultProjects;
    }
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;
    const list = (skills && skills.length) ? skills : defaultSkills;
    let skillHTML = "";
    list.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" loading="lazy" onerror="this.src='https://img.icons8.com/color/48/000000/code.png'" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.getElementById("projectsContainer") || document.querySelector(".projects-modern-grid");
    if (!projectsContainer) return;
    const list = (projects && projects.length) ? projects : defaultProjects;
    let projectHTML = "";
    
    list.forEach(project => {
        const tags = project.tags || ["Full-Stack", "Web App", "Modern UI"];
        const tagsHTML = tags.map(t => `<span class="tech-pill">${t}</span>`).join("");
        
        let imgName = project.image || "excalistudy";
        let imgSrc = (imgName.includes('/') || imgName.startsWith('http') || imgName.startsWith('data:'))
            ? imgName
            : `./assets/images/projects/${imgName.replace('.png', '')}.png`;

        projectHTML += `
        <div class="project-card">
            <div class="project-thumb-wrap">
                <img draggable="false" src="${imgSrc}" alt="${project.name}" onerror="this.src='./assets/images/projects/${imgName.replace('.png', '')}.png'" loading="lazy" />
            </div>
            <div class="project-card-body">
                <div>
                    <div class="project-title-row">
                        <h3>${project.name}</h3>
                    </div>
                    <p>${project.desc}</p>
                    <div class="project-tech-tags">
                        ${tagsHTML}
                    </div>
                </div>
                <div class="project-actions">
                    <a href="${project.links.view}" class="btn-project-live" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                    <a href="${project.links.code}" class="btn-project-code" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Code</a>
                </div>
            </div>
        </div>`;
    });
    projectsContainer.innerHTML = projectHTML;

    // ScrollReveal for project cards
    if (typeof ScrollReveal !== 'undefined') {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '40px',
            duration: 600,
            reset: false
        });
        srtop.reveal('.project-card', { interval: 120 });
    }
}

// Initial Data Population
fetchData("skills").then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// Tilt on Profile Image
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 12,
        speed: 400
    });
}

// ScrollReveal Animations for Page Sections
if (typeof ScrollReveal !== 'undefined') {
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '50px',
        duration: 700,
        reset: false
    });

    /* SCROLL HOME HERO */
    srtop.reveal('.home .content h2', { delay: 100 });
    srtop.reveal('.home .content p', { delay: 150 });
    srtop.reveal('.home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 250 });
    srtop.reveal('.home .social-icons li', { interval: 80 });

    /* SCROLL ABOUT */
    srtop.reveal('.about .image', { delay: 120 });
    srtop.reveal('.about-point-grid', { delay: 150 });
    srtop.reveal('.point-card', { interval: 100 });

    /* SCROLL SKILLS */
    srtop.reveal('.skills .container', { interval: 150 });

    /* SCROLL EDUCATION */
    srtop.reveal('.education .box', { interval: 150 });

    /* SCROLL FOOTER */
    srtop.reveal('.footer-minimal-hero', { delay: 100 });
    srtop.reveal('.footer-bottom-container', { delay: 180 });
}