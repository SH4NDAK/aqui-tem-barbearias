import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

// criando as variações de estilo CSS para o botão
const buttonVariants = cva(
    // css padrão para o botão
    "sm: w-full h-fit flex justify-center items-center bg-[#242222] p-2  rounded-md text-white font-semibold text-sm hover:bg-[#272525] shadow-sm shadow-black transition-colors",
    {
        // defininindo as variantes de estilo CSS para o botão
        variants: {
            variant: {
                gray: "bg-[#444444] hover:bg-[#494949] shadow-[#494949]",
                icon: "w-full lg:w-fit mt-5"
            }
        }
    }
)

// componente botão
const Button = React.forwardRef(({ icon, onClick, type, variant, className, children }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(buttonVariants({ variant }), className)}// adaptar no classname
            type={type}
            onClick={onClick}
        >
            {icon && (
                <div className="me-1">
                    {icon}
                </div>
            )}

            {children}
        </button>
    )
});

export default Button;