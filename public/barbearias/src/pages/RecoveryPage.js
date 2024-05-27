import React from 'react';
// trazendo a função que mescla o css daqui do componente com css definido na aplicação
import { cn } from '../utils/cn';
import { cva } from "class-variance-authority"


// criando variações de estilo css para o input
const inputVariants = cva(
    // classe padrão dos inputs
    "w-full border border-[#242222] rounded-sm p-3 mt-1 text-[#242222] outline-none rounded",
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
    "font-semibold text-sm",
    {
        variants: {
            variant: {
                invalid: "text-red-600"
            }
        }
    }
)


// componente input de texto
const InputText = React.forwardRef(({ label, type, placeholder, className, icon, variant, onIconClick, ...props }, ref) => {
    return (
        <div>
            <label
                className={cn(labelVariants({ variant }), className)}
            >
                {label}
            </label>
            <div
                className='flex gap-1'
            >
                <input
                    // esse input aceita todas as propriedades padrão de input
                    {...props}
                    ref={ref} // Passando a ref para o input
                    type={type}
                    placeholder={placeholder}
                    className={cn(inputVariants({ variant }), className)}// adaptar no classname
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
        </div>
    )
});

// exporta o componente pra todos os arquivos do sistema ver
export default InputText;
