export type SeedExerciseType = "MCQ" | "NUMERIC" | "DRAG";

export interface SeedExercise {
  id: string;
  type: SeedExerciseType;
  prompt: string;
  data: Record<string, unknown>;
  solution: Record<string, unknown>;
  difficulty: number;
  skillCode: string;
}

export interface SeedUnit {
  slug: string;
  title: string;
  order: number;
  lessons: {
    slug: string;
    title: string;
    skillCodes: string[];
    exercises: SeedExercise[];
  }[];
}

export const seedUnits: SeedUnit[] = [
  {
    slug: "nombres-et-calculs",
    title: "Nombres & calculs",
    order: 1,
    lessons: [
      {
        slug: "operations-mentales",
        title: "Opérations mentales",
        skillCodes: ["NC-ADD-INT", "NC-SUB-INT"],
        exercises: [
          {
            id: "seed-ex-001",
            type: "MCQ" as const,
            prompt: "Choisis le bon résultat : 38 + 27 = ?",
            data: {
              options: ["55", "65", "75", "85"],
              hints: ["Additionne séparément dizaines et unités."],
            },
            solution: {
              answer: "65",
              feedbackCorrect: "Super ! 38 + 27 = 65.",
              feedbackWrong: "Pense à additionner 30 + 20 puis 8 + 7.",
            },
            difficulty: 1,
            skillCode: "NC-ADD-INT",
          },
          {
            id: "seed-ex-002",
            type: "NUMERIC" as const,
            prompt: "Calcule 94 - 58",
            data: {
              tolerance: 0,
              hints: ["Emprunte une dizaine."],
            },
            solution: {
              value: 36,
              feedbackCorrect: "Exact, 94 - 58 = 36.",
              feedbackWrong: "Vérifie l'emprunt sur les unités.",
            },
            difficulty: 1,
            skillCode: "NC-SUB-INT",
          },
          {
            id: "seed-ex-003",
            type: "DRAG" as const,
            prompt: "Associe fraction et écriture décimale",
            data: {
              pairs: [
                { left: "1/5", right: "0,2" },
                { left: "2/5", right: "0,4" },
                { left: "4/5", right: "0,8" },
              ],
              hints: ["Divise le numérateur par le dénominateur."],
            },
            solution: {
              matches: [
                ["1/5", "0,2"],
                ["2/5", "0,4"],
                ["4/5", "0,8"],
              ],
              feedbackCorrect: "Bien joué !",
              feedbackWrong: "Révise la conversion fraction → décimal.",
            },
            difficulty: 2,
            skillCode: "NC-FRAC-INTRO",
          },
        ],
      },
      {
        slug: "fractions-visualisation",
        title: "Fractions en images",
        skillCodes: ["NC-FRAC-INTRO"],
        exercises: [
          {
            id: "seed-ex-004",
            type: "MCQ" as const,
            prompt: "Quelle figure représente 3/4 ?",
            data: {
              options: ["Un carré partagé en 4, 3 coloriés", "Une bande partagée en 5"],
              hints: ["Regarde le nombre de parts égales."],
            },
            solution: {
              answer: "Un carré partagé en 4, 3 coloriés",
              feedbackCorrect: "Bravo !",
              feedbackWrong: "Compte les parts égales et coloriées.",
            },
            difficulty: 1,
            skillCode: "NC-FRAC-INTRO",
          },
        ],
      },
    ],
  },
  {
    slug: "grandeurs-mesures",
    title: "Grandeurs & mesures",
    order: 2,
    lessons: [
      {
        slug: "conversions-longueurs",
        title: "Conversions de longueurs",
        skillCodes: ["GM-LEN-CONV"],
        exercises: [
          {
            id: "seed-ex-101",
            type: "NUMERIC" as const,
            prompt: "Convertis 2,5 m en cm",
            data: {
              tolerance: 0,
              hints: ["1 m = 100 cm"],
            },
            solution: {
              value: 250,
              feedbackCorrect: "Yes ! 2,5 m = 250 cm.",
              feedbackWrong: "Multiplie par 100.",
            },
            difficulty: 1,
            skillCode: "GM-LEN-CONV",
          },
          {
            id: "seed-ex-102",
            type: "MCQ" as const,
            prompt: "Quel périmètre pour un rectangle 5 cm x 8 cm ?",
            data: {
              options: ["26 cm", "40 cm", "48 cm"],
            },
            solution: {
              answer: "26 cm",
              feedbackCorrect: "Parfait ! 2*(5+8) = 26 cm.",
              feedbackWrong: "Ajoute les côtés puis multiplie par 2.",
            },
            difficulty: 2,
            skillCode: "GM-AREA-BASIC",
          },
        ],
      },
      {
        slug: "mesure-angles",
        title: "Mesure d'angles",
        skillCodes: ["GM-ANGLE-MEASURE"],
        exercises: [
          {
            id: "seed-ex-103",
            type: "MCQ" as const,
            prompt: "Un angle droit mesure ?",
            data: {
              options: ["45°", "90°", "180°"],
            },
            solution: {
              answer: "90°",
              feedbackCorrect: "Exact !",
              feedbackWrong: "Rappelle-toi de l'angle du coin d'un cahier.",
            },
            difficulty: 1,
            skillCode: "GM-ANGLE-MEASURE",
          },
        ],
      },
    ],
  },
];
