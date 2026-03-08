import { Character, Story } from "@/types";

export const fallbackStories: Story[] = [
  {
    id: "1",
    title: "A Jornada da Arara Azul",
    summary: "Uma aventura sobre amizade e preservação do Cerrado.",
    content:
      "Luna, uma arara azul curiosa, descobre como pequenas atitudes ajudam a proteger as nascentes do Cerrado.",
    category: "Infantil",
    image_url: null,
    published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Segredos do Pequizeiro",
    summary: "História tradicional sobre frutos, cultura e território.",
    content:
      "Uma família aprende com os anciãos da comunidade a respeitar o tempo da colheita e a biodiversidade local.",
    category: "Cultura",
    image_url: null,
    published: true,
    created_at: new Date().toISOString()
  }
];

export const fallbackCharacters: Character[] = [
  {
    id: "1",
    name: "Luna",
    species: "Arara-azul",
    region: "Chapada",
    description: "Mensageira da preservação das árvores do Cerrado.",
    image_url: null,
    conservation_status: "Vulnerável",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Tico",
    species: "Lobo-guará",
    region: "Veredas",
    description: "Guardião das trilhas e das sementes nativas.",
    image_url: null,
    conservation_status: "Quase ameaçado",
    created_at: new Date().toISOString()
  }
];
