
import React from 'react';

// importando a função que deixa adicionar classes personalizadas além do que ja foi definido aqui
import { cn } from '../utils/cn';
import { cva } from 'class-variance-authority';

// componente input de texto
// parametros obrigatorios: label, type (tipo do input), placeholder
// ...props são as propriedades padrão de input, pra caso precise por nas aplicações ele nao dar erro
// intent é qual tipo de classe vai ser usada
const InputText = ({ intent, label, type, placeholder, className, icon, onIconClick, ...props }) => {
    return (
        <div>
            <label
                className="font-semibold text-sm"
            >
                {label}
            </label>
            <div className='flex'>
                <input
                    className={inputVariants({
                        className,
                        intent
                    })}
                    placeholder={placeholder}
                    type={type}
                    {...props}
                />
                {icon && (
                    <button
                        onClick={onIconClick}
                    >
                        {icon}
                    </button>
                )
                }
            </div>
        </div>
    )
}

// definindo css dinamico pro InputText
const inputVariants = cva(
    // Primeiro começamos com o css base que vai ter em todo input
    "w-full border border-[#242222] rounded-sm p-1 text-[#242222] outline-none",
    {
        // caso tenha variantes de estilo, adicionar aqui
        variants: {
            intent: {
                invalid: "bg-black"
            }
        }
    }
)



// exporta o componente pra todos os arquivos do sistema ver
export default InputText;
