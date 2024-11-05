import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";

export type Recipe = {
  id: number;
  title: string;
  description: string;
  preparation: string[];
  type: string;
  photo: string;
};

export async function recipesLoader() {
  const response = await axios.get("http://localhost:3000/recipes");
  return response.data.recipes as Recipe[];
}

export function AllRecipes() {
  const recipes = useLoaderData() as Recipe[];

  return (
    <div className="px-2 my-4  mb-32 sm:mb-16">
      <ul className="text-center sm:grid grid-cols-2 gap-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link className="" to={`/recipe/${recipe.id}`}>
              <img
                className="w-full h-52 object-cover"
                src={recipe.photo}
                alt={recipe.title}
              />
              <div>
                <p className="text-xl text-violet-700 font-bold my-2">
                  {recipe.title}
                </p>
                <p className="text-lg text-violet-600 mb-6">
                  {recipe.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
