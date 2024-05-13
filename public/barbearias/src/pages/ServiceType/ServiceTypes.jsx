import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Table } from 'antd'
import SideBar from '../../components/SideBar'
import LayoutPage from '../../components/LayoutPage'
import TableHeader from '../../components/table/TableHeader' 

export default function ServiceTypes() {
  const serviceType = [
    'corte', 'barba', 'corte + barba'
  ]

  const dataSource = [  // isso é um exemplo
    {
      key: '1',
      name: 'servicos 1',
      description: 'description 1',
      duration: 'duration 1',
      price: 'price 1',
      user: 'Usuario 1',
      active: 'active 1',
      employeer: "Funcionario 1",
      serviceRating: 'serviceRating 1',
      barberShop: "Barberia 1"
    },
    {
      key: '2',
      name: 'servicos 2',
      description: 'description 2',
      duration: 'duration 2',
      price: 'price 2',
      user: 'Usuario 2',
      active: 'active 2',
      employeer: "Funcionario 2",
      serviceRating: 'serviceRating 2',
      barberShop: "Barberia 2"
    },
    {
      key: '3',
      name: 'servicos 3',
      description: 'description 3',
      duration: 'duration 3',
      price: 'price 3',
      user: 'Usuario 3',
      active: 'active 3',
      employeer: "Funcionario 3",
      serviceRating: 'serviceRating 3',
      barberShop: "Barberia 3"
    },
  ];
  
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Funcionario',
      dataIndex: 'employeer',
      key: 'employeer',
    }
  ];

  return (
    <SideBar>
      <LayoutPage name={<TableHeader title={"Tipos de serviços"} addRouter={"/add/"}/>}>
      </LayoutPage>
    </SideBar>
  )
}
