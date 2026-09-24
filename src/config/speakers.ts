export interface Speaker {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  sessionTitle: string;
  topics?: string[];
  description: string;
  image: string;
  isChiefGuest?: boolean;
  isTBA?: boolean;
}

export const SPEAKERS: Speaker[] = [
  {
    id: "dr-imran-mahmud",
    name: "Dr. Imran Mahmud",
    role: "Professor & Head",
    affiliation: "Department of Software Engineering, Faculty of Science and IT, DIU",
    sessionTitle: "Artificial Intelligence in Education and Research",
    description:
      "A visionary academic leader exploring the transformative role of AI across modern education, cutting-edge software research, and preparing students for the next generation of technological frontiers.",
    image: "/speakers/Dr._Imran_mahmud.jpeg",
    isChiefGuest: true,
  },
  {
    id: "sabbir-sarkar",
    name: "Sabbir Sarkar",
    role: "Founder, EnglishA2Z",
    affiliation: "Cambridge CELTA Certified Master Trainer",
    sessionTitle: "Communication, Confidence & Professional Development",
    topics: [
      "Mastering the Art of Presentation",
      "Discover a Better You",
      "AI Integration in Education & Corporate Life",
      "CV & Professional Email Writing",
    ],
    description:
      "A renowned educator dedicated to equipping university students and emerging leaders with persuasive presentation mastery, workplace communication excellence, and high-impact career readiness.",
    image: "/speakers/Sabbir_Sarkar.jpeg",
  },
];
