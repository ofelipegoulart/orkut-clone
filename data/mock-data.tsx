import type { ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarSeed: string;
};

export const CURRENT_USER: User = {
  id: "x7Kp2mNq",
  name: "Felipe",
  email: "ofelipegoulart@gmail.com",
  avatarSeed: "profile-main",
};

export const PROFILE_ROWS: { label: string; value: ReactNode }[] = [
  { label: "relacionamento:", value: "solteiro(a)" },
  { label: "aniversário:", value: "15 de julho" },
  { label: "idade:", value: "20" },
  { label: "cidade natal:", value: <a className="text-[#003399] underline">tangara da serra</a> },
  {
    label: "quem sou eu:",
    value:
      "Sou estudante, curto música, cinema e passar tempo com os amigos. No orkut pra trocar ideia, conhecer gente nova e participar das comunidades que curto.",
  },
  { label: "fumo:", value: "não" },
  { label: "bebo:", value: "socialmente" },
  { label: "moro:", value: "com os pais" },
  { label: "página web:", value: <a className="text-[#003399] underline">http://</a> },
];

export const FRIENDS: { id: string; name: string; count: number; seed: string }[] = [
  { id: "aB3cD4eF", name: "Priscilaaa", count: 485, seed: "a" },
  { id: "gH5iJ6kL", name: "Júlia", count: 120, seed: "b" },
  { id: "mN7oP8qR", name: "Rafa", count: 88, seed: "c" },
  { id: "sT9uV0wX", name: "Lucas", count: 64, seed: "d" },
  { id: "yZ1aB2cD", name: "Marina", count: 52, seed: "e" },
  { id: "eF3gH4iJ", name: "Pedro", count: 41, seed: "f" },
  { id: "kL5mN6oP", name: "Ana", count: 33, seed: "g" },
  { id: "qR7sT8uV", name: "Bruno", count: 29, seed: "h" },
  { id: "wX9yZ0aB", name: "Camila", count: 22, seed: "i" },
];

export const COMMUNITIES: { name: string; seed: string }[] = [
  { name: "As Ninas de...", seed: "1" },
  { name: "Só faço...", seed: "2" },
  { name: "Anime-Sai", seed: "3" },
  { name: "Rock BR", seed: "4" },
  { name: "Cinema", seed: "5" },
  { name: "Dev Web", seed: "6" },
  { name: "Futebol", seed: "7" },
  { name: "Música MPB", seed: "8" },
  { name: "Games", seed: "9" },
];

export const ORKUT_MENU_ICONS = {
  perfil: "/icons/p_profile.gif",
  recados: "/icons/p_scrap.gif",
  fotos: "/icons/p_camera.gif",
  videos: "/icons/p_video.gif",
  depoimentos: "/icons/p_pen.png",
  fans: "/icons/p_fan.png",
} as const;

export const MOCK_RECADOS: { id: string; authorId: string; author: string; authorSeed: string; content: string; timestamp: string }[] = [
  {
    id: "1",
    authorId: "cD1eF2gH",
    author: "Miles Alexander",
    authorSeed: "miles",
    content: "Yo, let's grab dinner later tonight at the pizza place near my house. Sound good?",
    timestamp: "11:43 am (2½ hours ago)",
  },
  {
    id: "2",
    authorId: "iJ3kL4mN",
    author: "Sofia Santos",
    authorSeed: "sofia",
    content: "Adorei aquele vídeo que você mandou! Hilário demais 😂",
    timestamp: "3:20 pm (hoje)",
  },
  {
    id: "3",
    authorId: "aB3cD4eF",
    author: "Priscila Silva",
    authorSeed: "priscila",
    content: "Vamos de cinema no fim de semana? Tem um filme novo legal saindo!",
    timestamp: "5:45 pm (ontem)",
  },
  {
    id: "4",
    authorId: "sT9uV0wX",
    author: "Lucas Oliveira",
    authorSeed: "lucas",
    content: "Que roupa legal! Aonde você arrumou?",
    timestamp: "8:15 am (ontem)",
  },
  {
    id: "5",
    authorId: "yZ1aB2cD",
    author: "Marina Costa",
    authorSeed: "marina",
    content: "Encontrei essas fotos nossas de quando fomos na praia. Quer que eu mande?",
    timestamp: "2:30 pm (2 dias atrás)",
  },
];