export type Items = {
  name: string;
  path: string;
};

export const navBarItems: Items[] = [
  {
    name: "Criar Receita",
    path: "/new-recipe",
  },
  {
    name: "Receitas",
    path: "/all-recipes",
  },
  {
    name: "Sobre",
    path: "/about",
  },
  {
    name: "Inicio",
    path: "/",
  },
];
