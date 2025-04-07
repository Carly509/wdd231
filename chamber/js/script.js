
document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('header .container');
    if (!document.querySelector('.mobile-menu-btn')) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
        mobileMenuBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        header.insertBefore(mobileMenuBtn, document.querySelector('nav'));
    }


    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('open');
        this.classList.toggle('active');
    });


    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });


    if (currentPage === 'index.html' || currentPage === '') {
        document.body.classList.add('home');
    } else if (currentPage === 'membership.html') {
        document.body.classList.add('membership');
    } else if (currentPage === 'participate.html') {
        document.body.classList.add('participate');
    } else if (currentPage === 'opportunities.html') {
        document.body.classList.add('opportunities');
    }


    // const tierCards = document.querySelectorAll('.tier-card');

    // tierCards.forEach(card => {
    //     card.addEventListener('click', function() {

    //         tierCards.forEach(c => c.classList.remove('selected'));

    //         this.classList.add('selected');


    //         if (!document.querySelector('.selection-message')) {
    //             const tierName = this.querySelector('h3').textContent;
    //             const selectionMessage = document.createElement('div');
    //             selectionMessage.className = 'selection-message';
    //             selectionMessage.innerHTML = `
    //                 <p>You've selected the <strong>${tierName}</strong>. Click the button below to proceed with your registration.</p>
    //                 <a href="#" class="btn primary-btn continue-btn">Continue to Registration</a>
    //             `;
    //             document.querySelector('.tier-cards').insertAdjacentElement('afterend', selectionMessage);
    //         } else {

    //             const tierName = this.querySelector('h3').textContent;
    //             document.querySelector('.selection-message p').innerHTML = `
    //                 <p>You've selected the <strong>${tierName}</strong>. Click the button below to proceed with your registration.</p>
    //             `;
    //         }
    //     });
    // });

    const courses = [
        {
            code: "BUS101",
            name: "Introduction to Business",
            credits: 3,
            subject: "business",
            description: "Overview of business principles and practices.",
            completed: true
        },
        {
            code: "MKT201",
            name: "Marketing Fundamentals",
            credits: 3,
            subject: "marketing",
            description: "Basic concepts and strategies in marketing.",
            completed: false
        },
        {
            code: "FIN301",
            name: "Financial Management",
            credits: 4,
            subject: "finance",
            description: "Financial planning and management techniques.",
            completed: true
        },
        {
            code: "ENT202",
            name: "Entrepreneurship Basics",
            credits: 3,
            subject: "business",
            description: "Principles of starting and running a business.",
            completed: false
        },
        {
            code: "DIG101",
            name: "Digital Marketing",
            credits: 3,
            subject: "marketing",
            description: "Online marketing strategies and tools.",
            completed: false
        },
        {
            code: "ACC201",
            name: "Accounting Principles",
            credits: 4,
            subject: "finance",
            description: "Basic accounting concepts and practices.",
            completed: true
        }
    ];

    const courseListContainer = document.querySelector('.course-list');
    if (courseListContainer) {
        displayCourses(courses);
        setupFilters(courses);
    }

    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        const year = new Date().getFullYear();
        const lastModified = new Date(document.lastModified);
        const formattedDate = lastModified.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        footerBottom.innerHTML = `&copy; ${year} Chamber of Commerce. All rights reserved. <br>Last Updated: ${formattedDate}`;
    }
});

function displayCourses(courses, filter = 'all') {
    const courseListContainer = document.querySelector('.course-list');
    if (!courseListContainer) return;


    courseListContainer.innerHTML = '';


    const filteredCourses = filter === 'all' ?
        courses :
        courses.filter(course => course.subject === filter);

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <h3>${course.name}</h3>
            <div class="course-details">
                <p class="course-code">${course.code}</p>
                <p class="course-credits">${course.credits} Credits</p>
            </div>
            <p class="course-description">${course.description}</p>
            ${course.completed ? '<span class="course-completed">Completed</span>' : ''}
        `;
        courseListContainer.appendChild(courseCard);
    });


    updateCredits(filteredCourses);
}

function setupFilters(courses) {
    const filterButtons = document.querySelector('.filter-buttons');
    if (!filterButtons) return;


    const subjects = ['all', ...new Set(courses.map(course => course.subject))];

    subjects.forEach(subject => {
        const button = document.createElement('button');
        button.className = 'filter-btn' + (subject === 'all' ? ' active' : '');
        button.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
        button.setAttribute('data-filter', subject);

        button.addEventListener('click', function() {

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            displayCourses(courses, subject);
        });

        filterButtons.appendChild(button);
    });
}

function updateCredits(courses) {
    const creditsCounter = document.querySelector('.credits-count');
    if (!creditsCounter) return;

    const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
    creditsCounter.textContent = totalCredits;
}
