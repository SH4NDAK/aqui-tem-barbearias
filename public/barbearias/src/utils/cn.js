// função que mescla a classe definida para o componente e a classe definida pelo usuário na aplicação

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Exemplo: o InputText tem border-black na função do componente, se eu definir na aplicação border-white, ele vai aplicar o border-white
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}