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
      <LayoutPage name={<TableHeader title={"Adicionar Tipos de servicos"} backButton={"<"} />}>
          <Form
            form={form}
            initialValues={{ remember: true }}
            className='flex flex-col'
            validateTrigger={false}
            size="large"
          >
            <div className='flex flex-row flex-wrap'>
              <Form.Item
                name="name"
                label={"Nome do Serviço"}
                className='w-1/2 p-2'
              >
                <Input maxLength={250}/>
              </Form.Item>
              <Form.Item
                name="description"
                label={"Descrição"}
                className='w-1/2 p-2'
              >
                <Input maxLength={250}/>
              </Form.Item>
            </div>
            <div className='flex flex-row flex-wrap'>
              <Form.Item
                name="duration"
                label={"Duração"}
                className='w-1/2 p-2'
              >
                <Input maxLength={250}/>
              </Form.Item>
              <Form.Item
                name="price"
                label={"Preço"}
                className='w-1/2 p-2'
              >
                <Input maxLength={250}/>
              </Form.Item>
            </div>
            <div className='flex flex-row flex-wrap'>
            <Form.Item
              name="user"
              label={"Usuario"}
              className='w-1/2 p-2'
            >
              <Select maxLength={250}/>
            </Form.Item>
            <Form.Item
              name="employeer"
              label={"Funcionario"}
              className='w-1/2 p-2'
            >
              <Select maxLength={250}/>
            </Form.Item>
            </div>
            <Form.Item>
              <Button 
                type="primary"
                htmlType="submit"
                block
              >
                Adicionar
              </Button>
            </Form.Item>
          </Form>
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
      </LayoutPage>
    </SideBar>
  )
}
