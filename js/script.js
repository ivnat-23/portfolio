document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /**
   * ---- PROJECT DATA ----
   * Centralized data for all your projects.
   * Add your projects here.
   */
  const projectsData = [
    {
      title: "E-Commerce Website",
      category: "Web",
      image: "images/project1.jpg",
      description: "A full-featured e-commerce platform built with HTML, CSS, and JavaScript for the frontend, and PHP for the backend. Includes product listings, a shopping cart, and a user authentication system.",
      tags: ["HTML5", "CSS3", "JavaScript", "PHP"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      category: "App",
      image: "images/project2.jpg",
      description: "A native Android application developed with Java for managing daily tasks. Features include creating, editing, and deleting tasks, setting due dates, and priority levels.",
      tags: ["Java", "Android Studio", "XML"],
      liveUrl: "#", // Link to Google Play or a demo video
      githubUrl: "#",
    },
    {
      title: "Real-time Chat App",
      category: "Other",
      image: "images/project3.jpg",
      description: "A web-based chat application using Firebase for real-time database and authentication. Allows users to sign in and chat in public rooms instantly.",
      tags: ["Firebase", "JavaScript", "Bootstrap"],
      liveUrl: "#",
      githubUrl: "#",
    },
    // Add more projects as needed
  ];

  /**
   * Theme (Dark/Light Mode) Toggler
   */
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  htmlEl.setAttribute('data-bs-theme', savedTheme);
  sunIcon.classList.toggle('d-none', savedTheme === 'dark');
  moonIcon.classList.toggle('d-none', savedTheme === 'light');

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    sunIcon.classList.toggle('d-none');
    moonIcon.classList.toggle('d-none');
  });

  /**
   * Hero Section Typing Effect (Typed.js)
   */
  if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
      strings: ["Software Developer", "Web Developer", "App Creator", "Problem Solver"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  }

  /**
   * Hero Section Particle Effect (tsParticles)
   */
  if (document.getElementById('particles-js')) {
    tsParticles.load("particles-js", {
        background: { color: { value: "#111827" } },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
            },
        },
        particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
    });
  }

  /**
   * Animate on Scroll (AOS) Initialization
   */
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  /**
   * Back to Top Button
   */
  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });

  /**
   * Active Navbar Link on Scroll
   */
  const navLinks = document.querySelectorAll('#navbarNav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(section => observer.observe(section));


  /**
   * Dynamically Populate Projects
   */
  const projectGrid = document.getElementById('project-grid');
  if (projectGrid) {
    projectsData.forEach((project, index) => {
      const projectCard = `
        <div class="col-md-6 col-lg-4 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="project-card w-100" data-bs-toggle="modal" data-bs-target="#projectModal" data-project-index="${index}">
            <img src="${project.image}" class="card-img-top" alt="${project.title}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title mt-auto">${project.title}</h5>
              <div class="d-flex flex-wrap gap-2 mt-2">
                ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      projectGrid.innerHTML += projectCard;
    });
  }

  /**
   * Project Modal Population
   */
  const projectModal = document.getElementById('projectModal');
  projectModal.addEventListener('show.bs.modal', (event) => {
    const card = event.relatedTarget.closest('.project-card');
    const projectIndex = card.getAttribute('data-project-index');
    const project = projectsData[projectIndex];

    projectModal.querySelector('#projectModalLabel').textContent = project.title;
    projectModal.querySelector('#projectModalImg').src = project.image;
    projectModal.querySelector('#projectModalDesc').textContent = project.description;
    projectModal.querySelector('#projectModalGit').href = project.githubUrl;
    projectModal.querySelector('#projectModalLive').href = project.liveUrl;

    const tagsContainer = projectModal.querySelector('#projectModalTags');
    tagsContainer.innerHTML = project.tags.map(tag => `<span class="badge text-bg-secondary me-2">${tag}</span>`).join('');
  });


  /**
   * Contact Form Submission (Formspree)
   */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    formStatus.innerHTML = 'Sending...';
    formStatus.style.color = 'gray';

    try {
      const response = await fetch(event.target.action, {
        method: contactForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.innerHTML = "Thanks for your submission!";
        formStatus.style.color = 'green';
        contactForm.reset();
      } else {
        const responseData = await response.json();
        if (Object.hasOwn(responseData, 'errors')) {
          formStatus.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
        } else {
          formStatus.innerHTML = "Oops! There was a problem submitting your form";
        }
        formStatus.style.color = 'red';
      }
    } catch (error) {
      formStatus.innerHTML = "Oops! There was a problem submitting your form";
      formStatus.style.color = 'red';
    }
  }
  contactForm.addEventListener("submit", handleSubmit);

});