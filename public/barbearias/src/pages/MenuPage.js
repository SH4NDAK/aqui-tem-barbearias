import { Bell, BellDot, BellRing, Calendar, Handshake, Settings, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Col from "../components/Col";
import Container from "../components/Container";
import Row from "../components/Row";
import logo from "../img/logo.jpg";


export default function MenuPage() {

    const navigate = useNavigate();

    const handleAgendaClick = () => {
        navigate("/agenda")
    }

    const handleTipoServicoClick = () => {
        navigate("/tipo-servico")
    }

    const handleSettingsClick = () => {
        alert("Funcionalidade ainda não disponível")
    }

    return (
        <Container>
            <div className="fixed bg-white top-0 left-0 w-full shadow-sm shadow-[#242222]">
                <div className="w-full flex justify-between items-center p-2">
                    <div className="w-fit cursor-pointer">
                        <img src={logo} width={64} />
                    </div>
                    <div className="w-auto">
                        <div className="flex gap-2 items-center">
                            <button
                                type="button"
                                className="p-1 rounded-full transition-colors hover:bg-gray-200"
                            >
                                <Bell
                                    size={32}
                                />
                            </button>
                            <button 
                                type="button"
                                className="p-1 rounded-full transition-colors hover:bg-gray-200"
                            >
                                <UserCircle2
                                    size={32}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Row className={"w-auto"}>
                <Col>
                    <div className="p-4 bg-white rounded-md shadow-sm shadow-black">
                        <Row className={"justify-center"}>
                            <Col variant={"auto"} className={"text-center"}>
                                <span className="font-bold text-4xl">MENU PRINCIPAL</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col variant={'auto'} className={"flex justify-center"}>
                                <div className="w-1/2 h-0.5 bg-gray-200"></div>
                            </Col>
                        </Row>
                        <Row>
                            <Card
                                icon={<Calendar />}
                                title={"AGENDA"}
                                onClick={handleAgendaClick}
                            />
                        </Row>
                        <Row>
                            <Card
                                icon={<Handshake />}
                                title={"TIPOS DE SERVIÇO"}
                                onClick={handleTipoServicoClick}
                            />
                        </Row>
                        <Row>
                            <Card
                                icon={<Settings />}
                                title={"Configurações"}
                                onClick={handleSettingsClick}
                            />
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
