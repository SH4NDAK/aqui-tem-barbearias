
import { useState, version } from "react";
import InputText from './components/InputText';
import { Eye, LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'

export default function App() {

  // trazendo algumas funções úteis da biblioteca react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // usestate é usado para setar o estado (valor) de um elemento 
  // estado para definir se o input de senha vai ser password, ou text (nao ver senha ou ver senha)
  const [verSenha, setVerSenha] = useState(false);


  // função chamada ao clicar no botão de 'ver senha'
  const handleIconClick = () => {
    // 'ver senha' será o contrario do estado anterior de 'ver senha'
    setVerSenha(!verSenha)
  }

  // função chamada no envio do formulário de login
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="flex justify-center items-center w-screen h-dvh bg-[#242222]">
      <div className="flex flex-col bg-white p-12 rounded-lg gap-4">
        <div className="w-full flex justify-center font-bold text-5xl">
          LOGO
        </div>
        <div className="w-full flex flex-col gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label>Login</label>
              <input
                className="w-full border border-[#242222] rounded-sm p-1 text-[#242222] outline-none"
                placeholder="E-mail ou telefone"
              />
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
