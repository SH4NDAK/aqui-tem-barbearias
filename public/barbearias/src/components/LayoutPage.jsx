import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Button from './Button'
import { LogOutIcon } from 'lucide-react'
import { setLogoutUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'

export default function LayoutPage({name, children}) { //Cria uma pagina default
  const navigate = useNavigate()
  const signOut = () => {
    setLogoutUser()
    return navigate("/")
  }
  return (
    <Layout>
        <Header className='bg-white text-5xl flex justify-between w-full items-center h-10'>  
            <h1>{name}</h1>
            <Button
              className="flex items-center m-4 p-2"
              type={"button"}
              icon={<LogOutIcon />}
              onClick={signOut}
              variant={"icon"}
            />
        </Header>
        <Content className='flex h-screen'>
          {children}
        </Content>
    </Layout>
  )
}
