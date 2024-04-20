// exporta o componente pra todos os arquivos do sistema ver
import React from 'react';

export default class InputText extends React.Component {
    render() {
        const {label} = this.props;

        return (
            <>
                <label
                    className="font-semibold text-sm">{label}</label>
                <input
                    className="w-full border border-[#242222] rounded-sm p-1 font-[#242222] outline-none"
                    placeholder="E-mail ou telefone"
                    type="text"
                // valor do input
                // value={login}
                // toda vez que o usuário digitar alguma coisa, vai ser o que ele digitou na variavel 'login'
                // onChange={(e) => { setLogin(e.currentTarget.value) }}
                />
            </>
        )
    }
}