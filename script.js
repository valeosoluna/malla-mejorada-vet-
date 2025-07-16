// script.js

document.addEventListener('DOMContentLoaded', () => {
    const allCourses = coursesData; // Usamos la data de data.js
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const recommendedCoursesDiv = document.getElementById('recommendedCourses');
    const refreshRecommendationsBtn = document.getElementById('refreshRecommendations');

    // Mapeo de IDs de elementos del DOM por área y semestre para renderizado
    const semesterContainers = {
        'Básica': {
            1: document.createElement('div'),
            2: document.createElement('div'),
            3: document.createElement('div'),
            4: document.createElement('div'),
            5: document.createElement('div'),
            6: document.createElement('div'),
            7: document.createElement('div'),
            8: document.createElement('div'),
            9: document.createElement('div'),
            10: document.createElement('div')
        },
        'Disciplinar': {
            1: document.createElement('div'),
            2: document.createElement('div'),
            3: document.createElement('div'),
            4: document.createElement('div'),
            5: document.createElement('div'),
            6: document.createElement('div'),
            7: document.createElement('div'),
            8: document.createElement('div'),
            9: document.createElement('div'),
            10: document.createElement('div')
        },
        'Electiva': {
            1: document.createElement('div'),
            2: document.createElement('div'),
            3: document.createElement('div'),
            4: document.createElement('div'),
            5: document.createElement('div'),
            6: document.createElement('div'),
            7: document.createElement('div'),
            8: document.createElement('div'),
            9: document.createElement('div'),
            10: document.createElement('div')
        }
    };

    // Inicializar los contenedores de semestres en el DOM
    for (let i = 1; i <= 10; i++) {
        const basicContainer = document.getElementById('basicSemesters');
        const disciplinaryContainer1 = document.getElementById('disciplinarySemesters1');
        const disciplinaryContainer2 = document.getElementById('disciplinarySemesters2');
        const electiveContainer = document.getElementById('electiveSemesters');

        semesterContainers['Básica'][i].className = 'semester';
        semesterContainers['Básica'][i].innerHTML = `Semestre ${i}`;
        if (allCourses.some(c => c.semester === i && c.area === 'Básica')) { // Solo añadir si hay cursos para este semestre/área
             basicContainer.appendChild(semesterContainers['Básica'][i]);
             const coursesDiv = document.createElement('div');
             coursesDiv.className = 'courses-container';
             semesterContainers['Básica'][i].appendChild(coursesDiv);
             semesterContainers['Básica'][i].coursesDiv = coursesDiv; // Para fácil acceso
        }


        semesterContainers['Disciplinar'][i].className = 'semester';
        semesterContainers['Disciplinar'][i].innerHTML = `Semestre ${i}`;
        if (allCourses.some(c => c.semester === i && c.area === 'Disciplinar')) {
            if (i <= 5) {
                disciplinaryContainer1.appendChild(semesterContainers['Disciplinar'][i]);
            } else {
                disciplinaryContainer2.appendChild(semesterContainers['Disciplinar'][i]);
            }
            const coursesDiv = document.createElement('div');
            coursesDiv.className = 'courses-container';
            semesterContainers['Disciplinar'][i].appendChild(coursesDiv);
            semesterContainers['Disciplinar'][i].coursesDiv = coursesDiv;
        }


        semesterContainers['Electiva'][i].className = 'semester';
        semesterContainers['Electiva'][i].innerHTML = `Semestre ${i}`;
        if (allCourses.some(c => c.semester === i && c.area === 'Electiva')) {
            electiveContainer.appendChild(semesterContainers['Electiva'][i]);
            const coursesDiv = document.createElement('div');
            coursesDiv.className = 'courses-container';
            semesterContainers['Electiva'][i].appendChild(coursesDiv);
            semesterContainers['Electiva'][i].coursesDiv = coursesDiv;
        }
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
        // Limpiar contenedores antes de volver a renderizar
        for (const area in semesterContainers) {
            for (const sem in semesterContainers[area]) {
                if (semesterContainers[area][sem].coursesDiv) {
                    semesterContainers[area][sem].coursesDiv.innerHTML = '';
                }
            }
        }

        allCourses.forEach(course => {
            const courseBox = document.createElement('div');
            courseBox.classList.add('course-box');
            courseBox.setAttribute('data-id', course.id);
            courseBox.textContent = course.name;

            if (course.approved) {
                courseBox.classList.add('approved');
            } else if (isCourseBlocked(course)) {
                courseBox.classList.add('blocked');
            } else {
                // Si no está aprobado y no bloqueado, está disponible (verde)
                // No necesitamos una clase 'available' explícita si es el color por defecto
                // courseBox.classList.add('available'); // Esto se manejaría con el CSS por defecto
            }

            courseBox.addEventListener('click', () => {
                if (!courseBox.classList.contains('blocked') && !courseBox.classList.contains('approved')) {
                    course.approved = true;
                    renderMalla(); // Re-renderizar para actualizar estados de prerrequisitos
                    updateProgressBar();
                    updateRecommendedCourses();
                }
            });

            // Añadir el curso al contenedor de su semestre y área
            if (semesterContainers[course.area] && semesterContainers[course.area][course.semester] && semesterContainers[course.area][course.semester].coursesDiv) {
                semesterContainers[course.area][course.semester].coursesDiv.appendChild(courseBox);
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
