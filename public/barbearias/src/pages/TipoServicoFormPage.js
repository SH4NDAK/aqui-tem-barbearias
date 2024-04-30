import { useState } from "react";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import { useLocation } from "react-router-dom";
import InputText from "../components/InputText";

export default function TipoServicoFormPage() {
    const location = useLocation();
    // verificando se o tipo de serviço foi passado para esta pagina, se sim, é uma edição
    const isCadastro = !location.state?.tipoServico;

    return (
        <Container
            variant="start"
        >
            <FormContainer
                title={`Tipos de Serviço - ${isCadastro ? "Cadastro" : "Edição"}`}
                variant="row"
            >
                <form>
                    <InputText
                        
                    />

                </form>

            </FormContainer>
        </Container>
    )

}