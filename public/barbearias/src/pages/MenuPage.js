import { ArrowLeftCircle, ArrowRightCircle, Calendar, Handshake, Settings } from "lucide-react";
import Col from "../components/Col";
import Container from "../components/Container";
import Row from "../components/Row";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

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
