import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpContext from '../pages/Otpcontext'; // Verifique o caminho de importação
import { listByEmail } from '../services/barbeiro';
import Button from '../components/Button';
import Col from '../components/Col';
import Container from '../components/Container';
import FormContainer from '../components/FormContainer';
import InputText from '../components/InputText';
import Row from '../components/Row';


export default function RecoveryPage() {

    const [email, setEmail] = useState('');
    const { updateOtp } = useContext(OtpContext);
    const navigate = useNavigate();


    function navigateToOtp(){
        if (email){
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            console.log(OTP);
            updateOtp(OTP);
            navigate('/verification');

        }
    }

    const ListarUsuarioEmail = async () => {
        const res = await listByEmail(email);
        navigate({ state: res })   
    }
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
                                    onChange={(e) => {
                                        setEmail(e.currentTarget.value)
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <div className="flex w-full  justify-center">
                                <Button
                                    type="button"
                                    className="w-full"
                                    // onClick={() => ListarUsuarioEmail(email)}
                                    onClick={() => {ListarUsuarioEmail(email);
                                        navigateToOtp()}}
                                                    
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
