import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import Row from "../components/Row";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from 'react';
import OtpContext from '../pages/Otpcontext';
import InputText from '../components/InputText';

export default function Verification() {
    const [enteredOtp, setEnteredOtp] = useState('');
    const { otp, setOTP } = useContext(OtpContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Ao montar o componente, verifica se há um OTP armazenado
    useEffect(() => {
        const storedOTP = localStorage.getItem('otp');
        if (storedOTP) {
            setOTP(parseInt(storedOTP, 10));
        }
    }, []);

    const validateOtp = (e) => {
        e.preventDefault();  // Evita o comportamento padrão do formulário

        if (parseInt(enteredOtp, 10) === otp) {
            alert('Código validado com sucesso!');
            localStorage.removeItem('otp'); // Remove o OTP do localStorage após o uso
            navigate("/reset");
        } else {
            alert('Código inválido.');
        }
    };

    return (
        <Container>
            <FormContainer title="Verificar E-mail">
                <div className="w-full flex flex-col gap-2">
                    <form onSubmit={validateOtp}>
                        <Row>
                            <Col>
                                <InputText
                                    type="text"
                                    value={enteredOtp}
                                    onChange={(e) => setEnteredOtp(e.target.value)}
                                    placeholder="Digite o código"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <div className="flex w-full justify-center">
                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Validar código
                                </Button>
                            </div>
                        </Row>
                    </form>
                </div>
            </FormContainer>
        </Container>
    );
}
