
import { useState, version } from "react";
import InputText from './components/InputText';
import { Eye } from 'lucide-react'
import { z } from 'zod';

export default function App() {

  // usestate é usado para setar o estado (valor) de um elemento 
  // Exemplo: usuário digitou no input de login, o que ele ta digitando ta sendo armazenado em 'login'
  const [login, setLogin] = useState();

  // estado para definir se o input de senha vai ser password, ou text (nao ver senha ou ver senha)
  const [verSenha, setVerSenha] = useState(false);
  const [senha, setSenha] = useState();

  // criando o 'schema' de validações do formulário de login usando o zod
  const formLogin = z.object({

  })


  // função chamada ao clicar no botão de 'ver senha'
  const handleIconClick = () => {
    // 'ver senha' será o contrario do estado anterior de 'ver senha'
    setVerSenha(!verSenha)
  }

  // função chamada no envio do formulário de login
  const handleFormSubmit = (e) => {

  }

  return (
    <div className="flex justify-center items-center w-screen h-dvh bg-[#242222]">
      <div className="flex flex-col bg-white p-12 rounded-lg gap-4">
        <div className="w-full flex justify-center font-bold text-5xl">
          LOGO
        </div>
        <div className="w-full flex flex-col gap-2">
          <form
            onSubmit={handleFormSubmit}>
            <InputText
              label={'Login'}
              placeholder={'E-mail ou telefone'}
              type={'text'}
              value={login}
              onChange={(e) => { setLogin(e.currentTarget.value) }}
            />
            <InputText
              label={'Senha'}
              type={verSenha ? 'text' : 'password'}
              placeholder={'Digite sua senha'}
              value={senha}
              intent={"icone"}
              onChange={(e) => { setSenha(e.currentTarget.value) }}
              icon={<Eye />}
              onIconClick={handleIconClick}
            />

            <div>
              <button type="submit">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
