
import { Button } from "antd";
import { Bell, Briefcase, Calendar, LogOutIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { setLogoutUser } from "../services/auth";
import { ROLES } from "../utils/role";
import logo from "../img/logo_header.jpg"

export default function Header() {
    const navigate = useNavigate();
    // use state pra controlar se quem ta acessando essa tela é um barbeiro ou cliente
    // aplicar a logica aqui
    const [user, setUser] = useState();

    useEffect(() => {
        const user = localStorage.getItem('usuario');
        setUser(JSON.parse(user))
    }, [])
    const handlePerfilClick = () => {
        if (!user) {
            return navigate("/login")
        }
        navigate("/perfil")
    }

    const handleNotificationsClick = () => {
        alert("em desenvolvimento")
    }

    const handleAgendaClick = () => {
        if (!user) {
            return navigate("/login")
        }
        navigate("/agenda")
    }

    const signOut = () => {
        setLogoutUser()
        return navigate("/")
    }

    return (

        <div className="relative w-full bg-[#1c1a1a] h-16 shadow-sm shadow-[#242222] mb-4">
            <div className="p-2 w-full h-full flex justify-between">
                <a href="/">
                    <img src={logo} width={128} />
                </a>
                <div>
                    <a href="/home">
                        <img src={logo} width={128} />
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    {user &&
                        <Button
                            className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                            type={"button"}
                            icon={<LogOutIcon />}
                            onClick={signOut}
                            variant={"icon"}
                        />
                    }
                    <button
                        className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                        type="button"
                        onClick={handleAgendaClick}
                    >
                        <Calendar />
                    </button>
                    {user && user?.cargo != ROLES.Cliente && (
                        <button
                            className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                            type="button"
                            onClick={() => navigate("/tipos-servico")}
                        >
                            <Briefcase />
                        </button>
                    )
                    }
                    {user &&
                        <button
                            className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                            type="button"
                            onClick={handleNotificationsClick}
                        >
                            <Bell />
                        </button>
                    }
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