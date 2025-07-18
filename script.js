// script.js

document.addEventListener('DOMContentLoaded', () => {
    const LOCAL_STORAGE_KEY = 'mallaProgress'; // Key to save to localStorage
    const THEME_STORAGE_KEY = 'mallaTheme'; // Key for theme preference

    let allCourses; // This variable will contain the data, either loaded or initial

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const semestersContainer = document.getElementById('semestersContainer');
    const recommendedCoursesDiv = document.getElementById('recommendedCourses');
    const refreshRecommendationsBtn = document.getElementById('refreshRecommendations');
    const averageGradeText = document.getElementById('averageGradeText');
    const themeToggle = document.querySelector('.theme-toggle');

    // Modal elements
    const courseModal = document.getElementById('courseModal');
    const closeModalButtons = document.querySelectorAll('.modal-button.close, .close-button');
    const modalCourseName = document.getElementById('modalCourseName');
    const modalCourseSemester = document.getElementById('modalCourseSemester');
    const modalCourseArea = document.getElementById('modalCourseArea');
    const modalCourseDescription = document.getElementById('modalCourseDescription');
    const modalCoursePrerequisites = document.getElementById('modalCoursePrerequisites');
    const markAsApprovedBtn = document.getElementById('markAsApprovedBtn');

    // Object to store course divs for each semester
    const semesterCoursesContainers = {};
    for (let i = 1; i <= 10; i++) {
        const semesterDiv = document.createElement('div');
        semesterDiv.classList.add('semester');
        semesterDiv.innerHTML = `<h3>Semestre ${i}</h3>`;
        semestersContainer.appendChild(semesterDiv);

        const coursesDiv = document.createElement('div');
        coursesDiv.classList.add('courses-container');
        semesterDiv.appendChild(coursesDiv);
        semesterCoursesContainers[i] = coursesDiv; // Map semester to its course container
    }

    // --- Save and Load Functions ---
    function saveProgress() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allCourses));
    }

    function loadProgress() {
        const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedProgress) {
            allCourses = JSON.parse(savedProgress);
        } else {
            // If no saved progress, use initial data from data.js
            allCourses = coursesData.map(course => ({ ...course })); // Deep copy to avoid modifying original
        }
    }
    // --- End Save and Load Functions ---

    // --- Dark/Light Mode Functions ---
    function loadTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            themeToggle.setAttribute('aria-checked', savedTheme === 'dark-mode');
        } else {
            // Default to light mode if no preference
            document.body.classList.add('light-mode');
            themeToggle.setAttribute('aria-checked', false);
        }
    }

    function toggleTheme() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem(THEME_STORAGE_KEY, 'light-mode');
            themeToggle.setAttribute('aria-checked', false);
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem(THEME_STORAGE_KEY, 'dark-mode');
            themeToggle.setAttribute('aria-checked', true);
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
    // --- End Dark/Light Mode Functions ---


    function isCourseBlocked(course) {
        // A course is blocked if it has prerequisites and at least one has not been approved.
        if (!course.prerequisites || course.prerequisites.length === 0) {
            return false;
        }
        return course.prerequisites.some(prereqId => {
            const prereqCourse = allCourses.find(c => c.id === prereqId);
            return prereqCourse && !prereqCourse.approved;
        });
    }

    function renderMalla() {
        // Clear all semester containers before re-rendering
        for (const sem in semesterCoursesContainers) {
            semesterCoursesContainers[sem].innerHTML = '';
        }

        allCourses.forEach(course => {
            const courseBox = document.createElement('div');
            courseBox.classList.add('course-box');
            courseBox.setAttribute('data-id', course.id);
            courseBox.setAttribute('data-tooltip', course.description || 'No hay descripción disponible.'); // Add tooltip

            // Show course name and grade if approved
            if (course.approved && course.grade !== null) {
                courseBox.textContent = `${course.name} (${course.grade.toFixed(1)})`;
            } else {
                courseBox.textContent = course.name;
            }

            // Add class for border color based on area
            courseBox.classList.add(course.area);

            if (course.approved) {
                courseBox.classList.add('approved');
            } else if (isCourseBlocked(course)) {
                courseBox.classList.add('blocked');
                courseBox.textContent += ' 🔒'; // Add padlock emoji
            }
            // If not approved or blocked, it keeps its default color (pastel pink)

            courseBox.addEventListener('click', () => {
                // Add click animation class
                courseBox.classList.add('clicked');
                setTimeout(() => {
                    courseBox.classList.remove('clicked');
                }, 300); // Remove class after animation duration

                const clickedCourse = allCourses.find(c => c.id === course.id);

                if (clickedCourse.approved) {
                    // If already approved, unapprove it (returns to pastel pink) and remove grade
                    clickedCourse.approved = false;
                    clickedCourse.grade = null;
                    renderMalla(); // Re-render to update states
                    updateProgressBar();
                    updateAverageGrade(); // Update average
                    updateRecommendedCourses();
                    saveProgress(); // Save progress after each change!
                } else if (isCourseBlocked(clickedCourse)) {
                    // If blocked (gray with padlock), do nothing on click.
                    // Already has cursor: not-allowed in CSS.
                } else {
                    // If not approved or blocked, open the modal with information
                    openCourseModal(clickedCourse);
                }
            });

            // Add the course to its semester container
            if (semesterCoursesContainers[course.semester]) {
                semesterCoursesContainers[course.semester].appendChild(courseBox);
            }
        });
    }

    // --- Modal Functions ---
    let currentCourseInModal = null; // To know which course we are viewing in the modal

    function openCourseModal(course) {
        currentCourseInModal = course; // Save the current course
        modalCourseName.textContent = course.name;
        modalCourseSemester.textContent = course.semester;
        modalCourseArea.textContent = course.area;
        modalCourseDescription.textContent = course.description || "No hay descripción disponible."; // Show description or message

        // Show prerequisite names
        if (course.prerequisites && course.prerequisites.length > 0) {
            const prereqNames = course.prerequisites.map(prereqId => {
                const prereqCourse = allCourses.find(c => c.id === prereqId);
                return prereqCourse ? prereqCourse.name : `ID ${prereqId} (Desconocido)`;
            }).join(', ');
            modalCoursePrerequisites.textContent = prereqNames;
        } else {
            modalCoursePrerequisites.textContent = "Ninguno";
        }

        markAsApprovedBtn.onclick = () => {
            let gradeInput = prompt(`Ingresa la nota para "${currentCourseInModal.name}" (1.0 a 7.0):`);
            let grade = parseFloat(gradeInput);

            if (!isNaN(grade) && grade >= 1.0 && grade <= 7.0) {
                currentCourseInModal.approved = true;
                currentCourseInModal.grade = grade;
                closeCourseModal(); // Close the modal after approving
                renderMalla(); // Re-render to update states
                updateProgressBar();
                updateAverageGrade();
                updateRecommendedCourses();
                saveProgress();
            } else if (gradeInput !== null) { // If the user didn't cancel, but the input is invalid
                alert("Nota inválida. Por favor, ingresa un número entre 1.0 y 7.0.");
            }
        };

        courseModal.style.display = 'flex'; // Show the modal
    }

    function closeCourseModal() {
        courseModal.style.display = 'none'; // Hide the modal
        currentCourseInModal = null; // Clear the current course
    }

    // Event listeners to close the modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeCourseModal);
    });

    // Close the modal if clicked outside the content
    window.addEventListener('click', (event) => {
        if (event.target === courseModal) {
            closeCourseModal();
        }
    });
    // --- End Modal Functions ---


    function updateProgressBar() {
        const totalCourses = allCourses.length;
        const approvedCourses = allCourses.filter(course => course.approved).length;
        const percentage = (approvedCourses / totalCourses) * 100;

        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage.toFixed(0)}%`;

        if (percentage > 0) {
            progressBar.style.backgroundColor = 'var(--progress-fill-color)';
        } else {
            progressBar.style.backgroundColor = 'var(--progress-empty-color)';
        }
    }

    function updateAverageGrade() {
        const gradedApprovedCourses = allCourses.filter(course => course.approved && course.grade !== null);

        let totalGrade = 0;
        gradedApprovedCourses.forEach(course => {
            totalGrade += course.grade;
        });

        if (gradedApprovedCourses.length > 0) {
            const average = totalGrade / gradedApprovedCourses.length;
            averageGradeText.textContent = `Promedio de ramos aprobados: ${average.toFixed(2)}`;
        } else {
            averageGradeText.textContent = 'Promedio de ramos aprobados: N/A';
        }
    }

    function updateRecommendedCourses() {
        recommendedCoursesDiv.innerHTML = '';
        // Filter unapproved and unblocked courses
        const availableCourses = allCourses.filter(course => !course.approved && !isCourseBlocked(course));

        // Sort to prioritize:
        // 1. Courses from earlier semesters.
        // 2. Courses that are prerequisites for more other courses (impact).
        const sortedRecommendations = availableCourses.sort((a, b) => {
            if (a.semester !== b.semester) {
                return a.semester - b.semester;
            }

            const getImpact = (courseId) => {
                let impact = 0;
                allCourses.forEach(c => {
                    if (c.prerequisites && c.prerequisites.includes(courseId)) {
                        impact++;
                    }
                });
                return impact;
            };

            const impactA = getImpact(a.id);
            const impactB = getImpact(b.id);

            return impactB - impactA; // Higher impact first
        });

        const recommendationsToShow = sortedRecommendations.slice(0, 6); // Max 6

        if (recommendationsToShow.length === 0) {
            recommendedCoursesDiv.textContent = 'No hay ramos disponibles para recomendar en este momento.';
        } else {
            recommendationsToShow.forEach(course => {
                const courseBox = document.createElement('div');
                courseBox.classList.add('course-box');
                courseBox.textContent = course.name;
                // Don't apply 'approved' or 'blocked' states to recommendations
                // But do apply area color for consistency
                courseBox.classList.add(course.area);
                recommendedCoursesDiv.appendChild(courseBox);
            });
        }
    }

    refreshRecommendationsBtn.addEventListener('click', updateRecommendedCourses);

    // --- Tooltip Logic ---
    let tooltipTimeout;
    document.addEventListener('mouseover', (event) => {
        const target = event.target;
        const tooltipText = target.getAttribute('data-tooltip');

        if (tooltipText) {
            // Clear any existing tooltip
            clearTimeout(tooltipTimeout);
            const existingTooltip = document.querySelector('.tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }

            tooltipTimeout = setTimeout(() => {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = tooltipText;
                document.body.appendChild(tooltip);

                // Position the tooltip
                const rect = target.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`; // Above the element

                // Adjust if too close to screen edges
                if (rect.top - tooltip.offsetHeight - 10 < 0) { // If it goes off top
                    tooltip.style.top = `${rect.bottom + 10}px`; // Place below
                }
                if (rect.left + rect.width / 2 + tooltip.offsetWidth / 2 > window.innerWidth) { // If it goes off right
                    tooltip.style.left = `${window.innerWidth - tooltip.offsetWidth - 5}px`;
                }
                if (rect.left + rect.width / 2 - tooltip.offsetWidth / 2 < 0) { // If it goes off left
                    tooltip.style.left = `5px`;
                }
                tooltip.style.transform = 'translateX(-50%)'; // Center horizontally
            }, 500); // Delay before showing tooltip
        }
    });

    document.addEventListener('mouseout', (event) => {
        const target = event.target;
        if (target.hasAttribute('data-tooltip')) {
            clearTimeout(tooltipTimeout);
            const existingTooltip = document.querySelector('.tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
        }
    });
    // --- End Tooltip Logic ---


    // --- Initial Calls ---
    loadTheme(); // Load theme preference first
    loadProgress(); // Load progress at the start
    renderMalla();
    updateProgressBar();
    updateAverageGrade();
    updateRecommendedCourses();
});
