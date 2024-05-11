import 'devextreme/dist/css/dx.light.css';

import { useState, version } from "react";
import InputText from './components/InputText';
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import Container from "./components/Container";
import FormContainer from "./components/FormContainer";
import axios from "axios";
import logo from "./img/logo.jpg"

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
    navigate("/")
    // try {
    //   axios.get("http://localhost:5028/auth", { params: data })
    // } catch (e) {
    //   console.log(e);
    // }
  }

  return (
    <Container>
      <FormContainer>
        <div className="w-full flex justify-center font-bold text-5xl">
          <img src={logo} width={256}/>
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
              errors={errors.login}
            />

            <InputText
              label={'Senha'}
              type={verSenha ? 'text' : 'password'}
              placeholder={'Digite sua senha'}
              {...register("senha", { required: "Campo obrigatório*" })}
              variant={errors.senha ? 'invalid' : ''}
              icon={verSenha ? <EyeOff /> : <Eye />}
              onIconClick={handleIconClick}
              errors={errors.senha}
            />

            <div>
              <span
                className="text-sm"
              >
                Esqueceu a senha? Clique <a className="text-blue-700 font-bold" href="/recovery">aqui!</a>
              </span>
            </div>
            <div className="flex w-full mt-4 justify-center">
              <Button
                type="submit"
                className="w-full"
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
                type="button"
                variant="gray"
                className="w-full"
                onClick={(e) => { navigate("/register") }}
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
