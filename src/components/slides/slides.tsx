import { useState, useEffect } from "react";

// Define o tipo dos slides
type Slide = {
  url: string;
  alt: string;
}

// Importa a lista de slides com o tipo Slide[]
import { slidesList } from "./slides-list";

export function Slides() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Avança o índice a cada 4 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slidesList.length);
    }, 4000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  function goToSlide(index: number) {
    setActiveIndex(index);
  }

  return (
    <div className="flex-1 relative border-none basis-96">
      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slidesList.map((item: Slide, index: number) => (
            <li
              key={index}
              className="min-w-full flex justify-center items-center"
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-96 rounded-md shadow-lg object-cover"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center mt-4">
        {slidesList.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === activeIndex ? "bg-violet-700" : "bg-violet-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}