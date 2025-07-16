// data.js
const coursesData = [
    // Semestre 1 - Área Formación Básica
    { id: 1, name: "Introducción a las Ciencias Veterinarias", semester: 1, prerequisites: [], area: "Básica", approved: false, grade: null },
    { id: 2, name: "Fundamentos de la Química", semester: 1, prerequisites: [], area: "Básica", approved: false, grade: null },
    { id: 3, name: "Biología Celular y Molecular", semester: 1, prerequisites: [], area: "Básica", approved: false, grade: null },
    { id: 4, name: "Matemática", semester: 1, prerequisites: [], area: "Básica", approved: false, grade: null },
    { id: 5, name: "Zoología", semester: 1, prerequisites: [], area: "Básica", approved: false, grade: null },
    { id: 6, name: "Fundamentos de la Física", semester: 1, prerequisites: [], area: "Básica", approved: false, grade: null },

    // Semestre 2 - Área Formación Básica / Disciplinar
    { id: 7, name: "Anatomía Animal I", semester: 2, prerequisites: [5], area: "Disciplinar", approved: false, grade: null }, // Prereq: Zoología (5)
    { id: 8, name: "Praderas y Especies Forrajeras", semester: 2, prerequisites: [3], area: "Disciplinar", approved: false, grade: null }, // Prereq: Biología Celular y Molecular (3)
    { id: 9, name: "Fundamentos de Bioquímica", semester: 2, prerequisites: [2, 3], area: "Básica", approved: false, grade: null }, // Prereq: Fundamentos de la Química (2), Biología Celular y Molecular (3)
    { id: 10, name: "Histoembriología Veterinaria", semester: 2, prerequisites: [3], area: "Básica", approved: false, grade: null }, // Prereq: Biología Celular y Molecular (3)
    { id: 11, name: "Ecología", semester: 2, prerequisites: [4, 5], area: "Básica", approved: false, grade: null }, // Prereq: Matemática (4), Zoología (5)
    { id: 12, name: "Electivo 1", semester: 2, prerequisites: [], area: "Electiva", approved: false, grade: null }, // Electivo

    // Semestre 3 - Área Formación Disciplinar
    { id: 13, name: "Anatomía Animal II", semester: 3, prerequisites: [7], area: "Disciplinar", approved: false, grade: null }, // Prereq: Anatomía Animal I (7)
    { id: 14, name: "Nutrición y Alimentación Animal", semester: 3, prerequisites: [8, 9], area: "Disciplinar", approved: false, grade: null }, // Prereq: Praderas y Especies Forrajeras (8), Fundamentos de Bioquímica (9)
    { id: 15, name: "Fisiología Veterinaria", semester: 3, prerequisites: [9, 10], area: "Disciplinar", approved: false, grade: null }, // Prereq: Fundamentos de Bioquímica (9), Histoembriología Veterinaria (10)
    { id: 16, name: "Práctica Inicial", semester: 3, prerequisites: [7, 11], area: "Disciplinar", approved: false, grade: null }, // Prereq: Anatomía Animal I (7), Ecología (11)
    { id: 17, name: "Inmunología General", semester: 3, prerequisites: [3, 9], area: "Básica", approved: false, grade: null }, // Prereq: Biología Celular y Molecular (3), Fundamentos de Bioquímica (9)
    { id: 18, name: "Bioestadística", semester: 3, prerequisites: [4], area: "Básica", approved: false, grade: null }, // Prereq: Matemática (4)
    { id: 19, name: "Electivo 2", semester: 3, prerequisites: [], area: "Electiva", approved: false, grade: null }, // Electivo

    // Semestre 4 - Área Formación Disciplinar
    { id: 20, name: "Etología y Bienestar Animal", semester: 4, prerequisites: [15], area: "Disciplinar", approved: false, grade: null }, // Prereq: Fisiología Veterinaria (15)
    { id: 21, name: "Histopatología", semester: 4, prerequisites: [15], area: "Disciplinar", approved: false, grade: null }, // Prereq: Fisiología Veterinaria (15)
    { id: 22, name: "Microbiología Veterinaria", semester: 4, prerequisites: [17], area: "Disciplinar", approved: false, grade: null }, // Prereq: Inmunología General (17)
    { id: 23, name: "Conservación de Fauna Silvestre", semester: 4, prerequisites: [11], area: "Disciplinar", approved: false, grade: null }, // Prereq: Ecología (11)
    { id: 24, name: "Métodos de Investigación en Salud", semester: 4, prerequisites: [18], area: "Básica", approved: false, grade: null }, // Prereq: Bioestadística (18)
    { id: 25, name: "Electivo 3", semester: 4, prerequisites: [], area: "Electiva", approved: false, grade: null }, // Electivo

    // Semestre 5 - Área Formación Disciplinar
    { id: 26, name: "Genética en Ciencias Veterinarias", semester: 5, prerequisites: [18], area: "Disciplinar", approved: false, grade: null }, // Prereq: Bioestadística (18)
    { id: 27, name: "Epidemiología Veterinaria", semester: 5, prerequisites: [24], area: "Disciplinar", approved: false, grade: null }, // Prereq: Métodos de Investigación en Salud (24)
    { id: 28, name: "Fisiopatología Veterinaria", semester: 5, prerequisites: [13, 21], area: "Disciplinar", approved: false, grade: null }, // Prereq: Anatomía Animal II (13), Histopatología (21)
    { id: 29, name: "Gestión Ambiental y Desarrollo Sustentable", semester: 5, prerequisites: [23], area: "Disciplinar", approved: false, grade: null }, // Prereq: Conservación de Fauna Silvestre (23)
    { id: 30, name: "Gestión Contable y Financiera", semester: 5, prerequisites: [18], area: "Básica", approved: false, grade: null }, // Prereq: Bioestadística (18)
    { id: 31, name: "Electivo 4", semester: 5, prerequisites: [], area: "Electiva", approved: false, grade: null }, // Electivo

    // Semestre 6 - Área Formación Disciplinar
    { id: 32, name: "Semiología Veterinaria", semester: 6, prerequisites: [20, 28], area: "Disciplinar", approved: false, grade: null }, // Prereq: Etología y Bienestar Animal (20), Fisiopatología Veterinaria (28)
    { id: 33, name: "Reproducción Animal", semester: 6, prerequisites: [28], area: "Disciplinar", approved: false, grade: null }, // Prereq: Fisiopatología Veterinaria (28)
    { id: 34, name: "Anatomía Patológica", semester: 6, prerequisites: [28], area: "Disciplinar", approved: false, grade: null }, // Prereq: Fisiopatología Veterinaria (28)
    { id: 35, name: "Microbiología de los Alimentos", semester: 6, prerequisites: [22, 24], area: "Disciplinar", approved: false, grade: null }, // Prereq: Microbiología Veterinaria (22), Métodos de Investigación en Salud (24)
    { id: 36, name: "Práctica Intermedia", semester: 6, prerequisites: [16, 20], area: "Disciplinar", approved: false, grade: null }, // Prereq: Práctica Inicial (16), Etología y Bienestar Animal (20)
    { id: 37, name: "Electivo 5", semester: 6, prerequisites: [], area: "Electiva", approved: false, grade: null }, // Electivo

    // Semestre 7 - Área Formación Disciplinar
    { id: 38, name: "Sistemas de Producción Animal", semester: 7, prerequisites: [14, 26], area: "Disciplinar", approved: false, grade: null }, // Prereq: Nutrición y Alimentación Animal (14), Genética en Ciencias Veterinarias (26)
    { id: 39, name: "Farmacología Veterinaria", semester: 7, prerequisites: [28], area: "Disciplinar", approved: false, grade: null }, // Prereq: Fisiopatología Veterinaria (28)
    { id: 40, name: "Enfermedades Producidas por Agentes Biológicos I", semester: 7, prerequisites: [27, 35], area: "Disciplinar", approved: false, grade: null }, // Prereq: Epidemiología Veterinaria (27), Microbiología de los Alimentos (35)
    { id: 41, name: "Procedimientos Clínicos", semester: 7, prerequisites: [32], area: "Disciplinar", approved: false, grade: null }, // Prereq: Semiología Veterinaria (32)
    { id: 42, name: "Imagenología", semester: 7, prerequisites: [34], area: "Disciplinar", approved: false, grade: null }, // Prereq: Anatomía Patológica (34)
    { id: 43, name: "Inteligencia Artificial Aplicada a la Salud", semester: 7, prerequisites: [18], area: "Disciplinar", approved: false, grade: null }, // Prereq: Bioestadística (18)

    // Semestre 8 - Área Formación Disciplinar
    { id: 44, name: "Laboratorio Clínico y Biotecnología", semester: 8, prerequisites: [34, 40], area: "Disciplinar", approved: false, grade: null }, // Prereq: Anatomía Patológica (34), Enfermedades producidas por agentes biológicos I (40)
    { id: 45, name: "Investigación en Ciencias Veterinarias", semester: 8, prerequisites: [24], area: "Disciplinar", approved: false, grade: null }, // Prereq: Métodos de Investigación en Salud (24)
    { id: 46, name: "Enfermedades Producidas por Agentes Biológicos II", semester: 8, prerequisites: [40, 39], area: "Disciplinar", approved: false, grade: null }, // Prereq: Enfermedades producidas por agentes biológicos I (40), Farmacología Veterinaria (39)
    { id: 47, name: "Principios de Cirugía y Anestesiología", semester: 8, prerequisites: [39, 41], area: "Disciplinar", approved: false, grade: null }, // Prereq: Farmacología Veterinaria (39), Procedimientos Clínicos (41)
    { id: 48, name: "Medicina Interna", semester: 8, prerequisites: [32, 42], area: "Disciplinar", approved: false, grade: null }, // Prereq: Semiología Veterinaria (32), Imagenología (42)
    { id: 49, name: "Bioética", semester: 8, prerequisites: [], area: "Básica", approved: false, grade: null }, // Sin prerrequisitos explícitos

    // Semestre 9 - Área Formación Disciplinar
    { id: 50, name: "Salud Pública Veterinaria", semester: 9, prerequisites: [46], area: "Disciplinar", approved: false, grade: null }, // Prereq: Enfermedades producidas por agentes biológicos II (46)
    { id: 51, name: "Unidad de Investigación I", semester: 9, prerequisites: [45, 49], area: "Disciplinar", approved: false, grade: null }, // Prereq: Investigación en Ciencias Veterinarias (45), Bioética (49)
    { id: 52, name: "Internado de Pequeños Animales I", semester: 9, prerequisites: [44, 47, 48], area: "Disciplinar", approved: false, grade: null }, // Prereq: Laboratorio Clínico y Biotecnología (44), Principios de Cirugía y Anestesiología (47), Medicina Interna (48)
    { id: 53, name: "Internado de Animales Mayores I", semester: 9, prerequisites: [44, 47, 48], area: "Disciplinar", approved: false, grade: null }, // Prereq: Laboratorio Clínico y Biotecnología (44), Principios de Cirugía y Anestesiología (47), Medicina Interna (48)
    { id: 54, name: "Formulación y Evaluación de Proyectos Veterinarios", semester: 9, prerequisites: [30, 38], area: "Disciplinar", approved: false, grade: null }, // Prereq: Gestión Contable y Financiera (30), Sistemas de Producción Animal (38)
    { id: 55, name: "Gestión Veterinaria", semester: 9, prerequisites: [30, 38], area: "Disciplinar", approved: false, grade: null }, // Prereq: Gestión Contable y Financiera (30), Sistemas de Producción Animal (38)
    { id: 56, name: "Práctica Profesional", semester: 9, prerequisites: [], area: "Disciplinar", approved: false, grade: null }, // Prereq: Obtención de licenciatura (asumiendo que se debe haber completado un % significativo)

    // Semestre 10 - Área Formación Disciplinar
    { id: 57, name: "Una Salud", semester: 10, prerequisites: [50, 54], area: "Disciplinar", approved: false, grade: null }, // Prereq: Salud Pública Veterinaria (50), Formulación y Evaluación de Proyectos Veterinarios (54)
    { id: 58, name: "Unidad de Investigación II", semester: 10, prerequisites: [51], area: "Disciplinar", approved: false, grade: null }, // Prereq: Unidad de Investigación I (51)
    { id: 59, name: "Internado Electivo: Pequeños Animales II", semester: 10, prerequisites: [], area: "Disciplinar", approved: false, grade: null }, // Internado Electivo
    { id: 60, name: "Internado Electivo: Animales Mayores", semester: 10, prerequisites: [], area: "Disciplinar", approved: false, grade: null }, // Internado Electivo
    { id: 61, name: "Internado Electivo: Conservación, Biodiversidad y Medio Ambiente", semester: 10, prerequisites: [], area: "Disciplinar", approved: false, grade: null }, // Internado Electivo
    { id: 62, name: "Internado Electivo: Producción y Sistemas de Aseguramiento de la Calidad", semester: 10, prerequisites: [], area: "Disciplinar", approved: false, grade: null }, // Internado Electivo
    { id: 63, name: "Orientación Laboral y Responsabilidad Ética en Medicina Veterinaria", semester: 10, prerequisites: [36], area: "Disciplinar", approved: false, grade: null }, // Prereq: Práctica Intermedia (36)
];
