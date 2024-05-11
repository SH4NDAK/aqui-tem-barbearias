import { ArrowLeftCircle, ArrowRightCircle, Calendar } from "lucide-react";
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

    return (
        <Container>
            <Row>
                <Col variant={"1/2"}>
                    <div className="bg-white rounded-md shadow-sm shadow-black">
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
                        <Row className={"p-2 justify-center items-center"}>
                            <Col variant={"auto"}>
                                <Card
                                    icon={<Calendar />}
                                    title={"AGENDA"}
                                    description={"Gerencie e agende seus serviços aqui."}
                                    onClick={handleAgendaClick}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
