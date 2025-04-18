import { useState } from "react";
import { Logo } from "../logo/logo";
import { navBarItems } from "../nav-list-items";

import { Link } from "react-router-dom";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center border-t  border-b border-violet-300 bg-violet-200 mt-4  py-2 px-8">
      <Logo />
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
              fixed  bottom-16 z-50 inset-x-0 mx-auto px-2 max-w-fit  sm:static sm:mx-0 md:hidden lg:hidden
              px-4 py-2 rounded text-white transition-transform active:scale-90

              ${
                isOpen
                  ? "bg-violet-800 hover:bg-violet-700"
                  : "bg-violet-600 hover:bg-violet-500"
              }
                `}
        >
          Menu de Navegação
        </button>

        <ul
          style={{ display: isOpen ? "flex" : undefined }}
          className={[
            "hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60  shadow-md  rounded p-5 flex flex-col gap-4 justify-center items-center bg-violet-700  z-50",
            "sm:hidden ",
            "md:static md:flex md:flex-row md:w-auto md:h-3 md:gap-6 md:bg-violet-200 md:transform-none  md:shadow-none ",
          ].join(" ")}
        >
          {navBarItems.map((item) => (
            <li key={item.name}>
              <Link
                className="text-white text-lg font-semibold  transition duration-300 ease-in-out md:text-violet-700 "
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
