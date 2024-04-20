// exporta o componente pra todos os arquivos do sistema ver
import React from 'react';


// componente input de texto
// parametros obrigatorios: label, type (tipo do input), placeholder
// ...props são as propriedades padrão de input, pra caso precise por nas aplicações ele nao dar erro
const InputText = ( {label, type, placeholder, ...props} ) => {
    return (
        <div>
            <label
                className="font-semibold text-sm"
            >
                {label}
            </label>
            <input
                className="w-full border border-[#242222] rounded-sm p-1 font-[#242222] outline-none"
                placeholder={placeholder}
                type={type}
                {...props}
            />
        </div>
    )
}

export default InputText
