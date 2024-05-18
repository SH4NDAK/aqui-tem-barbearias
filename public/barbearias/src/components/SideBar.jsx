import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'

export default function SideBar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  // Verifica se a rota atual corresponde à rota do item do menu e atualiza o estado selectedMenuItem
  React.useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/tipos-servico') {
      setSelectedMenuItem('1');
    } else if (pathname === '/agenda') {
      setSelectedMenuItem('2');
    }
  }, [location.pathname]);

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item.key);
    navigate(item.path);
  };

  return (
    <Layout>
      <Layout.Sider trigger={null} collapsible collapsed={collapsed} className='bg-fixed'>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenuItem]}
        >
          <Menu.Item key='1' onClick={() => handleMenuItemClick({ key: '1', path: '/tipos-servico' })}>
            Tipos de Serviço
          </Menu.Item>
          <Menu.Item key='2' onClick={() => handleMenuItemClick({ key: '2', path: '/agenda' })}>
            Agenda
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      {children}
    </Layout>
  )
}
