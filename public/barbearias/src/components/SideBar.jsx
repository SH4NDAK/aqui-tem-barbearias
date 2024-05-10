import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Layout, Menu } from 'antd'

export default function SideBar({children}) {   // Cria uma Sidebar no canto da tela
// Cria uma state para abrir e fechar a sidebar
const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Layout.Sider trigger={null} collapsible collapsed={collapsed} className='bg-fixed'>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                label: 'Tipos de Serviço',   // Isso serve para colocar os itens no canto da tela
              },
            ]}
          />
        </Layout.Sider>
        {children}
      </Layout>
  )
}
