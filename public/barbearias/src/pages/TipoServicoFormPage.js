import { ArrowLeftCircle, CloudUpload } from "lucide-react";
import { set, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Row from "../components/Row";
import Label from "../components/Label";

export default function TipoServicoFormPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // verificando se o tipo de serviço foi passado para esta pagina, se sim, é uma edição
    const isCadastro = !location.state?.tipoServico;

    // trazendo as operações de formulário da biblioteca hook form
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // função chamada ao submeter o formulario
    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <Container
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
                                type="text"
                                label="Valor"
                                monetario={true}
                                inputMode="numeric"
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

                                    // formatando o valor em dinheiro
                                    //pegando o valor atual 
                                    let valor = e.currentTarget.value;

                                    // removendo os caracteres não numéricos
                                    valor = valor.replace(/\D/g, '');

                                    // pegando o valor digitado em inteiro (dividindo por 100 pra tratar os centavos)
                                    valor = parseInt(valor, 10) / 100;

                                    // se o valor não é valido (não é um numero)
                                    if (isNaN(valor)) {

                                        // seta ele como vazio e não continua o código
                                        valor = '';
                                        e.currentTarget.value = valor;
                                        return;
                                    }

                                    // se ta tudo certo, formata o valor
                                    valor = valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                    // atualizando o campo do input com o valor
                                    e.currentTarget.value = valor;

                                    // definindo o valor do input como o novo valor e validando no useForm
                                    setValue("valor", e.currentTarget.value, { shouldValidate: true });
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            variant={"auto"}
                        >
                            <InputText
                                type="text"
                                className="w-full"
                                label="Duração"
                                inputMode="numeric"
                                {...register("duracao", {
                                    required: "Campo obrigatório",
                                    min: {
                                        value: 0,
                                        message: "Digite uma duração válida"
                                    }
                                })}
                                errors={errors.duracao}
                                variant={errors.duracao ? 'invalid' : ''}
                                unidadeMedida="min"
                            />
                        </Col>
                        <Col
                            variant={"auto"}
                        >
                            <div class="w-full">
                                <Label
                                    label="Vincular barbeiros (opcional)"
                                />
                                <select
                                    className="w-full rounded-sm border-b border-[#242222] p-1 text-[#242222] outline-none uppercase "
                                >
                                    <option value="brazil">martins</option>

                                    <option value="brazil">martins</option>
                                    <option value="brazil">martins</option>
                                    <option value="brazil">martins</option>
                                </select>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            variant={"full"}
                        >
                            <div
                                className="flex gap-4 justify-end"
                            >
                                <Button
                                    type="button"
                                    icon={<ArrowLeftCircle />}
                                    onClick={() => { navigate("/tipo-servico") }}
                                >
                                    Voltar
                                </Button>

                                <Button
                                    type="submit"
                                    icon={<CloudUpload />}
                                >
                                    Cadastrar
                                </Button>

                            </div>
                        </Col>
                    </Row>

                </form>
            </FormContainer>
        </Container >
    )

}