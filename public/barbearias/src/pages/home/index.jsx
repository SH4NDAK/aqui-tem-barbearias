import { AlertCircle, ArrowRightCircle, Blocks, Building, Calendar, MailOpen, PlusCircle, Scissors, Search, Store, Trash, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { ROLES } from "../../utils/role";
import { linkClienteBarbearia, searchBarbearia, searchByCliente, unklinkClienteBarbearia } from "../../services/barbearia";
import { notification } from 'antd';
import { isAxiosError } from "axios";



export default function Home() {
    const navigate = useNavigate();

    const [user, setUser] = useState();
    const [codigo, setCodigo] = useState('');
    const [barbearia, setBarbearia] = useState(null);
    const [barbearias, setBarbearias] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem('usuario');
        setUser(JSON.parse(user));
    }, []);

    // Quando popula o usuário, se for cliente, pega as barbearias que ele tem vinculo
    useEffect(() => {
        if (!!user && user.cargo == ROLES.Cliente) {

            // Pesquisa as barbearias que ele tem vinculo ativo
            (async () => {
                handleMinhasBarbearias();
            })();

        }
    }, [user])

    const handleAgendaClick = () => {
        navigate("/agenda")
    }

    const handleTipoServicoClick = () => {
        navigate("/tipos-servico")
    }

    const handleUsuariosClick = () => {
        navigate("/barbeiros")
    }

    const handleMinhasBarbearias = async () => {
        const res = await searchByCliente(user);
        setBarbearias(res);
    }

    const handlePesquisarBarbearia = async () => {
        try {
            if (!codigo) return;

            const res = await searchBarbearia(codigo, user);

            if (res.length === 0) {
                notification.error({
                    message: "Nenhuma barbearia encontrada"
                })
            }
            setBarbearia(res[0]);
        } catch (e) {
            console.log(e);

        }
    }

    return (
        <>

            <div className="w-full h-dvh bg-[#242222]">
                <Header />

                <div className="flex justify-center items-center p-1">
                    <div className="p-2 flex flex-col md:w-1/2 w-full bg-white h-1/2 shadow-sm shadow-black rounded-md">
                        <div className="flex justify-center mb-4">
                            <span className="md:text-5xl text-4xl font-semibold">Menu principal</span>
                        </div>
                        <div className="flex justify-center w-full">
                            <div className="bg-[#242222] h-0.5 w-11/12 mt-1 mb-4 opacity-5"></div>
                        </div>
                        <div className="w-full flex flex-col gap-4 md:flex-row justify-center flex-grow-0">
                            {
                                user?.cargo != ROLES.Cliente ? (
                                    <>

                                        <Card
                                            onClick={handleTipoServicoClick}
                                            icone={<Scissors className="me-1" />}
                                            titulo={"Tipos de serviço"}
                                        />
                                        {
                                            user?.cargo == ROLES.Administrador && (
                                                <Card
                                                    onClick={handleUsuariosClick}
                                                    icone={<User className="me-1" />}
                                                    titulo={"Barbeiros"}
                                                />
                                            )
                                        }
                                        <Card
                                            onClick={handleAgendaClick}
                                            icone={<Calendar className="me-1" />}
                                            titulo={"Agenda"}
                                        />
                                    </>
                                )
                                    : (
                                        <div className="w-full flex flex-col justify-center items-center gap-4">
                                            <div className="md:w-96 p-2 bg-gray-200 w-full rounded-sm shadow-sm shadow-[#242222] cursor-pointer hover:scale-105 transition-all">
                                                <div className="flex flex-row items-center">
                                                    <PlusCircle className="me-1" />
                                                    <span className="font-semibold">Entrar em uma barbearia</span>
                                                </div>
                                                <div className="flex flex-row items-center w-full mt-2">
                                                    <input
                                                        type="text"
                                                        className="w-full p-2 rounded-sm bg-gray-50 outline outline-2 outline-[#242222]"
                                                        placeholder="Informe o código da barbearia"
                                                        maxLength={6}
                                                        value={codigo}
                                                        onChange={(e) => setCodigo(e.currentTarget.value)}
                                                    />
                                                    <div className="p-1 rounded-md">
                                                        <Search
                                                            onClick={handlePesquisarBarbearia}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-4xl md:text-5xl font-semibold">Minhas barbearias</span>
                                            </div>
                                            <div className="w-full self-center h-0.5 bg-[#242222] opacity-5"></div>
                                            <div className="w-full flex flex-row flex-wrap gap-4">
                                                {
                                                    barbearias.length > 0 ? barbearias.map(barbearia => {
                                                        return (
                                                            <CardBarbearias
                                                                barbearia={barbearia}
                                                                user={user}
                                                            />
                                                        )
                                                    })
                                                        :
                                                        (
                                                            <div className="p-2 flex justify-center w-full">
                                                                <span className="text-2xl font-semibold">Nenhuma barbearia encontrada</span>

                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>

                {
                    barbearia && (
                        <ModalAuthBarbearia
                            barbearia={barbearia}
                        />
                    )
                }
            </div>
        </>
    );

    function ModalAuthBarbearia({ barbearia }) {

        const vincularClienteBarbearia = async () => {
            try {
                const res = await linkClienteBarbearia(user.id, barbearia.id);

                if (!!res.sucesso) {
                    notification.success({
                        message: "Convite aceito com sucesso!"
                    });
                }

                setBarbearia(null);
                setCodigo('');
                handleMinhasBarbearias();

                // Carregar barbearias vinculadas novamente
            } catch (error) {
                setBarbearia(null)
                setCodigo('');

            }
        }
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50 pointer-events-none"></div>

                <div className="relative w-full md:w-3/12 bg-white p-2 rounded-md shadow-sm shadow-[#242222] z-50">
                    <div className="flex w-full justify-between">
                        <span className="w-fit flex flex-row items-center font-semibold bold text-lg">
                            <MailOpen className="text-blue-600 me-1" /> Convite de barbearia
                        </span>
                        <X
                            className="cursor-pointer"
                            onClick={() => setBarbearia(null)}
                        />
                    </div>
                    <div>
                        Você recebeu um convite da barberia <b>{barbearia.nome}</b> para se tornar um cliente. Você poderá agendar seus próximos serviços acessando a agenda da barbearia. <br /> Aceita?
                    </div>
                    <div className="md:w-full flex md:gap-2 justify-end">
                        <button
                            type="button"
                            className="font-semibold md:mt-4 flex justify-center text-white bg-[#444444] p-2 rounded-md md:w-fit w-full"
                            onClick={() => setBarbearia(null)}
                        >
                            <X className="me-1" /> Não
                        </button>
                        <button
                            type="button"
                            className="font-semibold md:mt-4 flex justify-center text-white bg-[#242222] p-2 rounded-md md:w-fit w-full"
                            onClick={vincularClienteBarbearia}
                        >
                            Sim <ArrowRightCircle className="ms-1" />
                        </button>
                    </div>
                </div>
            </div>
        )

    }

    function CardBarbearias({ user, barbearia }) {
        const [abrirModalUnlink, setAbrirModalUnlink] = useState(false);

        const handleAcessarBarbearia = (barbearia) => {
            navigate("/agenda", { state: barbearia })
        };

        return (
            <>
                <div className="md:w-4/12 w-full">
                    <div className="p-1 w-full flex flex-col bg-gray-200 rounded-md shadow-sm shadow-[#242222] gap-2">
                        <div className="w-full flex gap-2 flex-row items-center">
                            <div className="flex justify-center items-center text-white w-16 bg-[#242222] h-16 rounded-full">
                                <Store size={48} />
                            </div>
                            <div className="font-semibold text-lg">
                                {barbearia.nome}
                            </div>
                        </div>
                        <div className="w-full flex gap-2">
                            <button
                                className="flex flex-row justify-center w-full bg-red-600 rounded-md shadow-sm shadow-[#242222] p-1.5 text-white font-semibold text-end hover:bg-[#ae2323] transition-colors"
                                onClick={() => setAbrirModalUnlink(true)}
                            >
                                <Trash className="me-1" /> Desvincular
                            </button>
                            <button
                                className="flex flex-row justify-center w-full bg-[#242222] rounded-md shadow-sm shadow-[#242222] p-1.5 text-white font-semibold text-end hover:bg-[#1b1919] transition-colors"
                                onClick={() => handleAcessarBarbearia(barbearia)}
                            >
                                Acessar <ArrowRightCircle className="ms-1" />
                            </button>
                        </div>
                    </div>
                </div>
                {abrirModalUnlink && (
                    <ModalDesvincularBarbearia
                        barbearia={barbearia}
                        usuario={user}
                        onClose={() => { setAbrirModalUnlink(false) }}
                    />
                )}
            </>
        );
    }

    function ModalDesvincularBarbearia({ usuario, barbearia, onClose }) {

        const desvincularClienteBarbearia = async () => {
            try {
                await unklinkClienteBarbearia(usuario.id, barbearia.id);
                notification.success({ message: "Usuário desvinculado com sucesso" });
                onClose();
                handleMinhasBarbearias();
            } catch (error) {
                console.log(error);

            }
        };

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="relative w-full md:w-3/12 bg-white p-2 rounded-md shadow-sm shadow-[#242222] z-50">
                    <div className="flex w-full justify-between">
                        <span className="w-fit flex flex-row items-center font-semibold bold text-lg">
                            <AlertCircle className="text-red-600 me-1" /> ATENÇÃO
                        </span>
                        <X
                            className="cursor-pointer"
                            onClick={onClose}
                        />
                    </div>
                    <div>
                        Ao continuar, você deixará de ser cliente da barbearia <b>{barbearia.nome}</b>. Para voltar a ser um cliente você deverá solicitar o código de autenticação da barbearia <b>{barbearia.nome}</b> novamente. <br /> Continua?
                    </div>
                    <div className="md:w-full flex md:gap-2 justify-end">
                        <button
                            type="button"
                            className="font-semibold md:mt-4 flex justify-center text-white bg-[#444444] p-2 rounded-md md:w-fit w-full"
                            onClick={onClose}
                        >
                            <X className="me-1" /> Cancelar
                        </button>
                        <button
                            type="button"
                            className="font-semibold md:mt-4 flex justify-center text-white bg-red-600 p-2 rounded-md md:w-fit w-full hover:bg-[#ae2323] transition-colors"
                            onClick={desvincularClienteBarbearia}
                        >
                            Desvincular <ArrowRightCircle className="ms-1" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function Card({ onClick, icone, titulo }) {
    return (
        <div
            className="p-2 bg-gray-200 md:w-48 sm:w-full rounded-sm shadow-sm shadow-[#242222] cursor-pointer hover:scale-105 transition-all"
            onClick={onClick}
        >
            <div className="flex flex-row items-center">
                {icone} <span className="font-semibold">{titulo}</span>
            </div>
            <div className="w-full mt-3">
                <button
                    className="flex flex-row justify-center w-full bg-[#242222] rounded-md shadow-sm shadow-[#242222] p-1.5 text-white font-semibold text-end hover:bg-[#1b1919] transition-colors"
                    onClick={onClick}
                >
                    Acessar <ArrowRightCircle className="ms-1" />
                </button>
            </div>
        </div>
    )
}


