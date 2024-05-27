
import { Bell, Calendar, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate();


    // use state pra controlar se quem ta acessando essa tela é um barbeiro ou cliente
    // aplicar a logica aqui
    const [isCliente, setIsCliente] = useState(true);

    const handlePerfilClick = () => {
        navigate("/perfil")
    }

    const handleNotificationsClick = () => {
        alert("em desenvolvimento")
    }

    const handleAgendaClick = () => {
        navigate("/agenda")
    }



    return (


        <div className="relative w-full bg-[#1c1a1a] h-16 shadow-sm shadow-[#242222] mb-4">
            <div className="p-2 w-full h-full flex justify-between">
                <div>
                    a
                </div>
                <div className="flex items-center gap-4">
                    {
                        !isCliente && (
                            <button
                                className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                                type="button"
                                onClick={handleAgendaClick}
                            >
                                <Calendar />
                            </button>
                        )
                    }
                    <button
                        className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                        type="button"
                        onClick={handleNotificationsClick}
                    >
                        <Bell />
                    </button>
                    <button
                        className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                        type="button"
                        onClick={handlePerfilClick}
                    >
                        <User />
                    </button>
                </div>
            </div>
        </div>
    )
}