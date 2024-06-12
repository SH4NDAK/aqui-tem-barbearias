import { AlertCircle, ArrowRight, ArrowRightCircle, BriefcaseBusiness, Pen, Pencil, Plus, Search, Trash, X } from "lucide-react";
import Header from "../../components/Header";
import InputText from "../../components/InputText";
import { useNavigate } from "react-router-dom";
import { getServicos, listByCargo } from "../../services/barbeiro";
import { useEffect, useState } from "react";
import confirm from "antd/es/modal/confirm";
import { Modal } from "antd";
import { deleteUser } from "../../services/auth";
import { notification } from 'antd';
import { listService } from "../../services/service";

export default function Barbeiros() {
    const navigate = useNavigate();
    const [barbeiros, setBarbeiros] = useState([]);
    const [abrirModalExclusao, setAbrirModalExclusao] = useState(false);
    const [barbeiroLink, setBarbeiroLink] = useState(null);
    const [abrirModalLink, setAbrirModalLink] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [nome, setNome] = useState();

    useEffect(() => {
        (async () => {
            handlePesquisarClick();
        })();
    }, [])

    const handleCadastroClick = () => {
        navigate("/barbeiros/add")
    }

    const handlePesquisarClick = async () => {
        const response = await listByCargo(4, nome);
        setBarbeiros(response);
    }

    const handleEditarBarbeiro = (id) => {
        // Traz o barbeiro selecionado do array de barbeiros pesquisados
        const barbeiro = barbeiros.find(barbeiro => barbeiro.id === id);
        navigate(`/barbeiros/add/`, { state: barbeiro })
    }

    const handleExcluirBarbeiro = async (id) => {
        setAbrirModalExclusao(true);
        setDeleteId(id);
    }

    const handleVincularServicos = (barbeiro) => {
        setAbrirModalLink(true);
        setBarbeiroLink(barbeiro)
    }

    return (
        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col bg-white md:w-6/12 shadow-sm shadow-[#242222] rounded-md w-full self-center">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Barbeiros</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center mt-4 mb-4 opacity-5"></div>

                    <form className="flex flex-col md:flex-row gap-4 p-2 md:w-11/12 w-full">
                        <div>
                            <button
                                type="button"
                                className="md:mt-4 flex justify-center text-white bg-[#242222] p-2 rounded-md md:w-fit w-full"
                                onClick={handleCadastroClick}
                            >
                                <Plus />
                            </button>
                        </div>
                        <InputText
                            label="Nome"
                            type="text"
                            className="md:w-64"
                            onChange={(e) => setNome(e.currentTarget.value)}
                        />
                        <div className="md:w-full flex justify-end">
                            <button
                                type="button"
                                className=" font-semibold md:mt-4 flex justify-center text-white bg-[#242222] p-2 rounded-md md:w-fit w-full"
                                onClick={handlePesquisarClick}
                            >
                                <Search className="me-1" />Pesquisar
                            </button>
                        </div>
                    </form>

                </div>
                <div className="self-center w-11/12 bg-white p-2 rounded-md shadow-sm shadow-[#242222]">

                    {
                        barbeiros.length > 0 ?

                            barbeiros.map(barbeiro => {
                                return (

                                    <div>
                                        <div className="flex flex-row w-full justify-between">

                                            <div>
                                                <span className="text-lg">{barbeiro.usuario}</span>
                                                <br />
                                                <span className="text-sm">{barbeiro.email}</span>
                                            </div>
                                            <div className="flex flex-row gap-4">
                                                <button onClick={() => handleEditarBarbeiro(barbeiro.id)}>
                                                    <Pencil />
                                                </button>
                                                <button onClick={() => handleVincularServicos(barbeiro)}>
                                                    <BriefcaseBusiness />
                                                </button>
                                                <button onClick={() => handleExcluirBarbeiro(barbeiro.id)}>
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
                                    <span className="w-fit text-lg font-bold">Nenhum barbeiro encontrado</span>
                                </div>
                            )
                    }
                </div>

                {
                    <ModalConfirmacao
                        id={deleteId}
                    />
                }
                {
                    <ModalLinkTipoServico
                        barbeiro={barbeiroLink}
                    />
                }
            </div>
        </div>
    )


    function ModalConfirmacao({ id }) {

        const excluirBarbeiro = async (id) => {
            try {
                const res = await deleteUser(id);

                // se der erro de autenticacao volta a mensagen
                if (res.status === false) {
                    return notification.error({
                        message: "Erro",
                        description: res.mensagem
                    })
                };

                // envia mensagem de sucesso
                notification.success({
                    message: "Sucesso",
                    description: res.mensagem
                });


            } catch (error) {
                console.log(error);
            }
            finally {
                handlePesquisarClick();
                setAbrirModalExclusao(false);

            }
        }

        return (
            abrirModalExclusao && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black opacity-50 pointer-events-none"></div>

                    {/* Modal */}
                    <div className="relative w-full md:w-3/12 bg-white p-2 rounded-md shadow-sm shadow-[#242222] z-50">
                        <div className="flex w-full justify-between">
                            <span className="w-fit flex flex-row items-center font-semibold bold text-lg">
                                <AlertCircle className="text-red-600 me-1" /> ATENÇÃO!
                            </span>
                            <X
                                className="cursor-pointer"
                                onClick={() => setAbrirModalExclusao(false)}
                            />
                        </div>
                        <div>
                            <span className="text-base">Ao excluir este barbeiro, o <b>usuário</b> dele também será <b>excluído</b>. <br></br> Continua?</span>
                        </div>
                        <div className="md:w-full flex md:gap-2 justify-end">
                            <button
                                type="button"
                                className="font-semibold md:mt-4 flex justify-center text-white bg-[#444444] p-2 rounded-md md:w-fit w-full"
                                onClick={() => setAbrirModalExclusao(false)}
                            >
                                <X className="me-1" /> Não
                            </button>
                            <button
                                type="button"
                                className="font-semibold md:mt-4 flex justify-center text-white bg-[#242222] p-2 rounded-md md:w-fit w-full"
                                onClick={() => excluirBarbeiro(id)}
                            >
                                Sim <ArrowRightCircle className="ms-1" />
                            </button>
                        </div>
                    </div>
                </div>
            )
        );

    }

    function ModalLinkTipoServico({ barbeiro }) {

        const [servicos, setServicos] = useState([]);
        const [servicosBarbeiro, setServicosBarbeiro] = useState([]);

        useEffect(() => {
            (async () => {

                // Todos os serviços
                const servicos = await listService();

                // Serviços ja vinculados ao barbeiro
                const servicos_barbeiro = await getServicos(barbeiro.id);

                setServicos(servicos.dados);
                setServicosBarbeiro(servicos_barbeiro.dados);
            })();
        }, [barbeiro.id])

        return (
            abrirModalLink && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black opacity-50 pointer-events-none"></div>

                    {/* Modal */}
                    <div className="relative w-full md:w-3/12 bg-white p-2 rounded-md shadow-sm shadow-[#242222] z-50">
                        <div className="flex w-full justify-between">
                            <span className="w-fit flex flex-row items-center font-semibold bold text-lg">
                                <BriefcaseBusiness className="text-blue-600 me-1" /> Serviços prestados por {barbeiro.usuario}
                            </span>
                            <X
                                className="cursor-pointer"
                                onClick={() => setAbrirModalLink(false)}
                            />
                        </div>
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex w-full mt-4">
                                <div className="w-full">
                                    <label className="block font-semibold">Serviço</label>
                                    <select className="w-full rounded-sm border-b border-[#242222] p-1 text-[#242222] outline-none uppercase">
                                        <option value={''}>SELECIONE 1 SERVIÇO</option>
                                        {
                                            servicos.filter(servico => !servicosBarbeiro.some(
                                                s => s.id === servico.id
                                            )).map(service => {
                                                return (
                                                    <option value={service.id}>{service.nome}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="w-full">
                                tipos de serviço vinculados
                            </div>
                        </div>

                    </div>
                </div>
            )
        )
    }
}


