export function About() {
  return (
    <div className="flex justify-center items-center  text-violet-700  mx-4 my-4 mb-32 sm:mb-16">
      <div>
        <p className="text-violet-700 text-xl">
          <span className="font-bold text-violet-700 text-xl">
            Este site é parte de um projeto de aprendizado em desenvolvimento
            web
          </span>
          , criado para aprofundar meus conhecimentos e habilidades práticas com
          uma stack moderna. Para isso, utilizei tecnologias de ponta para
          construir uma aplicação completa, que integra front-end, back-end e
          persistência de dados.
        </p>
        <br />
        <p className="text-violet-700 text-xl">
          <span className="font-bold text-violet-700 text-xl">
            Tecnologias Utilizadas:
          </span>
          <br />
          <span className="font-bold text-violet-700 text-xl">
            Front-end com React e TypeScript:
          </span>
          <br />A interface é construída com React e TypeScript, que ajudam a
          manter o código organizado e o desenvolvimento mais seguro com
          tipagens explícitas. Com o React Router, criei uma navegação dinâmica
          e intuitiva, que inclui páginas para listar todas as receitas,
          visualizar uma receita específica, e adicionar novas receitas. Cada
          rota carrega apenas os dados necessários para a página, proporcionando
          uma navegação rápida e eficiente.
        </p>
        <br />
        <p className="text-violet-700 text-xl">
          <span className="font-bold text-violet-700 text-xl">
            Back-end com Node.js e Express:
          </span>
          <br />
          No servidor, utilizei o Node.js com Express para construir uma API que
          gerencia e disponibiliza as receitas. As rotas permitem criar,
          acessar, e exibir detalhes de receitas, o servidor se comunica
          diretamente com o front-end e garante o recebimento e envio de dados
          no formato JSON.
        </p>
        <br />
        <p className="text-violet-700 text-xl">
          <span className="font-bold text-violet-700 text-xl">
            Roteamento e Navegação:
          </span>
          <br />
          Com o React Router, a navegação fica bem mais fluida, permitindo que
          cada página carregue só o que precisa na hora certa. usando actions e
          loaders que ajudam a garantir que as informações mais recentes já
          estejam lá quando a rota abre. Essa combinação deixa o site mais
          dinâmico e próximo de um sistema real, proporcionando uma experiência
          sólida tanto para quem usa quanto para quem desenvolve.
        </p>
      </div>
    </div>
  );
}
