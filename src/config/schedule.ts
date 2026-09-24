export interface ScheduleItem {
  time?: string;
  title: string;
  description: string;
  speaker?: string;
}

export const SCHEDULE: ScheduleItem[] = [
  {
    time: "Morning",
    title: "Registration, Check-in & Welcome Kit",
    description: "Participant check-in, verification of credentials, and package distribution.",
  },
  {
    time: "Session I",
    title: "Inaugural Ceremony & Opening Remarks",
    description: "Welcome address by club leaders and introduction to the GENESIS vision.",
  },
  {
    time: "Session II",
    title: "Artificial Intelligence in Education and Research",
    speaker: "Dr. Imran Mahmud",
    description: "Empowering academic excellence, intelligent tools, and modern research methodologies.",
  },
  {
    time: "Session III",
    title: "Communication, Confidence & Professional Development",
    speaker: "Sabbir Sarkar",
    description: "Mastering presentation arts, professional email/CV writing, and workplace confidence.",
  },
  {
    time: "Midday",
    title: "Cultural Showcase & Artistic Reflection",
    description: "Celebrating shared creativity, fellowship, and inspirational artistic performance.",
  },
  {
    time: "Afternoon",
    title: "Networking Lunch & Fellowship Exchange",
    description: "Connect with university peers, esteemed trainers, and fellow Rotaract members over lunch.",
  },
  {
    time: "Closing",
    title: "Valedictory & Certificate Overview",
    description: "Closing remarks, vote of thanks, and details on attendance-verified e-certificates.",
  },
];
