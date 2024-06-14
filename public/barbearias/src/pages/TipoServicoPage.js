import { Dropdown, Menu, Table, notification } from "antd";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import InputText from "../components/InputText";
import Row from "../components/Row";
import { editService, listService } from "../services/service";
import { ROLES } from "../utils/role";


export default function TipoServicoPage() {
    // chamando a função que navega entre as páginas do sistema
    const navigate = useNavigate();
    const [serviceType, setServiceType] = useState([]);
    const [serviceTypeFilter, setServiceTypeFilter] = useState([]);
    const [ativos, setInativos] = useState(false);


    // função chamada ao clicar no botão '+' da lista de tipos de serviço, para cadastrar um
    const handleCadastroClick = () => {
        navigate("/tipos-servico/add");
    };

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('usuario'));
        if (user.cargo == ROLES.Cliente) {
            navigate("/home");
        }

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
            });
            
            notification.success({
                message: "Sucesso",
                description: "Tipo de serviço"
            });

            setServiceTypeFilter(serviceTypeFilter.filter(dado => dado.id != record.id));

        } catch (error) {
            console.log(error)
        }
    };

    return (

        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className="w-full flex flex-col gap-4 justify-center items-center mt-4">
                <div className="flex flex-col bg-white w-11/12 shadow-sm shadow-[#242222] rounded-md ">
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
                        </Row>
                    </form>
                </div>
                <div className="self-center w-11/12 bg-white p-2 rounded-md shadow-sm shadow-[#242222]">
                    {
                        serviceTypeFilter.length > 0 ?
                            serviceTypeFilter.map(servico => {
                                return (
                                    <div>
                                        <div className="flex flex-row w-full justify-between">
                                            <div>
                                                <span className="text-lg"><b>{servico.nome}</b></span>
                                                <br />
                                                <span className="text-sm">R${servico.preco} <br /> <span className="text-blue-600">{servico.duracao}min</span></span>
                                            </div>
                                            <div className="flex flex-row gap-4">
                                                <button onClick={() => navigate(`edit/${servico.id}`)}>
                                                    <Pencil />
                                                </button>
                                                <button onClick={() => deleteServiceType(servico)}>
                                                    <Trash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            (
                                <div className="flex justify-center w-full bg-white">
                                    <span className="w-fit text-lg font-bold">Nenhum tipo de serviço encontrado</span>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}  
