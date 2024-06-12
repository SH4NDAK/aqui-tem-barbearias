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
import Selectpicker from "../components/Selectpicker";
import LayoutPage from "../components/LayoutPage";
import { createService } from "../services/service";
import Header from "../components/Header";
import { notification } from "antd";
import { isAxiosError } from "axios";

export default function TipoServicoFormPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // verificando se o tipo de serviço foi passado para esta pagina, se sim, é uma edição
    const isCadastro = !location.state?.tipoServico;

    // trazendo as operações de formulário da biblioteca hook form
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // função chamada ao submeter o formulario
    const onSubmit = async (data) => {
        try {
            await createService(data);
            notification.success({
                message: "Tipo de serviço cadastrado com sucesso"
            });

            setValue("nome", '')
            setValue("descricao", '')
            setValue("preco", '')
            setValue("duracao", '');


        } catch (error) {
            if (!isAxiosError(error)) return
            const { data } = error.response
            notification.error({ message: data.mensagem });
        }
    }


    return (
        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className="w-full flex justify-center p-1">
                <div className="flex flex-col bg-white md:w-1/3 p-2 shadow-sm shadow-[#242222] rounded-md w-full">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Tipos de serviço - Cadastro</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center mt-4 mb-4 opacity-5"></div>
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
                                variant="auto"
                            >
                                <InputText
                                    type="text"
                                    placeholder="Digite um nome"
                                    label="Descrição"
                                    {...register("descricao", {
                                        required: "Campo obrigatório",
                                        minLength: {
                                            value: 3,
                                            message: "Informe pelo menos 3 caracteres"
                                        }
                                    })}
                                    errors={errors.descricao}
                                    variant={errors.descricao ? 'invalid' : ''}
                                />
                            </Col>
                            <Col
                                variant={"auto"}
                            >
                                <InputText
                                    type="text"
                                    placeholder="Informe um preço"
                                    label="Preço"
                                    monetario={true}
                                    inputMode="numeric"
                                    {...register("preco", {
                                        required: "Campo obrigatório",
                                        min: {
                                            value: 0,
                                            message: "Digite um preco válido"
                                        }
                                    })}
                                    errors={errors.preco}
                                    variant={errors.preco ? 'invalid' : ''}
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
                                        setValue("preco", e.currentTarget.value, { shouldValidate: true });
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
                                    placeholder="Informe a duração em minutos"
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
                                    onChange={(e) => {

                                        // formatando o valor em dinheiro
                                        //pegando o valor atual 
                                        let duracao = e.currentTarget.value;

                                        // removendo os caracteres não numéricos
                                        duracao = duracao.replace(/\D/g, '');

                                        // se o duracao não é valido (não é um numero)
                                        if (isNaN(duracao)) {
                                            // seta ele como vazio e não continua o código
                                            duracao = '';
                                            e.currentTarget.value = duracao;
                                            return;
                                        }

                                        // atualizando o campo do input com o duracao
                                        e.currentTarget.value = duracao;

                                        // definindo o duracao do input como o novo duracao e validando no useForm
                                        setValue("duracao", e.currentTarget.value, { shouldValidate: true });
                                    }}
                                />
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
                                        onClick={() => { navigate(-1) }}
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
                </div>

            </div>
        </div >

    )

}