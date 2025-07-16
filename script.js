// script.js

document.addEventListener('DOMContentLoaded', () => {
    const allCourses = coursesData; // Usamos la data de data.js
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const semestersContainer = document.getElementById('semestersContainer');
    const recommendedCoursesDiv = document.getElementById('recommendedCourses');
    const refreshRecommendationsBtn = document.getElementById('refreshRecommendations');

    // Objeto para almacenar los divs de cursos de cada semestre
    const semesterCoursesContainers = {};
    for (let i = 1; i <= 10; i++) {
        const semesterDiv = document.createElement('div');
        semesterDiv.classList.add('semester');
        semesterDiv.innerHTML = `<h3>Semestre ${i}</h3>`;
        semestersContainer.appendChild(semesterDiv);

        const coursesDiv = document.createElement('div');
        coursesDiv.classList.add('courses-container');
        semesterDiv.appendChild(coursesDiv);
        semesterCoursesContainers[i] = coursesDiv; // Mapear semestre a su contenedor de cursos
    }

    function isCourseBlocked(course) {
        // Un curso está bloqueado si tiene prerrequisitos y al menos uno no ha sido aprobado.
        if (!course.prerequisites || course.prerequisites.length === 0) {
            return false;
        }
        return course.prerequisites.some(prereqId => {
            const prereqCourse = allCourses.find(c => c.id === prereqId);
            return prereqCourse && !prereqCourse.approved;
        });
    }

    function renderMalla() {
        // Limpiar todos los contenedores de ramos antes de volver a renderizar
        for (const sem in semesterCoursesContainers) {
            semesterCoursesContainers[sem].innerHTML = '';
        }

        allCourses.forEach(course => {
            const courseBox = document.createElement('div');
            courseBox.classList.add('course-box');
            courseBox.setAttribute('data-id', course.id);
            courseBox.textContent = course.name;

            // Añadir clase para el borde de color según el área
            courseBox.classList.add(course.area);

            if (course.approved) {
                courseBox.classList.add('approved');
            } else if (isCourseBlocked(course)) {
                courseBox.classList.add('blocked');
            }
            // Si no está aprobado ni bloqueado, se queda con el color por defecto (verde)

            courseBox.addEventListener('click', () => {
                const clickedCourse = allCourses.find(c => c.id === course.id);

                if (clickedCourse.approved) {
                    // Si ya está aprobado, desaprobarlo (vuelve a verde)
                    clickedCourse.approved = false;
                } else {
                    // Si no está aprobado
                    if (!isCourseBlocked(clickedCourse)) {
                        // Si no está bloqueado (es decir, está en verde), aprobarlo
                        clickedCourse.approved = true;
                    }
                    // Si está bloqueado (gris), no se hace nada al hacer clic.
                }
                
                renderMalla(); // Re-renderizar para actualizar estados
                updateProgressBar();
                updateRecommendedCourses();
            });

            // Añadir el curso al contenedor de su semestre
            if (semesterCoursesContainers[course.semester]) {
                semesterCoursesContainers[course.semester].appendChild(courseBox);
            }
        });
    }

    function updateProgressBar() {
        const totalCourses = allCourses.length;
        const approvedCourses = allCourses.filter(course => course.approved).length;
        const percentage = (approvedCourses / totalCourses) * 100;

        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage.toFixed(0)}%`;

        if (percentage > 0) {
            progressBar.style.backgroundColor = '#ff8c00'; // Naranjo cuando hay progreso
        } else {
            progressBar.style.backgroundColor = '#4CAF50'; // Verde inicial
        }
    }

    function updateRecommendedCourses() {
        recommendedCoursesDiv.innerHTML = '';
        // Filtrar cursos no aprobados y no bloqueados
        const availableCourses = allCourses.filter(course => !course.approved && !isCourseBlocked(course));

        // Ordenar para priorizar:
        // 1. Ramos de semestres más tempranos.
        // 2. Ramos que son prerrequisitos para más otros ramos (impacto).
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

            return impactB - impactA; // Mayor impacto primero
        });

        const recommendationsToShow = sortedRecommendations.slice(0, 6); // Máximo 6

        if (recommendationsToShow.length === 0) {
            recommendedCoursesDiv.textContent = 'No hay ramos disponibles para recomendar en este momento.';
        } else {
            recommendationsToShow.forEach(course => {
                const courseBox = document.createElement('div');
                courseBox.classList.add('course-box');
                courseBox.textContent = course.name;
                // No aplicar estados 'approved' o 'blocked' a las recomendaciones
                // Pero sí el color de área para consistencia
                courseBox.classList.add(course.area);
                recommendedCoursesDiv.appendChild(courseBox);
            });
        }
    }

    refreshRecommendationsBtn.addEventListener('click', updateRecommendedCourses);


    // Llamadas iniciales
    renderMalla();
    updateProgressBar();
    updateRecommendedCourses();
});
