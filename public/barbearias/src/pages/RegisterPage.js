import { ArrowLeft, ArrowLeftCircle, Plus } from "lucide-react";
import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Row from "../components/Row";
import logo from "./img/logo.jpg";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {

    const navigate = useNavigate(false);


    return (
        <Container>
            <FormContainer
                title="Criar conta"
            >
                <div className="w-full flex justify-center font-bold text-5xl">
                    <img src={logo} width={"70%"}/>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <form>
                        <Row>
                            <Col>
                                <InputText
                                    label="Nome"
                                    type="text"
                                    placeholder="Digite seu nome"
                                />
                            </Col>
                            <Col>
                                <InputText
                                    label="Email"
                                    type="text"
                                    placeholder="Digite seu e-mail"
                                />
                            </Col>
                            <Col>
                                <InputText
                                    label="Telefone"
                                    type="text"
                                    placeholder="Digite seu telefone"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputText
                                    label="Senha"
                                    type="password"
                                    placeholder="Digite uma senha"
                                />
                            </Col>
                            <Col>
                                <InputText
                                    label="Confirmar senha"
                                    type="password"
                                    placeholder="Confirme a senha"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col variant={"auto"}>
                                <Button
                                    type="button"
                                    variant="gray"
                                    icon={<ArrowLeftCircle className="me-1" />}
                                    onClick={(e) => { navigate("/login") }}
                                >
                                    Voltar
                                </Button>
                            </Col>
                            <Col variant={"auto"}>
                                <Button
                                    type="submit"
                                    icon={<Plus className="me-1" />}
                                >
                                    Criar
                                </Button>
                            </Col>
                        </Row>

                    </form>
                </div>
            </FormContainer>
        </Container>
    )
}