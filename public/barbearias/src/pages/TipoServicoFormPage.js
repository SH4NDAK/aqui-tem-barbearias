import { CloudUpload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Row from "../components/Row";

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
                    <Row>
                        <Col
                            variant="auto"
                        >
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
                        <Col
                            variant={"auto"}
                        >
                            <InputText
                                label="Valor"
                                pattern="[0-9*]"
                                monetario={true}
                                {...register("valor", {
                                    required: "Campo obrigatório",
                                    min: {
                                        value: 0,
                                        message: "Digite um valor válido"
                                    }
                                })}
                                errors={errors.valor}
                                variant={errors.valor ? 'invalid' : ''}
                                onChange={(e) => {
                                    const valor = e.currentTarget.value
                                    e.currentTarget.value = isNaN(valor) ? "" : valor

                                    // formatando o valor

                                }}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            variant={"full"}
                        >
                            <Button
                                className="float-end"
                                type="submit"
                                icon={<CloudUpload/>}
                            >
                                Cadastrar
                            </Button>
                        </Col>
                    </Row>

                </form>
            </FormContainer>
        </Container >
    )

}