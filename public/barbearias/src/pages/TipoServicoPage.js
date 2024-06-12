import { Lightbulb, Link, Pencil, Plus, Search, Trash, ListPlus } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import { useNavigate } from "react-router-dom";
import Row from "../components/Row";
import LayoutPage from "../components/LayoutPage";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { editService, listService } from "../services/service";
import { Col, Dropdown, Menu, Table, notification } from "antd";
import { PlusSquareOutlined } from "antd";
import Header from "../components/Header";


export default function TipoServicoPage() {
    // chamando a função que navega entre as páginas do sistema
    const navigate = useNavigate();
    const [serviceType, setServiceType] = useState([]);
    const [serviceTypeFilter, setServiceTypeFilter] = useState([]);
    const [nome, setNome] = useState("");
    const [ativos, setInativos] = useState(false);


    // função chamada ao clicar no botão '+' da lista de tipos de serviço, para cadastrar um
    const handleCadastroClick = () => {
        navigate("/tipo-servico/add");
    };

    useEffect(() => {
        (async () => {
            try {
                const { dados } = await listService();
                setServiceType(dados);
                setServiceTypeFilter(dados.filter(dado => dado.ativo));
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const deleteServiceType = async (record) => {
        try {
            await editService(record.id, {
                ativo: "false",
                descricao: record.descricao,
                duracao: record.duracao,
                nome: record.nome,
                preco: record.preco.toString(),
            })
            notification.success({
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
            key: 'nomeServico'
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
                            <Menu.Item key="1">
                                <a onClick={() => navigate(`edit/${record.id}`)}>Editar</a>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => deleteServiceType(record)}>
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

        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className="w-full flex justify-center">
                <div className="flex flex-col bg-white w-1/3 shadow-sm shadow-[#242222] rounded-md sm:w-full">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Tipos de serviço</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center pt-4 mb-4 opacity-5"></div>
                    <form>
                        <Row>
                            <Row className="flex justify-center items-center">
                                <Button
                                    type={"button"}
                                    icon={<Plus />}
                                    onClick={handleCadastroClick}
                                    variant={"icon"}
                                />
                                <div className="w-fit">

                                    <InputText
                                        label="Nome"
                                        type="text"
                                        className="w-64"
                                        onChange={(e) =>
                                            setServiceTypeFilter(
                                                serviceType.filter((y) =>
                                                    y.nome.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                                                )
                                            )
                                        }

                                    />
                                </div>
                                <div className="flex gap-1 w-fit">
                                    <input
                                        id="incluir_inativos"
                                        type="checkbox"
                                        value={ativos}
                                        onChange={(e) => {
                                            setInativos(!ativos)
                                            setServiceTypeFilter(!ativos ? serviceType : serviceType.filter(service => service.ativo));

                                        }}
                                    />
                                    <label htmlFor="incluir_inativos">Incluir inativos</label>
                                </div>
                            </Row>
                            <Table columns={columns} dataSource={serviceTypeFilter} pagination={{ pageSize: 10 }} scroll={{ y: 240 }} />
                        </Row>
                    </form>
                </div>
            </div>
        </div>
    )
}  
