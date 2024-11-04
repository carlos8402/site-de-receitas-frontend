import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Home } from "./routes/home/home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NewRecipe, newRecipeAction } from "./routes/new-recipe/new-recipe.tsx";
import {
  AllRecipes,
  recipesLoader,
} from "./routes/all-recipes/all-recipes.tsx";
import { About } from "./routes/about/about.tsx";
import { Primary } from "./routes/primary/primary.tsx";
import {
  RecipeDetail,
  recipeDetailLoader,
} from "./routes/recipe-detail/recipe-detail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Primary />,
      },

      {
        path: "new-recipe",
        element: <NewRecipe />,
        action: newRecipeAction,
      },
      {
        path: "all-recipes",
        element: <AllRecipes />,
        loader: recipesLoader,
      },
      {
        path: "recipe/:id",
        element: <RecipeDetail />,
        loader: recipeDetailLoader,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
