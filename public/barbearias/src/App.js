import 'devextreme/dist/css/dx.light.css';

import { useEffect, useState } from "react";
import InputText from './components/InputText';
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import Container from "./components/Container";
import FormContainer from "./components/FormContainer";
import { SetAuthenticationToken, SetAuthenticationUser, signInRequest } from './services/auth';
import { notification } from 'antd';
import logo from "./img/logo.jpg";


export default function App() {

  // trazendo a função que navega entre as rotas do sistema
  const navigate = useNavigate()

  // Se o usuario estiver logado direciona ele para tela de tipos-servico
  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user !== null) {
      navigate("/tipos-servico")
    }
  }, [])

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
  const onSubmit = async (data) => {
    try {
      // faz chamada de autenticação
      const res = await signInRequest(data)
      // se der erro de autenticacao volta a mensagen
      if (res.status === false) {
        return notification.error({
          message: "Erro",
          description: res.mensagem
        })
      }
      // define o token nos cookies
      SetAuthenticationToken(res.dados.token)
      // define usuario na aplications
      SetAuthenticationUser(res.dados)
      // envia mensagem de sucesso
      notification.success({
        message: "Sucesso",
        description: res.mensagem
      })
      // direciona o usuario para tipos serviços
      navigate('/tipos-servico')
    } catch (e) {
      console.log(e);
      // Mostra uma notificação de erro na tela se der erro
      if (e.response?.data?.errors?.Email[0]) {
        notification.warning({
          message: "Erro",
          description: e.response.data.errors.Email[0]
        })
      }
    }
  }

  return (
    <Container>
      <FormContainer>
        <div className="w-full flex justify-center font-bold text-5xl">
          <img src={logo} width={"60%"}/>
        </div>
        <div className="w-full flex flex-col gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              label={'Login'}
              type={'text'}
              placeholder={'E-mail ou telefone'}
              {...register("email", { required: "Campo obrigatório*" })}
              variant={errors.email ? 'invalid' : ''}
              errors={errors.email}
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
                ENTRAR
              </Button>
            </div>
            <div
              className="flex text-sm mt-2 mb-2 font-bold justify-center"
            >
              OU
            </div>
            <div>
              <Button
                type="button"
                variant="gray"
                className="w-full"
                onClick={() => navigate("/cadastro")}
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
