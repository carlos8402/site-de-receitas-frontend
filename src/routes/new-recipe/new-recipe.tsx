import axios from "axios";
import { useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";

// Tipos para os dados da receita
type Ingrediente = {
  nome: string;
  quantidade: string;
};

type NewRecipeActionData = {
  error?: string;
};

// Função de ação para enviar a receita para a API
export const newRecipeAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const titulo = formData.get("titulo") as string;
  const descricao = formData.get("descricao") as string;
  const tipo = formData.get("tipo") as string;
  const foto = formData.get("foto") as string;

  // Converter ingredientes e modo de preparo
  const ingredientesString = formData.get("ingredientes") as string;
  const ingredientes: Ingrediente[] = ingredientesString
    ? JSON.parse(ingredientesString)
    : [];

  const modoPreparoString = formData.get("modo_preparo") as string;
  const modoPreparo: string[] = modoPreparoString
    ? modoPreparoString.split("\n")
    : [];

  if (
    !titulo ||
    !descricao ||
    !tipo ||
    !foto ||
    ingredientes.length === 0 ||
    modoPreparo.length === 0
  ) {
    return {
      error:
        "Todos os campos são obrigatórios, incluindo ingredientes e modo de preparo.",
    };
  }

  try {
    const response = await axios.post("http://localhost:3000/recipes", {
      titulo,
      descricao,
      tipo,
      foto,
      ingredientes,
      modo_preparo: modoPreparo,
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
  const actionData = useActionData<NewRecipeActionData>();
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
    { nome: "", quantidade: "" },
  ]);
  const [modoPreparo, setModoPreparo] = useState<string[]>([""]);

  // Adicionar um novo ingrediente
  const adicionarIngrediente = () => {
    setIngredientes([...ingredientes, { nome: "", quantidade: "" }]);
  };

  // Remover um ingrediente
  const removerIngrediente = (index: number) => {
    const newIngredientes = ingredientes.filter((_, i) => i !== index);
    setIngredientes(newIngredientes);
  };

  // Atualizar um ingrediente
  const atualizarIngrediente = (
    index: number,
    field: keyof Ingrediente,
    value: string
  ) => {
    const newIngredientes = ingredientes.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
    );
    setIngredientes(newIngredientes);
  };

  // Adicionar um novo passo no modo de preparo
  const adicionarModoPreparo = () => {
    setModoPreparo([...modoPreparo, ""]);
  };

  // Remover um passo do modo de preparo
  const removerModoPreparo = (index: number) => {
    const newModoPreparo = modoPreparo.filter((_, i) => i !== index);
    setModoPreparo(newModoPreparo);
  };

  // Atualizar o valor de um passo no modo de preparo
  const atualizarModoPreparo = (index: number, value: string) => {
    const newModoPreparo = modoPreparo.map((passo, i) =>
      i === index ? value : passo
    );
    setModoPreparo(newModoPreparo);
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
            name="titulo"
            placeholder="Título da receita"
            className="p-2"
          />
          <input
            type="text"
            name="descricao"
            placeholder="Descrição da receita"
            className="p-2"
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo de receita (ex: Sobremesa)"
            className="p-2"
          />
          <input
            type="text"
            name="foto"
            placeholder="URL da foto"
            className="p-2"
          />

          {/* Ingredientes */}
          <div className="w-full">
            <label className="text-white">Ingredientes:</label>
            {ingredientes.map((ingrediente, index) => (
              <div key={index} className="flex flex-col gap-2">
                <input
                  type="text"
                  value={ingrediente.nome}
                  onChange={(e) =>
                    atualizarIngrediente(index, "nome", e.target.value)
                  }
                  placeholder={`Ingrediente ${index + 1}`}
                  className="p-2"
                />
                <input
                  type="text"
                  value={ingrediente.quantidade}
                  onChange={(e) =>
                    atualizarIngrediente(index, "quantidade", e.target.value)
                  }
                  placeholder="Quantidade"
                  className="p-2"
                />
                <button
                  type="button"
                  onClick={() => removerIngrediente(index)}
                  className="bg-red-500 text-white px-2"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={adicionarIngrediente}
              className="bg-violet-600 text-white px-4 mt-2"
            >
              Adicionar Ingrediente
            </button>

            {/* Campo oculto para enviar ingredientes como string JSON */}
            <input
              type="hidden"
              name="ingredientes"
              value={JSON.stringify(ingredientes)}
            />
          </div>

          {/* Modo de Preparo */}
          <div className="w-full">
            <label className="text-white">Modo de Preparo:</label>
            {modoPreparo.map((passo, index) => (
              <div key={index} className="flex flex-col gap-2">
                <textarea
                  value={passo}
                  onChange={(e) => atualizarModoPreparo(index, e.target.value)}
                  placeholder={`Passo ${index + 1}`}
                  className="p-2"
                />
                <button
                  type="button"
                  onClick={() => removerModoPreparo(index)}
                  className="bg-red-500 text-white px-2"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={adicionarModoPreparo}
              className="bg-violet-600 text-white px-4 mt-2"
            >
              Adicionar Passo
            </button>

            {/* Campo escondido para enviar o modo de preparo como string */}
            <input
              type="hidden"
              name="modo_preparo"
              value={modoPreparo.join("\n")}
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
