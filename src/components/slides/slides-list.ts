import { Slides } from "./slides";

export type Slides = {
  name?: string;
  url: string;
  alt: string;
};

export const slidesList: Slides[] = [
  { name: "Strogonoff",
    url: "img/strogonoff.jpg",
    alt: "imagem da receita de strogonoff",
  },
  {
    name: "Enroladinho de Salsicha",
    url: "img/enroladinho-de-salsicha.webp",
    alt: "imagem da receita do enroladinho de salsicha",
  },
  {
    name: "Escondidinho",
    url: "img/escondidinho.jpg",
    alt: "imagem da receita de escondidinho",
  },
  {
    name: "Lasanha",
    url: "img/lasanha.jpg",
    alt: "imagem da receita de lasanha",
  },
  {
    name: "Pao Pizza",
    url: "img/paoPizza.webp",
    alt: "imagem da receita de pão pizza",
  },
];
