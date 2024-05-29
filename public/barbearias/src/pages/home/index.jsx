import { ArrowRightCircle, Calendar, Scissors, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";


export default function Home() {
    const navigate = useNavigate();


    const handleAgendaClick = () => {
        navigate("/agenda")
    }

    const handleTipoServicoClick = () => {
        navigate("/tipos-servico")
    }

    const handleUsuariosClick = () => {
        navigate("/usuarios")
    }


    return (
        <>

            <div className="w-full h-dvh bg-[#242222]">
                <Header />

                <div className="flex justify-center items-center p-1">
                    <div className="p-2 flex flex-col md:w-1/2 w-full bg-white h-1/2 shadow-sm shadow-black rounded-md">
                        <div className="flex justify-center mb-4">
                            <span className="md:text-5xl sm:text-4xl font-semibold">Menu principal</span>
                        </div>
                        <div className="flex justify-center w-full">
                            <div className="bg-[#242222] h-0.5 w-11/12 mt-1 mb-4 opacity-5"></div>
                        </div>
                        <div className="w-full flex flex-col gap-4 md:flex-row justify-center flex-grow-0">
                            <Card
                                onClick={handleAgendaClick}
                                icone={<Calendar className="me-1" />}
                                titulo={"Agenda"}
                            />
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