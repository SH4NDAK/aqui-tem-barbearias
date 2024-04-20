// exporta o componente pra todos os arquivos do sistema ver
import React from 'react';

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