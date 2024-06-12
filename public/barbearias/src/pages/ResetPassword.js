import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Row from "../components/Row";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";


export default function RegisterPage() {

    const navigate = useNavigate(false);

    const [verSenha, setVerSenha] = useState(false);

    const handleIconClick = () => {
        // 'ver senha' será o contrario do estado anterior de 'ver senha'
        setVerSenha(!verSenha)
    }


    return (
        <Container>
            <FormContainer
                title="Redefinir senha"
            >
                <div className="w-full flex flex-col gap-2">
                    <form>
                        <Row>
                            <Col>
                                <InputText
                                    label="Senha"
                                    type={verSenha ? 'text' : 'password'}
                                    placeholder="Digite sua senha"
                                    icon={verSenha ? <EyeOff /> : <Eye />}
                                    onIconClick={handleIconClick}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputText
                                    label="Senha"
                                    type={verSenha ? 'text' : 'password'}
                                    placeholder="Confirme sua senha"
                                    icon={verSenha ? <EyeOff /> : <Eye />}
                                    onIconClick={handleIconClick}
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
                                    Alterar Senha
                                </Button>
                            </div>
                        </Row>
                    </form>
                </div>
            </FormContainer>
        </Container>
    )
}