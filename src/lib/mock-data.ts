export type DareCategory = "Fun" | "Social" | "Creative" | "Video" | "Public";
export type DareStatus = "open" | "pending" | "completed" | "expired";

export interface Dare {
  id: string;
  title: string;
  description: string;
  category: DareCategory;
  reward: number;
  status: DareStatus;
  proofRequirement: string;
  createdBy: string;
}

export const mockDares: Dare[] = [
  {
    id: "1",
    title: "Eat a spoonful of hot sauce",
    description: "Film yourself eating a full teaspoon of your spiciest hot sauce without drinking anything for 30 seconds.",
    category: "Fun",
    reward: 15,
    status: "open",
    proofRequirement: "Upload a video of yourself completing the dare from start to finish.",
    createdBy: "Jake R.",
  },
  {
    id: "2",
    title: "Compliment 5 strangers",
    description: "Record yourself giving genuine compliments to 5 different strangers in a public place.",
    category: "Social",
    reward: 30,
    status: "open",
    proofRequirement: "Upload a video showing all 5 interactions.",
    createdBy: "Maria L.",
  },
  {
    id: "3",
    title: "Draw a portrait in 60 seconds",
    description: "Draw a recognisable portrait of any person and submit a photo of the final result.",
    category: "Creative",
    reward: 10,
    status: "open",
    proofRequirement: "Upload a photo of your drawing with a timer visible.",
    createdBy: "Sam T.",
  },
  {
    id: "4",
    title: "Sing a song in a coffee shop",
    description: "Sing any song out loud in a coffee shop or cafe for at least 30 seconds.",
    category: "Public",
    reward: 50,
    status: "open",
    proofRequirement: "Upload a video of the performance.",
    createdBy: "Chris P.",
  },
  {
    id: "5",
    title: "Do a 60-second product review",
    description: "Record a 60-second honest video review of any product you own.",
    category: "Video",
    reward: 20,
    status: "open",
    proofRequirement: "Upload the full 60-second video.",
    createdBy: "Taylor M.",
  },
  {
    id: "6",
    title: "Learn and perform a magic trick",
    description: "Learn a simple card or coin magic trick and film yourself performing it for someone.",
    category: "Fun",
    reward: 25,
    status: "open",
    proofRequirement: "Upload a video of you performing the trick.",
    createdBy: "Jordan K.",
  },
  {
    id: "7",
    title: "Start a conversation with a stranger",
    description: "Walk up to a random stranger and have a genuine 2-minute conversation about anything.",
    category: "Social",
    reward: 35,
    status: "open",
    proofRequirement: "Upload a video of the conversation (with consent).",
    createdBy: "Alex M.",
  },
  {
    id: "8",
    title: "Paint something abstract in 10 minutes",
    description: "Create an abstract painting using any medium in under 10 minutes and photograph it.",
    category: "Creative",
    reward: 15,
    status: "open",
    proofRequirement: "Upload a photo of the final painting.",
    createdBy: "Dana W.",
  },
];
