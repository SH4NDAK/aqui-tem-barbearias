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

export default function EditTipoServico() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    const [serviceData, setServiceData] = useState(null);

    const onSubmit = async (data) => {
        console.log(data);
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
                if (dados && dados.length > 0) {
                    setServiceData(dados[0]);
                    setValue("nome", dados[0].nomeServico);
                    setValue("descricao", dados[0].descricaoServico);
                    setValue("preco", dados[0].precoServico);
                    setValue("duracao", dayjs(dados[0].duracaoServico, 'HH:mm'));
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
                ativo: serviceData.ativoServico.toString(),
                duracao: record.duracao.format('HH:mm'),
                preco: record.preco.toString()
            });
            notification.success({
                message: "Sucesso",
                description: "Item editado com sucesso",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LayoutPage>
            <Container>
                <FormContainer title={`Tipos de Serviço - Edição`}>
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
                        <label className="">Duração</label>
                        <TimePicker
                            className="w-full border border-[#242222] rounded p-1 text-[#242222] outline-none"
                            placeholder="Selecione a duração"
                            format="HH:mm"
                            value={getValues("duracao") || undefined}
                            onChange={(value) => setValue("duracao", value, { shouldValidate: true })}
                        />
                        </Col>
                    </Row>
                    )}
                    <Row>
                    <Col variant="full">
                        <div className="flex gap-4 justify-end">
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
                            Editar
                        </Button>
                        </div>
                    </Col>
                    </Row>
                </form>
                </FormContainer>
            </Container>
        </LayoutPage>
    );
}
