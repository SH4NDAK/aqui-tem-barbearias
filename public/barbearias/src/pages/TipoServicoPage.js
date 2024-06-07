import { Plus, Trash, } from "lucide-react";
import Button from "../components/Button";
import InputText from "../components/InputText";
import { useNavigate } from "react-router-dom";
import Row from "../components/Row";
import { useEffect, useState } from "react";
import { editService, listService } from "../services/service";
import { Dropdown, Menu, Table, notification } from "antd";
import Header from "../components/Header";
import CardServiceType from "../components/CardServiceType";
import useIsTouchDevice from "../utils/isTouchMobile";


export default function TipoServicoPage() {
    // chamando a função que navega entre as páginas do sistema
    const navigate = useNavigate();
    const [serviceType, setServiceType] = useState([]);
    const [serviceTypeFilter, setServiceTypeFilter] = useState([]);

    // função chamada ao clicar no botão '+' da lista de tipos de serviço, para cadastrar um
    const handleCadastroClick = () => {
        navigate("/tipo-servico/add");
    };

    useEffect(() => {
        const user = localStorage.getItem('usuario');
        if (user !== null || user !== undefined) {
          navigate("/login")
        }
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const { dados } = await listService();
                setServiceType(dados);
                setServiceTypeFilter(dados);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    
    const deleteServiceType = async (record) => {
        try {
            await editService(record.id, {
                ativo: "false",
                descricao: record.descricaoServico,
                duracao: record.duracaoServico,
                nome: record.nomeServico,
                preco: record.precoServico.toString(),
                usuarioId: record.usuarioIdServico.toString()
            })
            notification.sucess({
                message: "Sucesso",
                description: "Item excluido com sucesso"
            })
        } catch (error) {
            console.log(error)
        }
    };

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nomeServico',
            key: 'nomeServico',
        },
        {
            title: 'Descrição',
            dataIndex: 'descricaoServico',
            key: 'descricaoServico',
        },
        {
            title: 'Duração',
            dataIndex: 'duracaoServico',
            key: 'duracaoServico',
        },
        {
            title: 'Preço',
            dataIndex: 'precoServico',
            key: 'precoServico',
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (record) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="0">
                                <a onClick={() => navigate(`edit/${record.id}`)}>Editar</a>
                            </Menu.Item>
                            <Menu.Item key="1" onClick={() => deleteServiceType(record)}>
                                <Trash />
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        Ações
                    </a>
                </Dropdown>
            ),
        },
    ];
    return (
        <div className="w-full bg-[#242222] h-dvh pb-8">
            <Header />
            <div className="w-full flex justify-center bg-[#242222] ">
                <div className="flex flex-col bg-white shadow-sm shadow-[#242222] rounded-md sm:w-full m-4 p-4 ">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Tipos de serviço</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center pb-4 opacity-5"></div>
                        <Row className="flex justify-center items-center pl-2">
                            <Button
                                type={"button"}
                                icon={<Plus />}
                                onClick={handleCadastroClick}
                                variant={"icon"}
                                />
                            <InputText
                                label="Nome"
                                type="text"
                                className="w-64"
                                onChange={(e) =>
                                    setServiceTypeFilter(
                                        serviceType.filter((y) =>
                                            y.nomeServico.toLowerCase().includes(e.target.value.toLowerCase())
                                    )
                                )
                            }
                            />
                        </Row>
                        {!useIsTouchDevice() ?
                            <Table columns={columns} dataSource={serviceTypeFilter} pagination={{ pageSize: 10 }} scroll={{ y: 240 }}/>
                        : (
                            <div className="h-96 overflow-y-auto w-full mb-32 pb-12">
                                {serviceTypeFilter.map(e => (
                                    <CardServiceType record={e} deleteServiceType={deleteServiceType}/>
                                ))}
                            </div>
                            )
                        }        
                </div>
            </div>
        </div>
    )
}  
