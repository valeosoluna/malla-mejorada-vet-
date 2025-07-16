// data.js
const coursesData = [
    // Semestre 1 - Área Formación Básica
    { id: 1, name: "Introducción a las Ciencias Veterinarias", semester: 1, prerequisites: [], area: "Básica", approved: false },
    { id: 2, name: "Fundamentos de la Química", semester: 1, prerequisites: [], area: "Básica", approved: false },
    { id: 3, name: "Biología Celular y Molecular", semester: 1, prerequisites: [], area: "Básica", approved: false },
    { id: 4, name: "Matemática", semester: 1, prerequisites: [], area: "Básica", approved: false },
    { id: 5, name: "Zoología", semester: 1, prerequisites: [], area: "Básica", approved: false },
    { id: 6, name: "Fundamentos de la Física", semester: 1, prerequisites: [], area: "Básica", approved: false },

    // Semestre 2 - Área Formación Básica / Disciplinar
    { id: 7, name: "Anatomía Animal I", semester: 2, prerequisites: [5], area: "Disciplinar", approved: false }, // Prereq: Zoología (5) [cite: 4]
    { id: 8, name: "Praderas y Especies Forrajeras", semester: 2, prerequisites: [3], area: "Disciplinar", approved: false }, // Prereq: Biología Celular y Molecular (3) [cite: 4]
    { id: 9, name: "Fundamentos de Bioquímica", semester: 2, prerequisites: [2, 3], area: "Básica", approved: false }, // Prereq: Fundamentos de la Química (2), Biología Celular y Molecular (3) [cite: 4]
    { id: 10, name: "Histoembriología Veterinaria", semester: 2, prerequisites: [3], area: "Básica", approved: false }, // Prereq: Biología Celular y Molecular (3) [cite: 4]
    { id: 11, name: "Ecología", semester: 2, prerequisites: [4, 5], area: "Básica", approved: false }, // Prereq: Matemática (4), Zoología (5) [cite: 4]
    { id: 12, name: "Electivo 1", semester: 2, prerequisites: [], area: "Electiva", approved: false }, // Electivo [cite: 4]

    // Semestre 3 - Área Formación Disciplinar
    { id: 13, name: "Anatomía Animal II", semester: 3, prerequisites: [7], area: "Disciplinar", approved: false }, // Prereq: Anatomía Animal I (7) [cite: 4]
    { id: 14, name: "Nutrición y Alimentación Animal", semester: 3, prerequisites: [8, 9], area: "Disciplinar", approved: false }, // Prereq: Praderas y Especies Forrajeras (8), Fundamentos de Bioquímica (9) [cite: 4]
    { id: 15, name: "Fisiología Veterinaria", semester: 3, prerequisites: [9, 10], area: "Disciplinar", approved: false }, // Prereq: Fundamentos de Bioquímica (9), Histoembriología Veterinaria (10) [cite: 4]
    { id: 16, name: "Práctica Inicial", semester: 3, prerequisites: [7, 11], area: "Disciplinar", approved: false }, // Prereq: Anatomía Animal I (7), Ecología (11) [cite: 4]
    { id: 17, name: "Inmunología General", semester: 3, prerequisites: [3, 9], area: "Básica", approved: false }, // Prereq: Biología Celular y Molecular (3), Fundamentos de Bioquímica (9) [cite: 4]
    { id: 18, name: "Bioestadística", semester: 3, prerequisites: [4], area: "Básica", approved: false }, // Prereq: Matemática (4) [cite: 4]
    { id: 19, name: "Electivo 2", semester: 3, prerequisites: [], area: "Electiva", approved: false }, // Electivo [cite: 4]

    // Semestre 4 - Área Formación Disciplinar
    { id: 20, name: "Etología y Bienestar Animal", semester: 4, prerequisites: [15], area: "Disciplinar", approved: false }, // Prereq: Fisiología Veterinaria (15) [cite: 4]
    { id: 21, name: "Histopatología", semester: 4, prerequisites: [15], area: "Disciplinar", approved: false }, // Prereq: Fisiología Veterinaria (15) [cite: 6]
    { id: 22, name: "Microbiología Veterinaria", semester: 4, prerequisites: [17], area: "Disciplinar", approved: false }, // Prereq: Inmunología General (17) [cite: 6]
    { id: 23, name: "Conservación de Fauna Silvestre", semester: 4, prerequisites: [11], area: "Disciplinar", approved: false }, // Prereq: Ecología (11) [cite: 6]
    { id: 24, name: "Métodos de Investigación en Salud", semester: 4, prerequisites: [18], area: "Básica", approved: false }, // Prereq: Bioestadística (18) [cite: 6]
    { id: 25, name: "Electivo 3", semester: 4, prerequisites: [], area: "Electiva", approved: false }, // Electivo [cite: 6]

    // Semestre 5 - Área Formación Disciplinar
    { id: 26, name: "Genética en Ciencias Veterinarias", semester: 5, prerequisites: [18], area: "Disciplinar", approved: false }, // Prereq: Bioestadística (18) [cite: 6]
    { id: 27, name: "Epidemiología Veterinaria", semester: 5, prerequisites: [24], area: "Disciplinar", approved: false }, // Prereq: Métodos de Investigación en Salud (24) [cite: 6]
    { id: 28, name: "Fisiopatología Veterinaria", semester: 5, prerequisites: [13, 21], area: "Disciplinar", approved: false }, // Prereq: Anatomía Animal II (13), Histopatología (21) [cite: 6]
    { id: 29, name: "Gestión Ambiental y Desarrollo Sustentable", semester: 5, prerequisites: [23], area: "Disciplinar", approved: false }, // Prereq: Conservación de Fauna Silvestre (23) [cite: 6]
    { id: 30, name: "Gestión Contable y Financiera", semester: 5, prerequisites: [18], area: "Básica", approved: false }, // Prereq: Bioestadística (18) [cite: 6]
    { id: 31, name: "Electivo 4", semester: 5, prerequisites: [], area: "Electiva", approved: false }, // Electivo [cite: 6]

    // Semestre 6 - Área Formación Disciplinar
    { id: 32, name: "Semiología Veterinaria", semester: 6, prerequisites: [20, 28], area: "Disciplinar", approved: false }, // Prereq: Etología y Bienestar Animal (20), Fisiopatología Veterinaria (28) [cite: 6]
    { id: 33, name: "Reproducción Animal", semester: 6, prerequisites: [28], area: "Disciplinar", approved: false }, // Prereq: Fisiopatología Veterinaria (28) [cite: 6]
    { id: 34, name: "Anatomía Patológica", semester: 6, prerequisites: [28], area: "Disciplinar", approved: false }, // Prereq: Fisiopatología Veterinaria (28) [cite: 6]
    { id: 35, name: "Microbiología de los Alimentos", semester: 6, prerequisites: [22, 24], area: "Disciplinar", approved: false }, // Prereq: Microbiología Veterinaria (22), Métodos de Investigación en Salud (24) [cite: 6]
    { id: 36, name: "Práctica Intermedia", semester: 6, prerequisites: [16, 20], area: "Disciplinar", approved: false }, // Prereq: Práctica Inicial (16), Etología y Bienestar Animal (20) [cite: 6]
    { id: 37, name: "Electivo 5", semester: 6, prerequisites: [], area: "Electiva", approved: false }, // Electivo [cite: 6]

    // Semestre 7 - Área Formación Disciplinar
    { id: 38, name: "Sistemas de Producción Animal", semester: 7, prerequisites: [14, 26], area: "Disciplinar", approved: false }, // Prereq: Nutrición y Alimentación Animal (14), Genética en Ciencias Veterinarias (26) [cite: 6]
    { id: 39, name: "Farmacología Veterinaria", semester: 7, prerequisites: [28], area: "Disciplinar", approved: false }, // Prereq: Fisiopatología Veterinaria (28) [cite: 6]
    { id: 40, name: "Enfermedades Producidas por Agentes Biológicos I", semester: 7, prerequisites: [27, 35], area: "Disciplinar", approved: false }, // Prereq: Epidemiología Veterinaria (27), Microbiología de los Alimentos (35) [cite: 8]
    { id: 41, name: "Procedimientos Clínicos", semester: 7, prerequisites: [32], area: "Disciplinar", approved: false }, // Prereq: Semiología Veterinaria (32) [cite: 8]
    { id: 42, name: "Imagenología", semester: 7, prerequisites: [34], area: "Disciplinar", approved: false }, // Prereq: Anatomía Patológica (34) [cite: 8]
    { id: 43, name: "Inteligencia Artificial Aplicada a la Salud", semester: 7, prerequisites: [18], area: "Disciplinar", approved: false }, // Prereq: Bioestadística (18) [cite: 8]

    // Semestre 8 - Área Formación Disciplinar
    { id: 44, name: "Laboratorio Clínico y Biotecnología", semester: 8, prerequisites: [34, 40], area: "Disciplinar", approved: false }, // Prereq: Anatomía Patológica (34), Enfermedades producidas por agentes biológicos I (40) [cite: 8]
    { id: 45, name: "Investigación en Ciencias Veterinarias", semester: 8, prerequisites: [24], area: "Disciplinar", approved: false }, // Prereq: Métodos de Investigación en Salud (24) [cite: 8]
    { id: 46, name: "Enfermedades Producidas por Agentes Biológicos II", semester: 8, prerequisites: [40, 39], area: "Disciplinar", approved: false }, // Prereq: Enfermedades producidas por agentes biológicos I (40), Farmacología Veterinaria (39) [cite: 8]
    { id: 47, name: "Principios de Cirugía y Anestesiología", semester: 8, prerequisites: [39, 41], area: "Disciplinar", approved: false }, // Prereq: Farmacología Veterinaria (39), Procedimientos Clínicos (41) [cite: 8]
    { id: 48, name: "Medicina Interna", semester: 8, prerequisites: [32, 42], area: "Disciplinar", approved: false }, // Prereq: Semiología Veterinaria (32), Imagenología (42) [cite: 8]
    { id: 49, name: "Bioética", semester: 8, prerequisites: [], area: "Básica", approved: false }, // Sin prerrequisitos explícitos [cite: 8]

    // Semestre 9 - Área Formación Disciplinar
    { id: 50, name: "Salud Pública Veterinaria", semester: 9, prerequisites: [46], area: "Disciplinar", approved: false }, // Prereq: Enfermedades producidas por agentes biológicos II (46) [cite: 8]
    { id: 51, name: "Unidad de Investigación I", semester: 9, prerequisites: [45, 49], area: "Disciplinar", approved: false }, // Prereq: Investigación en Ciencias Veterinarias (45), Bioética (49) [cite: 8]
    { id: 52, name: "Internado de Pequeños Animales I", semester: 9, prerequisites: [44, 47, 48], area: "Disciplinar", approved: false }, // Prereq: Laboratorio Clínico y Biotecnología (44), Principios de Cirugía y Anestesiología (47), Medicina Interna (48) [cite: 8]
    { id: 53, name: "Internado de Animales Mayores I", semester: 9, prerequisites: [44, 47, 48], area: "Disciplinar", approved: false }, // Prereq: Laboratorio Clínico y Biotecnología (44), Principios de Cirugía y Anestesiología (47), Medicina Interna (48) [cite: 8]
    { id: 54, name: "Formulación y Evaluación de Proyectos Veterinarios", semester: 9, prerequisites: [30, 38], area: "Disciplinar", approved: false }, // Prereq: Gestión Contable y Financiera (30), Sistemas de Producción Animal (38) [cite: 10]
    { id: 55, name: "Gestión Veterinaria", semester: 9, prerequisites: [30, 38], area: "Disciplinar", approved: false }, // Prereq: Gestión Contable y Financiera (30), Sistemas de Producción Animal (38) [cite: 10]
    { id: 56, name: "Práctica Profesional", semester: 9, prerequisites: [], area: "Disciplinar", approved: false }, // Prereq: Obtención de licenciatura (asumiendo que se debe haber completado un % significativo) [cite: 10]

    // Semestre 10 - Área Formación Disciplinar
    { id: 57, name: "Una Salud", semester: 10, prerequisites: [50, 54], area: "Disciplinar", approved: false }, // Prereq: Salud Pública Veterinaria (50), Formulación y Evaluación de Proyectos Veterinarios (54) [cite: 10]
    { id: 58, name: "Unidad de Investigación II", semester: 10, prerequisites: [51], area: "Disciplinar", approved: false }, // Prereq: Unidad de Investigación I (51) [cite: 10]
    { id: 59, name: "Internado Electivo: Pequeños Animales II", semester: 10, prerequisites: [], area: "Disciplinar", approved: false }, // Internado Electivo [cite: 10]
    { id: 60, name: "Internado Electivo: Animales Mayores", semester: 10, prerequisites: [], area: "Disciplinar", approved: false }, // Internado Electivo [cite: 10]
    { id: 61, name: "Internado Electivo: Conservación, Biodiversidad y Medio Ambiente", semester: 10, prerequisites: [], area: "Disciplinar", approved: false }, // Internado Electivo [cite: 10]
    { id: 62, name: "Internado Electivo: Producción y Sistemas de Aseguramiento de la Calidad", semester: 10, prerequisites: [], area: "Disciplinar", approved: false }, // Internado Electivo [cite: 10]
    { id: 63, name: "Orientación Laboral y Responsabilidad Ética en Medicina Veterinaria", semester: 10, prerequisites: [36], area: "Disciplinar", approved: false }, // Prereq: Práctica Intermedia (36) [cite: 10]
];
