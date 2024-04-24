import React from "react";

// este componente é o padrão de containers para formulários no sistema ``futuramente liberar a personalização do fundo pra cada cliente``
const FormContainer = React.forwardRef(({ children }, ref) => {
    return (
        <div 
            className="flex flex-col bg-white p-12 rounded-lg gap-4 "
            ref={ref}
        >
            {children}
        </div>
    )
});

export default FormContainer;