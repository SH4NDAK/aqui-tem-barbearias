import React from "react";

// este componente é o 'corpo' de todas as paginas do sistema, ``futuramente liberar a personalização do fundo pra cada cliente``
const Container = React.forwardRef(({ children }, ref) => {
    return (
        <div 
            className="flex justify-center items-center w-screen h-dvh bg-[#242222]"
            ref={ref}
        >
            {children}
        </div>
    )
});

export default Container;