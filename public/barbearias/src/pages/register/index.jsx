''
import { useState, version } from "react";
import InputText from '../../components/InputText';
import { useForm } from 'react-hook-form'

export default function Register() {

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
            <InputText
              label={'Nome'}
              type={'text'}
              placeholder={'Insira o seu nome'}
              {...register("nome", { required: "Campo obrigatório*" })}
              variant={errors.nome ? 'invalid' : ''} 
            />
            <div>
              {errors.nome && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.nome.message}
                </span>
              )
              }
            </div>
            <InputText
              label='Telefone'
              type='text'
              placeholder={'Digite sua Telefone'}
              {...register("telephone", { required: "Campo obrigatório*" })}
              variant={errors.telephone ? 'invalid' : ''} 
            />
            <div>
              {errors.telephone && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.telephone.message}
                </span>
              )
              }
            </div>
            <InputText
              label='Email'
              type='text'
              placeholder={'Digite sua Email'}
              {...register("email", { required: "Campo obrigatório*" })}
              variant={errors.email ? 'invalid' : ''} 
            />
            <div>
              {errors.email && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.email.message}
                </span>
              )
              }
            </div>
            <InputText
              label='Senha'
              type='password'
              placeholder={'Digite sua senha'}
              {...register("password", { required: "Campo obrigatório*" })}
              variant={errors.login ? 'invalid' : ''} 
            />
            <div>
              {errors.password && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.password.message}
                </span>
              )
              }
            </div>

            <div>
              <button
                type="submit"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );

}
