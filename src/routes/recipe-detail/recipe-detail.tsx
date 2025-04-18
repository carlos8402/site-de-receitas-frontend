import axios from "axios";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

export type Recipe = {
  id: number;
  titulo: string;
  descricao: string;
  ingredientes: { nome: string; quantidade: string }[];
  modo_preparo: string[];
  tipo: string;
  foto: string;
};

export async function recipeDetailLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const response = await axios.get(
    `https://site-de-receitas-backend.onrender.com/recipes/${id}`
  );
  return response.data as Recipe;
}

export function RecipeDetail() {
  const recipe = useLoaderData() as Recipe;

  return (
    <div className="mx-2 my-4 mb-32 sm:mb-16">
      <h1 className="text-xl text-center text-violet-800 font-bold my-2 sm:my-3 md:my-5 lg:my-10 ">
        {recipe.titulo}
      </h1>
      <div className="flex flex-col items-center justify-center">
        <img
          className="w-full h-52 object-cover sm:h-64 md:h-[400px] lg:h-[400px]  lg:w-[900px]"
          src={recipe.foto}
          alt={recipe.titulo}
        />
        <p className="text-lg text-violet-800 my-2 sm:my-2 md:my-4 lg:my-6">
          {recipe.descricao}
        </p>
      </div>
      <div className="lg:flex lg:justify-around sm:my-3  md:my-6 lg:my-8 lg:bg-violet-200 lg:w-full lg:py-4">
        <div>
          <h2 className="text-xl text-center text-violet-500 font-bold md:mb-3 lg:mb-5">
            Ingredientes:
          </h2>
          <ul className="mx-1 mb-3 mt-3 sm:mx-3 md:mx-5 flex flex-col gap-2">
            {recipe.ingredientes.map((ingrediente, index) => (
              <li className="text-lg text-violet-600" key={index}>
                <span className="text-base mr-1 text-violet-600 font-bold bg-violet-200 px-1 rounded-sm">
                  {ingrediente.quantidade}{" "}
                </span>
                {ingrediente.nome}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-[50%]">
          <h2 className="text-xl text-center text-violet-500 font-bold mb-5 ">
            Modo de Preparo
          </h2>
          <ol className="text-lg text-violet-600 lg:flex lg:flex-col lg:gap-4 list-decimal pl-5">
            {recipe.modo_preparo.map((passo, index) => (
              <li key={index}>{passo}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
