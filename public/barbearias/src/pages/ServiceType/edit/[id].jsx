import { ArrowLeftCircle, CloudUpload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import FormContainer from "../../../components/FormContainer";
import InputText from "../../../components/InputText";
import Row from "../../../components/Row";
import LayoutPage from "../../../components/LayoutPage";
import { editService, takeUniqueService } from "../../../services/service";
import { useEffect, useState } from "react";
import { TimePicker, notification } from "antd";
import dayjs from "dayjs";
import { isAxiosError } from "axios";
import Header from "../../../components/Header";

export default function EditTipoServico() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    const [serviceData, setServiceData] = useState(null);

    const onSubmit = async (data) => {
        try {
            await editServiceType(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const { dados } = await takeUniqueService(id);
                console.log(dados);
                if (dados && dados.length > 0) {
                    setServiceData(dados[0]);
                    setValue("nome", dados[0].nome);
                    setValue("descricao", dados[0].descricao);
                    setValue("preco", dados[0].preco);
                    setValue("duracao", dados[0].duracao);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const editServiceType = async (record) => {
        console.log(record)
        try {
            await editService(id, {
                ...record,
                ativo: serviceData.ativo.toString(),
                duracao: record.duracao,
                preco: record.preco.toString()
            });
            notification.success({
                message: "Sucesso",
                description: "Item editado com sucesso",
            });

            navigate("/tipos-servico")
        } catch (error) {
            if (!isAxiosError(error)) return
            const { data } = error.response
            notification.error({ message: data.mensagem });
        }
    };

    return (
        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className="w-full flex justify-center p-1 mt-4">
                <div className="flex flex-col bg-white md:w-1/3 p-2 shadow-sm shadow-[#242222] rounded-md w-full">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Tipos de serviço - Edição</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center mt-4 mb-4 opacity-5"></div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Campos do formulário */}
                        <Row>
                            <Col variant="auto">
                                <InputText
                                    type="text"
                                    placeholder="Digite um nome"
                                    label="Nome"
                                    {...register("nome", {
                                        required: "Campo obrigatório",
                                        minLength: {
                                            value: 3,
                                            message: "Informe pelo menos 3 caracteres",
                                        },
                                    })}
                                    errors={errors.nome}
                                    variant={errors.nome ? "invalid" : ""}
                                />
                            </Col>
                            <Col variant="auto">
                                <InputText
                                    type="text"
                                    placeholder="Digite um nome"
                                    label="Descrição"
                                    {...register("descricao", {
                                        required: "Campo obrigatório",
                                        minLength: {
                                            value: 3,
                                            message: "Informe pelo menos 3 caracteres",
                                        },
                                    })}
                                    errors={errors.descricao}
                                    variant={errors.descricao ? "invalid" : ""}
                                />
                            </Col>
                        </Row>
                        {serviceData && (
                            <Row>
                                <Col variant="auto">
                                    <InputText
                                        type="text"
                                        label="Preço"
                                        monetario={true}
                                        inputMode="numeric"
                                        {...register("preco", {
                                            required: "Campo obrigatório",
                                            min: {
                                                value: 0,
                                                message: "Digite um preço válido",
                                            },
                                        })}
                                        errors={errors.preco}
                                        variant={errors.preco ? "invalid" : ""}
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
                                <Col variant="auto">
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
                        )}
                        <Row>
                            <Col variant="full">
                                <div className="flex gap-4 justify-end">
                                    <Button
                                        type="button"
                                        icon={<ArrowLeftCircle className="me-1" />}
                                        onClick={() => { navigate(-1) }}
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        type="submit"
                                        icon={<CloudUpload className="me-1" />}
                                    >
                                        Salvar edição
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        </div>
    );
}
