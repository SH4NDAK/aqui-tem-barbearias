import { ArrowRightCircle, Building, Calendar, PlusCircle, Scissors, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { ROLES } from "../../utils/role";


export default function Home() {
    const navigate = useNavigate();

    const [user, setUser] = useState();

    useEffect(() => {
        const user = localStorage.getItem('usuario');
        setUser(JSON.parse(user))
    }, [])

    const handleAgendaClick = () => {
        navigate("/agenda")
    }

    const handleTipoServicoClick = () => {
        navigate("/tipos-servico")
    }

    const handleUsuariosClick = () => {
        navigate("/usuarios")
    }

    const handleMinhasBarbearias = () => {
        alert("Em desenvolvimento")
    }

    const handleAcessarBarbearia = () => {
        alert("Em desenvolvimento")
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
                                        <Card
                                            onClick={handleUsuariosClick}
                                            icone={<User className="me-1" />}
                                            titulo={"Barbeiros"}
                                        />
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
                                                        placeholder="Informe o código da barbearia "
                                                    />
                                                    <div className="p-1 rounded-md">
                                                        <Search />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-4xl md:text-5xl font-semibold">Minhas barbearias</span>
                                            </div>
                                            <div className="w-full self-center h-0.5 bg-[#242222] opacity-5"></div>
                                            <div className="w-full flex flex-row flex-wrap gap-4">
                                                <div className="md:w-3/12 w-full">
                                                    <div className="p-1 w-full flex flex-col bg-gray-200 rounded-md shadow-sm shadow-[#242222] gap-2">
                                                        <div className="w-full flex gap-2 flex-row items-center">
                                                            <div className="text-white w-16 bg-[#242222] h-16 rounded-full">
                                                                logo da barbearia se tiver
                                                            </div>
                                                            <div className="font-semibold text-lg">
                                                                Martins
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="flex flex-row justify-center w-full bg-[#242222] rounded-md shadow-sm shadow-[#242222] p-1.5 text-white font-semibold text-end hover:bg-[#1b1919] transition-colors"
                                                                onClick={handleAcessarBarbearia}
                                                            >
                                                                Acessar <ArrowRightCircle className="ms-1" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="md:w-3/12 w-full">
                                                    <div className="p-1 w-full flex flex-col bg-gray-200 rounded-md shadow-sm shadow-[#242222] gap-2">
                                                        <div className="w-full flex gap-2 flex-row items-center">
                                                            <div className="text-white w-16 bg-[#242222] h-16 rounded-full">
                                                                logo da barbearia se tiver
                                                            </div>
                                                            <div className="font-semibold text-lg">
                                                                Martins
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="flex flex-row justify-center w-full bg-[#242222] rounded-md shadow-sm shadow-[#242222] p-1.5 text-white font-semibold text-end hover:bg-[#1b1919] transition-colors"
                                                                onClick={handleAcessarBarbearia}
                                                            >
                                                                Acessar <ArrowRightCircle className="ms-1" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
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