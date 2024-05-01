import React, { useState } from 'react';
// trazendo a função que mescla o css daqui do componente com css definido na aplicação
import { cn } from '../utils/cn';
import { cva } from "class-variance-authority"


// criando variações de estilo css para o input
const inputVariants = cva(
    // classe padrão dos inputs
    "w-full border border-[#242222] p-1 text-[#242222] outline-none border-x-0 border-t-0 border-[#242222] transition-colors focus:border-blue-600",
    {
        // variações de estilo
        variants: {
            variant: {
                // quando o dado do input esta invalido em um formulário
                invalid: "border-red-600 text-red-600"
            }
        }
    }
)

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


// componente input de texto
const InputText = React.forwardRef(({ monetario, errors, label, type, placeholder, className, icon, variant, onIconClick, ...props }, ref) => {

    // useState pra controlar se o input esta em foco (alguem clicou pra digitar nele)
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div>
            <label
                className={cn(labelVariants({ variant }), className)}
            >
                {label}
            </label>
            <div
                className={`flex ${monetario ? 'gap-0' : 'gap-1'} `}
            >
                {monetario && (
                    <div
                        className={`flex items-center bg-gray-200 w-1/6 justify-center font-semibold border-b border-[#242222] ${isFocused ? 'border-blue-600' : ''} ${errors ? 'border-red-600' : ''}`}
                    >
                        <span className={`${errors ? 'text-red-600' : ''} `}>R$</span>
                    </div>
                )}
                <input
                    // esse input aceita todas as propriedades padrão de input
                    {...props}
                    ref={ref} // Passando a ref para o input
                    type={type}
                    placeholder={placeholder}
                    className={cn(inputVariants({ variant }), className)} // adaptar no classname
                    onFocus={() => { setIsFocused(true) }}
                    onBlur={() => { setIsFocused(false) }}
                />
                {icon && (
                    <button
                        type='button'
                        onClick={onIconClick}
                    >
                        {icon}
                    </button>
                )
                }
            </div>

            <div>
                {errors && (
                    <label
                        className="font-semibold text-red-600 text-sm"
                    >
                        {errors.message}
                    </label>
                )
                }
            </div>
        </div>
    )
});

// exporta o componente pra todos os arquivos do sistema ver
export default InputText;
