
import { Button, Dropdown, Menu } from "antd";
import { Bell, Briefcase, Calendar, Home, LogOutIcon, MenuIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { setLogoutUser } from "../services/auth";
import { ROLES } from "../utils/role";
import logo from "../img/logo_header.jpg"
import useIsTouchDevice from "../utils/isTouchMobile";

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
    if (!useIsTouchDevice()) {
        return (
            <div className="relative w-full bg-[#1c1a1a] h-16 shadow-sm shadow-[#242222]">
                <div className="p-2 w-full h-full flex justify-between">
                    <a href="/home">
                        <img src={logo} width={128} />
                    </a>
                    <div className="flex items-center gap-4">
                        <button
                            className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                            type="button"
                            onClick={() => navigate("/home")}
                        >
                            <Home />
                        </button>
                        {user && user?.cargo != ROLES.Cliente && (
                            <>
                                <button
                                    className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                                    type="button"
                                    onClick={handleAgendaClick}
                                >
                                    <Calendar />
                                </button>
                            </>
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

                        {user &&
                            <Button
                                className="outline outline-1 p-1.5 outline-white rounded-sm text-white hover:bg-white hover:text-black transition-colors"
                                type={"button"}
                                icon={<LogOutIcon />}
                                onClick={signOut}
                                variant={"icon"}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="relative w-full flex flex-row-reverse items-center p-4 bg-[#1c1a1a] h-16 shadow-sm shadow-[#242222]">
            <Dropdown
                overlay={
                    <Menu>
                        <Menu.Item key="0" onClick={() => navigate("/home")}>
                            <Home />
                        </Menu.Item>
                        {user && user?.cargo != ROLES.Cliente && (
                            <Menu.Item key="1" >
                                <Calendar />
                            </Menu.Item>
                        )}
                        <Menu.Item key="2" >
                            <User />
                        </Menu.Item>
                        {user &&
                            <Menu.Item key="3" >
                                <LogOutIcon />
                            </Menu.Item>
                        }
                    </Menu>
                }
            >
                <MenuIcon />
            </Dropdown>
        </div>
    )
}