import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

// criando variantes de estilo css pro formContainer
const formContainerVariants = cva(
    // classe padrão
    "flex bg-white p-12 rounded-lg gap-4 w-fit h-fit sm:flex-col sm:justify-center justify-normal",
    // variantes de estilo css 
    {
        variants: {
            variant: {
                column: "flex-col",
                row: "lg:flex-row flex-wrap"
            }
        },
        // definindo qual vai ser a variante padrão (column)
        defaultVariants: {
            variant: "column"
        }
    }
)

// este componente é o padrão de containers para formulários no sistema ``futuramente liberar a personalização do fundo pra cada cliente``
const FormContainer = React.forwardRef(({ title, variant, className, children }, ref) => {
    return (
        <>
            <div
                className={cn(formContainerVariants({ variant }, className))}
                ref={ref}
            >
                <span
                    className="flex flex-col gap-4 text-3xl text-center font-semibold w-full h-fit"
                >
                    {title}
                    <hr />
                </span>
                {children}
            </div>
        </>
    )
});

export default FormContainer;