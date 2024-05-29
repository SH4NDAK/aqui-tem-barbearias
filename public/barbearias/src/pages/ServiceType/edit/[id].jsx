import { ArrowLeftCircle, CloudUpload } from "lucide-react";
import { set, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import FormContainer from "../../../components/FormContainer";
import InputText from "../../../components/InputText";
import Row from "../../../components/Row";
import Selectpicker from "../../../components/Selectpicker";
import LayoutPage from "../../../components/LayoutPage";
import { createService, editService } from "../../../services/service";
import { useEffect } from "react";
import { notification } from "antd";
 
export default function EditTipoServico() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
 
    // trazendo as operações de formulário da biblioteca hook form
    const { register, handleSubmit, formState: { errors }, setValue, form } = useForm();
 
    // função chamada ao submeter o formulario
    const onSubmit = async (data) => {
        try {
            await deleteServiceType(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            () => {
                
            }
        } catch (error) {
            
        }
    }, [])
 
    const deleteServiceType = async (record) => {
        try {
            await editService(record.id, {
                ativo: "false",
                descricao: record.descricaoServico,
                duracao: record.duracaoServico,
                nome: record.nomeServico,
                preco: record.precoServico.toString(),
                usuarioId: record.usuarioIdServico.toString()
            })
            notification.success({
                message: "Sucesso",
                description: "Item excluido com sucesso"
            })
        } catch (error) {
            console.log(error)
        }
    };
 
    return (
        <LayoutPage>
            <Container>
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
                                    label="preco"
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
                                    type="time"
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
                                />
                            </Col>
                            <Selectpicker
                                label="Vincular barbeiros (opcional)"
                                {...register("usuarioId")}
                            >
                            </Selectpicker>
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
                </FormContainer>
            </Container >
        </LayoutPage>
    )
 
}