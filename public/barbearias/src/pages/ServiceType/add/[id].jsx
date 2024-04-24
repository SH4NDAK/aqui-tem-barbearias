import React,{useState} from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'
import { Button, Form, Input, Select } from 'antd'
import LayoutPage from '../../../components/LayoutPage'
import SideBar from '../../../components/SideBar'
import TableHeader from '../../../components/table/TableHeader'
import { useForm } from 'react-hook-form'
import InputText from '../../../components/InputText'

export default function AddOrEditServiceTypes() {
  const [form] = Form.useForm()
  const navigate = useNavigate();

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
  // Adicionar rules, i18n, arrumar select para ficar com autoComplete

  return (
    <SideBar>
      <LayoutPage name={<TableHeader title={"Cadastras servicos"} backButton={"<"} />}>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              label={'Nome do Serviço'}
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
              label='Descrição'
              type='text'
              placeholder={'Insira o Telefone'}
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
              label='Funcionário'
              type='text'
              placeholder={'Insira o nome'}
              {...register("employeer", { required: "Campo obrigatório*" })}
              variant={errors.employeer ? 'invalid' : ''} 
            />
            <div>
              {errors.employeer && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.employeer.message}
                </span>
              )
              }
            </div>
            <InputText
              label='Preço'
              type='text'
              placeholder={'Insira o preço'}
              {...register("price", { required: "Campo obrigatório*" })}
              variant={errors.price ? 'invalid' : ''} 
            />
            <div>
              {errors.price && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.price.message}
                </span>
              )
              }
            </div>

            <InputText
              label='Duração'
              type='time'
              placeholder={'Insira a duração'}
              {...register("duration", { required: "Campo obrigatório*" })}
              variant={errors.duration ? 'invalid' : ''} 
            />
            <div>
              {errors.duration && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.duration.message}
                </span>
              )
              }
            </div>

            <InputText
              label='Dia'
              type='Date'
              placeholder={'Insira o dia'}
              {...register("day", { required: "Campo obrigatório*" })}
              variant={errors.day ? 'invalid' : ''} 
            />
            <div>
              {errors.day && (
                <span
                  className="font-semibold text-red-600 text-sm"
                >
                  {errors.day.message}
                </span>
              )
              }
            </div>

            <div className='flex justify-center'>
              <button 
                type="button" 
                className="bg-blue-600 text-white text-sm font-medium p-2 rounded-lg "
              >
                Registrar
              </button>
            </div>
          </form>
      </LayoutPage>
    </SideBar>
  )
}
