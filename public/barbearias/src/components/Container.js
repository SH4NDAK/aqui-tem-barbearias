import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

// criando variantes pro container
const containerVariants = cva(
    // classe padrão do container
    "flex w-screen h-dvh bg-[#242222] p-12",
    // variantes
    {
        variants: {
            variant: {
                center: "justify-center items-center",
                start: "justify-center"
            }
        },
        defaultVariants: {
            variant: "center"
        }
    }
)

// este componente é o 'corpo' de todas as paginas do sistema, ``futuramente liberar a personalização do fundo pra cada cliente``
const Container = React.forwardRef(({ variant, className, children }, ref) => {
    return (
        <div
            className={cn(containerVariants({ variant }, className))}
            ref={ref}
        >
            {children}
        </div>
    )
});

export default Container;