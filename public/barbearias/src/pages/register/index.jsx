import { useEffect, useState } from "react";
import InputText from '../../components/InputText';
import { useForm } from 'react-hook-form'
import Button from "../../components/Button";
import { Radio, Switch } from "antd";
import { SetAuthenticationToken, SetAuthenticationUser, signUpRequest } from "../../services/auth";
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.jpg"; 
                                    

export default function Register() {
  // trazendo algumas funções úteis da biblioteca react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  // usestate é usado para setar o estado (valor) de um elemento 
  // estado para definir se o input de senha vai ser password, ou text (nao ver senha ou ver senha)
  const [verSenha, setVerSenha] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user !== null) {
      navigate("/tipos-servico")
    }
  }, [])

  // função chamada ao clicar no botão de 'ver senha'
  const handleIconClick = () => {
    // 'ver senha' será o contrario do estado anterior de 'ver senha'
    setVerSenha(!verSenha)
  }

  // função chamada no envio do formulário de login
  const onSubmit = async (data) => {
    try {
      if (data.senha !== data.confirmPassword) {
        return notification.error({
          message: "Erro",
          description: "As duas senhas devem coincidir"
        })      
      }
      // faz chamada de autenticação
      const res = await signUpRequest({...data, role: 4})
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
    <div className="flex justify-center items-center w-screen h-dvh bg-[#242222]">
      <div className="flex flex-col bg-white p-12 rounded-lg gap-4">
        <div className="w-full flex justify-center font-bold text-5xl">
          <img src={logo} width={"50%"}/>
        </div>
        <div className="w-full flex flex-col gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              label={'Nome'}
              type={'text'}
              placeholder={'Insira o seu nome'}
              {...register("usuario", { required: "Campo obrigatório*" })}
              variant={errors.usuario ? 'invalid' : ''} 
            />
            <div>
              {errors.usuario && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.usuario.message}
                </span>
              )
              }
            </div>
            <InputText
              label='Email ou Telefone'
              type='text'
              placeholder={'Digite seu Email ou Telefone'}
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
              {...register("senha", { required: "Campo obrigatório*" })}
              variant={errors.senha ? 'invalid' : ''} 
            />
            <div>
              {errors.senha && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.senha.message}
                </span>
              )
              }
            </div>
            <InputText
              label='Confirmar senha'
              type='password'
              placeholder={'Digite sua senha'}
              {...register("confirmPassword", { required: "Campo obrigatório*" })}
              variant={errors.confirmPassword ? 'invalid' : ''} 
            />
            <div>
              {errors.confirmPassword && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.confirmPassword.message}
                </span>
              )
              }
            </div>

            <Button
                type="submit"
                className="flex w-full mt-4 justify-center"
              >
              CRIAR CONTA
            </Button>
            <div
              className="flex text-sm mt-4 mb-2 font-bold justify-left"
            >
              Já tem conta?
            </div>
            <div>
              <Button
                type="button"
                variant="gray"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Entrar com seu login
              </Button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );

}
