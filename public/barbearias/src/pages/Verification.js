import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Row from "../components/Row";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const location = useLocation()
    const navigate = useNavigate(false);
    console.log(location.state)

    // const{email, otp, setPage} = useContext(RecoveryContext);


    return (
        <Container>
            <FormContainer
                title="Verificar E-mail"
            >
                <div className="w-full flex flex-col gap-2">
                    <form>
                        <Row>
                            <Col>
                                <InputText
                                    label="Código"
                                    type="text"
                                    placeholder="Digite código"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <div className="flex w-full  justify-center">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    onClick={() => navigate("/reset")}
                                >
                                    Validar código
                                </Button>
                            </div>
                        </Row>
                    </form>
                </div>
            </FormContainer>
        </Container>
    )
}