import { useState } from "react";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import { useLocation } from "react-router-dom";
import InputText from "../components/InputText";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Col from "../components/Col";

export default function TipoServicoFormPage() {
    const location = useLocation();

    // verificando se o tipo de serviço foi passado para esta pagina, se sim, é uma edição
    const isCadastro = !location.state?.tipoServico;

    // trazendo as operações de formulário da biblioteca hook form
    const { register, handleSubmit, formState: { errors } } = useForm();

    // função chamada ao submeter o formulario
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Container
            variant="start"
        >
            <FormContainer
                title={`Tipos de Serviço - ${isCadastro ? "Cadastro" : "Edição"}`}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div
                        className="w-full flex"
                    >
                        <Col>
                            <InputText
                                type="text"
                                placeholder="Digite um nome"
                                label="Nome"
                                {...register("nome", {
                                    required: "Campo obrigatório",
                                    minLength: {
                                        value: 3,
                                        message: "Informe pelo menos 3 caracteres"
                                    }
                                })}
                                errors={errors.nome}
                                variant={errors.nome ? 'invalid' : ''}
                            />
                        </Col>

                    </div>

                    <Button
                        type="submit"
                    >
                        Cadastrar
                    </Button>

                </form>
            </FormContainer>
        </Container>
    )

}