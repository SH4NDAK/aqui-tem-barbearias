import Col from "../components/Col";
import Container from "../components/Container";
import Row from "../components/Row";

export default function MenuPage() {
    return (
        <Container>
            <Row>
                <Col variant={"1/2"}>
                    <div className="bg-white rounded-sm shadow-sm shadow-black">
                        <Row className={"justify-center"}>
                            <Col variant={"auto"}>
                                <span>MENU PRINCIPAL</span>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
