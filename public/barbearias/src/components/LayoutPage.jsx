import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'

export default function LayoutPage({name, children}) {

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
