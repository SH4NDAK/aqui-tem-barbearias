
import { useState, version } from "react";
import InputText from './components/InputText';
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import Container from "./components/Container";
import FormContainer from "./components/FormContainer";

export default function App() {

  // trazendo a função que navega entre as rotas do sistema
  const navigate = useNavigate()

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
    <Container>
      <FormContainer>
        <div className="w-full flex justify-center font-bold text-5xl">
          LOGO
        </div>
        <div className="w-full flex flex-col gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              label={'Login'}
              type={'text'}
              placeholder={'E-mail ou telefone'}
              {...register("login", { required: "Campo obrigatório*" })}
              variant={errors.login ? 'invalid' : ''}
            />
            <div>
              {errors.login && (
                <label
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.login.message}
                </label>
              )
              }
            </div>

            <InputText
              label={'Senha'}
              type={verSenha ? 'text' : 'password'}
              placeholder={'Digite sua senha'}
              {...register("senha", { required: "Campo obrigatório*" })}
              variant={errors.senha ? 'invalid' : ''}
              icon={verSenha ? <EyeOff /> : <Eye />}
              onIconClick={handleIconClick}
            />

            <div>
              {errors.senha && (
                <label
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.senha.message}
                </label>
              )
              }
            </div>
            <div>
              <span
                className="text-sm"
              >
                Esqueceu a senha? Clique <a className="text-blue-700 font-bold" href="/recovery">aqui!</a>
              </span>
            </div>
            <div className="flex w-full mt-4 justify-center">
              <Button
                type={'submit'}
              >
                Entrar
              </Button>
            </div>
            <div
              className="flex text-sm mt-4 mb-4 font-bold justify-center"
            >
              OU
            </div>
            <div>
              <Button
                type={'button'}
                variant={'gray'}
              >
                Criar conta

              </Button>

            </div>
          </form>
        </div>
      </FormContainer>
    </Container>
  );

}
