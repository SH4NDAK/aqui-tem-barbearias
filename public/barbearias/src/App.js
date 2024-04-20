
import { useState } from "react";
import InputText from './components/InputText';
import { Camera, Eye } from 'lucide-react'

export default function App() {

  // usestate é usado para setar o estado (valor) de um elemento 
  // Exemplo: usuário digitou no input de login, o que ele ta digitando ta sendo armazenado em 'login'
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();

  return (
    <div className="flex justify-center items-center w-screen h-dvh bg-[#242222]">
      <div className="flex flex-col bg-white p-12 rounded-lg gap-4">
        <div className="w-full flex justify-center font-bold text-5xl">
          LOGO
        </div>
        <div className="w-full flex flex-col gap-2">
          <InputText
            label={'Login'}
            placeholder={'E-mail ou telefone'}
            type={'text'}
            value={login}
            onChange={(e) => { setLogin(e.currentTarget.value) }}
          />
          <InputText
            label={'Senha'}
            type={'password'}
            placeholder={'Digite sua senha'}
            value={senha}
            intent={"icone"}
            onChange={(e) => { setSenha(e.currentTarget.value) }}
            icon={<Eye/>}
          />
        </div>
      </div>

    </div>
  );
}
