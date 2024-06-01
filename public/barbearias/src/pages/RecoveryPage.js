import { ArrowLeft, ArrowLeftCircle, Plus } from "lucide-react";
import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Row from "../components/Row";
import logo from "../img/logo.jpg"
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {

    const navigate = useNavigate(false);


    return (
        <Container>
            <FormContainer
                title="Recuperar Senha"
            >
                <div className="w-full flex flex-col gap-2">
                    <form>
                        <Row>
                            <Col>
                                <InputText
                                    label="E-mail"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <div className="flex w-full  justify-center">
                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Enviar e-mail de redefinição de senha
                                </Button>
                            </div>
                        </Row>

                        <div
                            className="flex text-sm mt-2 mb-4 font-bold justify-center"
                        >
                            OU
                        </div>
                        <div>
                            <span
                                className="text-sm"
                            >
                                Quer voltar para o login? Clique <a className="text-blue-700 font-bold" href="/">aqui!</a>
                            </span>
                        </div>

                    </form>
                </div>
            </FormContainer>
        </Container>
    )
}