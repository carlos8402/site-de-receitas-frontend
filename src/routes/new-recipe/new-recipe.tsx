import axios from "axios";
import { useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  ActionFunctionArgs,
} from "react-router-dom";

// Tipos para os dados da receita
type Ingredient = {
  name: string;
  quant: string;
};

type NewRecipeActionData = {
  error?: string;
};

// Função de ação para enviar a receita para a API
export const newRecipeAction = async ({
  request,
}: ActionFunctionArgs): Promise<NewRecipeActionData | Response> => {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const photo = formData.get("photo") as string;

  const ingredientsString = formData.get("ingredients") as string;
  const ingredients: Ingredient[] = ingredientsString
    ? JSON.parse(ingredientsString)
    : [];

  const preparationString = formData.get("preparation") as string;
  const preparation: string[] = preparationString
    ? preparationString.split("\n")
    : [];

  if (
    !title ||
    !description ||
    !type ||
    !photo ||
    ingredients.length === 0 ||
    preparation.length === 0
  ) {
    return {
      error:
        "Todos os campos são obrigatórios, incluindo ingredientes e modo de preparo.",
    };
  }

  try {
    const response = await axios.post("http://localhost:3000/recipes", {
      title,
      description,
      type,
      photo,
      ingredients,
      preparation,
    });

    if (response.status === 201) {
      return redirect("http://localhost:5173/all-recipes");
    } else {
      return { error: "Erro ao criar a receita" };
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    return { error: "Erro de rede ou servidor. Tente novamente mais tarde." };
  }
};

// Componente para criar nova receita
export function NewRecipe() {
  const actionData = useActionData() as NewRecipeActionData;
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quant: "" },
  ]);
  const [preparation, setPreparation] = useState<string[]>([""]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quant: "" }]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const newIngredients = ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
    );
    setIngredients(newIngredients);
  };

  const addPreparation = () => {
    setPreparation([...preparation, ""]);
  };

  const removePreparation = (index: number) => {
    const newPreparation = preparation.filter((_, i) => i !== index);
    setPreparation(newPreparation);
  };

  const updatePreparation = (index: number, value: string) => {
    const newPreparation = preparation.map((passo, i) =>
      i === index ? value : passo
    );
    setPreparation(newPreparation);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-violet-2004 mx-2 my-10 mb-32 sm:mb-16">
      <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] xl:max-w-[700px] bg-violet-500 px-2">
        <h1 className="text-xl text-white text-center my-5 font-bold">
          Nova Receita
        </h1>
        {actionData?.error && (
          <p className="text-red-600 text-base text-center mb-4 font-bold">
            {actionData.error}
          </p>
        )}
        <Form method="POST" className="flex flex-col items-center gap-4">
          <input
            type="text"
            name="title"
            placeholder="Título da receita"
            className="p-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição da receita"
            className="p-2"
          />
          <input
            type="text"
            name="type"
            placeholder="Tipo de receita (ex: Sobremesa)"
            className="p-2"
          />
          <input
            type="text"
            name="photo"
            placeholder="URL da foto"
            className="p-2"
          />

          {/* Ingredientes */}
          <div className="w-full">
            <label className="text-white">Ingredientes:</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex flex-col gap-2">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    updateIngredient(index, "name", e.target.value)
                  }
                  placeholder={`Ingrediente ${index + 1}`}
                  className="p-2"
                />
                <input
                  type="text"
                  value={ingredient.quant}
                  onChange={(e) =>
                    updateIngredient(index, "quant", e.target.value)
                  }
                  placeholder="Quantidade"
                  className="p-2"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="bg-red-500 text-white px-2"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="bg-violet-600 text-white px-4 mt-2"
            >
              Adicionar Ingrediente
            </button>

            {/* Campo oculto para enviar ingredientes como string JSON */}
            <input
              type="hidden"
              name="ingredients"
              value={JSON.stringify(ingredients)}
            />
          </div>

          {/* Modo de Preparo */}
          <div className="w-full">
            <label className="text-white">Modo de Preparo:</label>
            {preparation.map((passo, index) => (
              <div key={index} className="flex flex-col gap-2">
                <textarea
                  value={passo}
                  onChange={(e) => updatePreparation(index, e.target.value)}
                  placeholder={`Passo ${index + 1}`}
                  className="p-2"
                />
                <button
                  type="button"
                  onClick={() => removePreparation(index)}
                  className="bg-red-500 text-white px-2"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPreparation}
              className="bg-violet-600 text-white px-4 mt-2"
            >
              Adicionar Passo
            </button>

            {/* Campo escondido para enviar o modo de preparo como string */}
            <input
              type="hidden"
              name="preparation"
              value={preparation.join("\n")}
            />
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 mb-6">
            Criar Receita
          </button>
        </Form>
      </div>
    </div>
  );
}
