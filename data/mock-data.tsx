import type { ReactNode } from "react";

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

export const FRIENDS: { name: string; count: number; seed: string }[] = [
  { name: "Priscilaaa", count: 485, seed: "a" },
  { name: "Júlia", count: 120, seed: "b" },
  { name: "Rafa", count: 88, seed: "c" },
  { name: "Lucas", count: 64, seed: "d" },
  { name: "Marina", count: 52, seed: "e" },
  { name: "Pedro", count: 41, seed: "f" },
  { name: "Ana", count: 33, seed: "g" },
  { name: "Bruno", count: 29, seed: "h" },
  { name: "Camila", count: 22, seed: "i" },
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
