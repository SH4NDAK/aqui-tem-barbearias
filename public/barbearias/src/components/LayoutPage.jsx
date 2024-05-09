import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'

export default function LayoutPage({name, children}) { //Cria uma pagina default

  return (
    <Layout>
        <Header className='bg-white text-5xl'>  
            {name}
        </Header>
        <Content className='flex h-screen justify-center'>
          {children}
        </Content>
    </Layout>
  )
}
