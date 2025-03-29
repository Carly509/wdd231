// Course data array
const courses = [
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 3,
        completed: true
    },
    {
        code: "WDD 230",
        name: "Web Frontend Development",
        credits: 3,
        completed: false
    },
    {
        code: "CSE 110",
        name: "Programming Fundamentals",
        credits: 3,
        completed: true
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 3,
        completed: false
    },
    {
        code: "WDD 330",
        name: "Web Frontend Development II",
        credits: 3,
        completed: false
    }
];

// Function to display courses
function displayCourses(courseList) {
    const container = document.getElementById('course-container');
    const totalCreditsElement = document.getElementById('total-credits');

    // Clear previous courses
    container.innerHTML = '';

    // Display courses
    courseList.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        // Add completed class if course is completed
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseCard.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
        `;

        container.appendChild(courseCard);
    });

    // Calculate and display total credits
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}

// Filter event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial display of all courses
    displayCourses(courses);

    // All Courses Button
    document.getElementById('all-courses')?.addEventListener('click', () => {
        displayCourses(courses);
    });

    // WDD Courses Button
    document.getElementById('wdd-courses')?.addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.code.startsWith('WDD'));
        displayCourses(wddCourses);
    });

    // CSE Courses Button
    document.getElementById('cse-courses')?.addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.code.startsWith('CSE'));
        displayCourses(cseCourses);
    });
});
