import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

// criando variações de estilo CSS pra label do input
const labelVariants = cva(
    // padrão
    "font-semibold text-sm tracking-tighter",
    // variantes
    {
        variants: {
            variant: {
                invalid: "text-red-600"
            }
        }
    }
)

const Label = React.forwardRef(({ variant, className, label, ...props }, ref) => {
    return (
        <label
            className={cn(labelVariants({ variant }), className)}
            {...props}
        >
            {label}
        </label>)

});

export default Label;