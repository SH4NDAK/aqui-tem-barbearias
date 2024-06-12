import { useEffect, useState } from "react";
import InputText from '../../components/InputText';
import { set, useForm } from 'react-hook-form'
import Button from "../../components/Button";
import { Radio, Switch } from "antd";
import { SetAuthenticationToken, SetAuthenticationUser, editUser, setLogoutUser, signUpRequest } from "../../services/auth";
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.jpg"; 
import Header from "../../components/Header";
import SideBar from '../../components/SideBar';
import { ArrowLeftCircle } from "lucide-react";

export default function Perfil() {
  // trazendo algumas funções úteis da biblioteca react-hook-form
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [verSenha, setVerSenha] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (JSON.parse(user) !== undefined) {
        const newUser = JSON.parse(user)
        setUser(newUser)
        setValue("usuario", newUser.usuario)
        setValue("email", newUser.email)
    }
  }, [])



  // função chamada no envio do formulário de login
  const onSubmit = async (data) => {
    try {
        if (data.senha === data.confirmPassword || (isNaN(data.senha) &&  isNaN(data.senha))) {
            const res = await editUser(user.id, data)
            setLogoutUser()
            SetAuthenticationUser({...user, ...data})
            return notification.success({
                message: "Sucesso",
                description: res.mensagem
              })
        }
        return notification.error({
            message: "Erro",
            description: "As duas senhas devem coincidir"
        })      
    } catch (error) {
        notification.warninga({
            message: "Sucesso",
            description: "Ocorreu um erro inesperado"
          })
    } 
  }


  return (
    <>
      <Header />
        <div className="flex justify-center items-center w-full h-dvh bg-[#242222]">
        <div className="flex flex-col bg-white p-12 rounded-lg gap-4">
            <div className="flex justify-center w-full">
                <span className="text-3xl font-semibold">Editar dados</span>
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
                label='Email'
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
                    type='senha'
                    defaultValue={""}
                    placeholder={'Digite sua senha'}
                    variant={errors.senha ? 'invalid' : ''}
                    {...register("password")}
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
                    defaultValue={""}
                    placeholder={'Digite sua senha'}
                    variant={errors.confirmPassword ? 'invalid' : ''}
                    {...register("confirmPassword")}
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
                <div className="flex gap-4 justify-end items-center mt-4">
                    <Button
                        type="button"
                        icon={<ArrowLeftCircle />}
                        onClick={() => { navigate(-1) }}
                        >
                        Voltar
                    </Button>
                    <Button
                        type="submit"
                        className="flex w-full justify-center"
                        >
                    Editar
                    </Button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </>
  );

}
