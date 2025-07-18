// script.js

document.addEventListener('DOMContentLoaded', () => {
    const LOCAL_STORAGE_KEY = 'mallaProgress'; // Clave para guardar en localStorage
    const THEME_STORAGE_KEY = 'mallaTheme'; // Clave para la preferencia de tema

    let allCourses; // Esta variable contendrá la data, ya sea cargada o la inicial

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const semestersContainer = document.getElementById('semestersContainer');
    const recommendedCoursesDiv = document.getElementById('recommendedCourses');
    const refreshRecommendationsBtn = document.getElementById('refreshRecommendations');
    const averageGradeText = document.getElementById('averageGradeText');
    const themeToggle = document.querySelector('.theme-toggle');

    // Elementos del Modal
    const courseModal = document.getElementById('courseModal');
    const closeModalButtons = document.querySelectorAll('.modal-button.close, .close-button');
    const modalCourseName = document.getElementById('modalCourseName');
    const modalCourseSemester = document.getElementById('modalCourseSemester');
    const modalCourseArea = document.getElementById('modalCourseArea');
    const modalCourseDescription = document.getElementById('modalCourseDescription');
    const modalCoursePrerequisites = document.getElementById('modalCoursePrerequisites');
    const markAsApprovedBtn = document.getElementById('markAsApprovedBtn');

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

    // --- Funciones de Guardado y Carga ---
    function saveProgress() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allCourses));
    }

    function loadProgress() {
        const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedProgress) {
            allCourses = JSON.parse(savedProgress);
        } else {
            // Si no hay progreso guardado, usa la data inicial de data.js
            allCourses = coursesData.map(course => ({ ...course })); // Copia profunda para no modificar el original
        }
    }
    // --- Fin Funciones de Guardado y Carga ---

    // --- Funciones de Modo Oscuro/Claro ---
    function loadTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            themeToggle.setAttribute('aria-checked', savedTheme === 'dark-mode');
        } else {
            // Por defecto, usa el modo claro si no hay preferencia guardada
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
    // --- Fin Funciones de Modo Oscuro/Claro ---


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
            // Añadir la descripción como data-tooltip para todos los cursos
            courseBox.setAttribute('data-tooltip', course.description || 'No hay descripción disponible.');

            // Mostrar nombre del ramo y nota si está aprobado
            if (course.approved && course.grade !== null) {
                courseBox.textContent = `${course.name} (${course.grade.toFixed(1)})`;
            } else {
                courseBox.textContent = course.name;
            }

            // Añadir clase para el borde de color según el área
            courseBox.classList.add(course.area);

            if (course.approved) {
                courseBox.classList.add('approved');
            } else if (isCourseBlocked(course)) {
                courseBox.classList.add('blocked');
                courseBox.textContent += ' 🔒'; // Añadir emoji de candado
            }
            // Si no está aprobado ni bloqueado, se queda con el color por defecto (rosado pastel)

            courseBox.addEventListener('click', () => {
                // Agregar clase para la animación al hacer clic
                courseBox.classList.add('clicked');
                setTimeout(() => {
                    courseBox.classList.remove('clicked');
                }, 300); // Eliminar clase después de la duración de la animación

                const clickedCourse = allCourses.find(c => c.id === course.id);

                if (clickedCourse.approved) {
                    // Si ya está aprobado, desaprobarlo (vuelve a rosado pastel) y elimina la nota
                    clickedCourse.approved = false;
                    clickedCourse.grade = null;
                    renderMalla(); // Re-renderizar para actualizar estados
                    updateProgressBar();
                    updateAverageGrade(); // Actualizar el promedio
                    updateRecommendedCourses();
                    saveProgress(); // ¡Guardar el progreso después de cada cambio!
                } else if (isCourseBlocked(clickedCourse)) {
                    // Si está bloqueado (gris con candado), no se hace nada al hacer clic.
                    // Ya tiene cursor: not-allowed en CSS.
                } else {
                    // Si no está aprobado ni bloqueado, abrir el modal con la información
                    openCourseModal(clickedCourse);
                }
            });

            // Añadir el curso al contenedor de su semestre
            if (semesterCoursesContainers[course.semester]) {
                semesterCoursesContainers[course.semester].appendChild(courseBox);
            }
        });
    }

    // --- Funciones del Modal ---
    let currentCourseInModal = null; // Para saber qué ramo estamos viendo en el modal

    function openCourseModal(course) {
        currentCourseInModal = course; // Guardar el ramo actual
        modalCourseName.textContent = course.name;
        modalCourseSemester.textContent = course.semester;
        modalCourseArea.textContent = course.area;
        modalCourseDescription.textContent = course.description || "No hay descripción disponible."; // Mostrar descripción o mensaje

        // Mostrar nombres de prerrequisitos
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
                closeCourseModal(); // Cerrar el modal después de aprobar
                renderMalla(); // Re-renderizar para actualizar estados
                updateProgressBar();
                updateAverageGrade();
                updateRecommendedCourses();
                saveProgress();
            } else if (gradeInput !== null) { // Si el usuario no canceló, pero la entrada es inválida
                alert("Nota inválida. Por favor, ingresa un número entre 1.0 y 7.0.");
            }
        };

        courseModal.style.display = 'flex'; // Mostrar el modal
    }

    function closeCourseModal() {
        courseModal.style.display = 'none'; // Ocultar el modal
        currentCourseInModal = null; // Limpiar el ramo actual
    }

    // Event listeners para cerrar el modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeCourseModal);
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === courseModal) {
            closeCourseModal();
        }
    });
    // --- Fin Funciones del Modal ---


    function updateProgressBar() {
        const totalCourses = allCourses.length;
        const approvedCourses = allCourses.filter(course => course.approved).length;
        const percentage = (approvedCourses / totalCourses) * 100;

        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage.toFixed(0)}%`;

        if (percentage > 0) {
            // Usa variables CSS para los colores de la barra de progreso
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
                // Añadir tooltip a las recomendaciones
                courseBox.setAttribute('data-tooltip', course.description || 'No hay descripción disponible.');
                recommendedCoursesDiv.appendChild(courseBox);
            });
        }
    }

    refreshRecommendationsBtn.addEventListener('click', updateRecommendedCourses);


    // --- Lógica de Tooltips ---
    let tooltipTimeout;
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');
    document.body.appendChild(tooltipElement);

    document.addEventListener('mouseover', (event) => {
        const target = event.target;
        const tooltipText = target.getAttribute('data-tooltip');

        if (tooltipText) {
            // Limpiar cualquier tooltip existente o timeout pendiente
            clearTimeout(tooltipTimeout);
            tooltipElement.style.opacity = '0'; // Ocultar antes de mostrar nuevo

            tooltipTimeout = setTimeout(() => {
                tooltipElement.textContent = tooltipText;

                // Posicionar el tooltip
                const rect = target.getBoundingClientRect();
                let topPosition = rect.top - tooltipElement.offsetHeight - 10; // Arriba del elemento
                let leftPosition = rect.left + rect.width / 2; // Centrado horizontalmente

                // Ajustar si se sale de los bordes superiores
                if (topPosition < 0) {
                    topPosition = rect.bottom + 10; // Abajo del elemento
                }

                tooltipElement.style.left = `${leftPosition}px`;
                tooltipElement.style.top = `${topPosition}px`;
                tooltipElement.style.transform = 'translateX(-50%)'; // Centrar horizontalmente

                // Ajustar si se sale de los bordes laterales
                const tooltipRect = tooltipElement.getBoundingClientRect();
                if (tooltipRect.left < 5) {
                    tooltipElement.style.left = `calc(5px + ${tooltipRect.width / 2}px)`;
                }
                if (tooltipRect.right > window.innerWidth - 5) {
                    tooltipElement.style.left = `calc(${window.innerWidth - 5}px - ${tooltipRect.width / 2}px)`;
                }

                tooltipElement.style.opacity = '1'; // Mostrar tooltip
            }, 500); // Retraso antes de mostrar el tooltip
        }
    });

    document.addEventListener('mouseout', (event) => {
        const target = event.target;
        if (target.hasAttribute('data-tooltip')) {
            clearTimeout(tooltipTimeout);
            tooltipElement.style.opacity = '0'; // Ocultar tooltip inmediatamente
        }
    });
    // --- Fin Lógica de Tooltips ---


    // --- Llamadas iniciales ---
    loadTheme(); // Cargar la preferencia de tema primero
    loadProgress(); // Cargar el progreso al inicio
    renderMalla();
    updateProgressBar();
    updateAverageGrade();
    updateRecommendedCourses();
});
