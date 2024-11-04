import { Slides } from "../../components/slides";

export function Primary() {
  return (
    <div className=" relative px-2   mb-32 sm:mb-16 ">
      <h1 className="text-center  text-violet-700  pt-8 pb-4 text-2xl font-bold ">
        Bem-vindos ao "Livro de Receitas da Tia Maria
      </h1>
      <div className="flex flex-wrap items-start gap-1 m-3  py-4 ">
        <ul className="flex-1 relative basis-96 ">
          <li>
            <p className=" px-3 text-violet-700 text-xl">
              Este site é o seu cantinho especial para descobrir receitas que
              trazem o sabor da tradição e o conforto dos pratos caseiros. Aqui,
              cada receita foi pensada para proporcionar momentos deliciosos e
              memoráveis na sua cozinha.
            </p>
          </li>
          <li>
            <p className="p-3  text-violet-700  text-xl">
              A Tia Maria sempre acreditou que cozinhar é uma forma de expressar
              amor, e é exatamente isso que queremos compartilhar com você.
              Navegue pelas nossas receitas, desde as mais simples para o dia a
              dia até aquelas perfeitas para ocasiões especiais. Cada prato é um
              convite para trazer um pouco do calor da nossa cozinha para a sua.
            </p>
          </li>
          <li>
            <p className="p-3  text-violet-700  text-xl">
              Explore,experimente e compartilhe essas delícias com quem você
              ama. Seja bem-vindo à nossa mesa virtual! Com carinho,
            </p>
            <span className="p-3 text-violet-800  font-bold text-xl">
              Tia Maria
            </span>
          </li>
        </ul>
        <Slides />
      </div>
    </div>
  );
}
