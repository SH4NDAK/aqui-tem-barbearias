import Scheduler from 'devextreme-react/scheduler';
import { locale } from 'devextreme/localization';
import { ArrowLeftCircle, CloudUpload, Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Col from '../components/Col';
import FormContainer from '../components/FormContainer';
import InputText from '../components/InputText';
import Row from '../components/Row';
import Selectpicker from '../components/Selectpicker';
import { useForm } from 'react-hook-form';

const currentDate = new Date();
const views = [];

export default function AgendaPage() {
    const [abrirModalAgendamento, setAbrirModalAgendamento] = useState(false);

    const onAppointmentClick = () => {
        alert("abrir o modal")
    }

    const handleNovoAgendamento = () => {
        setAbrirModalAgendamento(true);
    }

    // setando o local como brasil
    useEffect(() => {
        locale('pt-BR')
    }, []);

    // a altura da agenda, sera o tamanho da tela do usuario -150 pixels
    const height = window.innerHeight - 150;

    return (
        <>
            <div className='flex flex-col justify-center h-dvh bg-[#242222] p-12'>
                <div className='bg-white w-full p-1 flex flex-col justify-center items-center text-3xl font-semibold rounded-t-md'>
                    <div>Agenda</div>
                    <Button
                        variant="icon"
                        icon={<Plus />}
                        onClick={handleNovoAgendamento}
                    ></Button>

                </div>
                <div className='w-full h-full bg-white rounded-b-md'>
                    <Scheduler
                        timeZone="America/Sao_Paulo"
                        // dataSource={data}
                        views={views}
                        currentView="agenda"
                        defaultCurrentDate={currentDate}
                        height={height}
                        onAppointmentClick={onAppointmentClick}
                    >

                    </Scheduler>
                </div>
            </div>

            {abrirModalAgendamento && (
                <ModalAgendamento
                    onClose={() => { setAbrirModalAgendamento(false) }}
                />
            )}
        </>
    )
}

const ModalAgendamento = ({ onClose }) => {

    // trazendo as operações de formulário da biblioteca hook form
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();


    return (
        <dialog
            className='w-fit fixed top-1/2 bottom-1/2 z-10 bg-gray-50 shadow-sm shadow-[#242222] rounded-md p-2'
            open="true"
        >
            <div className='w-full flex items-center gap-4 mb-2 justify-between'>
                <div className='text-lg font-semibold capitalize'>
                    Novo agendamento
                </div>
                <div
                    className='p-0.5 cursor-pointer transition-colors rounded-full hover:bg-gray-100'
                    onClick={onClose}
                >
                    <X className='text-gray-500' />
                </div>
            </div>
            <FormContainer variant="modal">
                <form onSubmit={handleSubmit(onsubmit)}>

                    <Row>
                        <Selectpicker
                            label="Cliente"
                        >
                            <option>Arthur</option>
                        </Selectpicker>
                        <Selectpicker
                            label="Serviços"
                        >
                            <option>Serviços do amigo</option>
                        </Selectpicker>
                    </Row>
                    <Row>
                        <Col>
                            <InputText
                                type="text"
                                label="Valor"
                                inputMode="numeric"
                                monetario={true}
                                placeholder="Valor do serviço"
                                {...register("valor", {
                                    required: "Campo obrigatório", min: {
                                        value: 0,
                                        message: "Digite um valor válido"
                                    }
                                })}
                                errors={errors.valor}
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
                        <Col>
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
                        <Col>
                            <InputText
                                type="text"
                                label="Observação (opcional)"
                                placeholder="Alguma observação para este agendamento"
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
                                    variant="gray"
                                    type="button"
                                    icon={<ArrowLeftCircle className="me-1" />}
                                    onClick={onClose}
                                >
                                    Voltar
                                </Button>

                                <Button
                                    type="submit"
                                    icon={<CloudUpload className='me-1' />}
                                >
                                    Salvar
                                </Button>

                            </div>
                        </Col>
                    </Row>
                </form>

            </FormContainer>
        </dialog>
    )
}
