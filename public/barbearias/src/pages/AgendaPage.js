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
import SideBar from '../components/SideBar';
import LayoutPage from '../components/LayoutPage';
import { listAgenda, saveAgenda } from '../services/agenda';
import { Switch, notification } from 'antd';
import { data } from './data';

const currentDate = new Date();
const views = [];

export default function AgendaPage() {
    const [abrirModalAgendamento, setAbrirModalAgendamento] = useState(false);
    const [agenda, setAgenda] = useState([])


    const Appointment = (e) => {  // arrumar depois
        let findAgenda = agenda.find(i => i.id === e.data.targetedAppointmentData.assigneeId) || {};
        return (
            <div className='flex flex-col'>
                <h1>{findAgenda.servico}</h1>
                <h2>{findAgenda.nomeDoCliente}</h2>
            </div>
        )
    };
    

    const onAppointmentFormOpening = (e) => { // quando a edição de agenda estiver pronto retornar isso
        let findAgenda = agenda.find(i => i.id === e.appointmentData.assigneeId) || {};
        console.log(e);
        console.log(findAgenda.nomeDoCliente);
        e.form.option('items', [
        {
          label: {
            text: 'Cliente',
          },
          editorType: 'dxSelectBox',
          dataField: 'nomeDoCliente',
          editorOptions: {
            valueExpr: 'nomeDoCliente',
            value: findAgenda.nomeDoCliente,
          },
        },
        {
          label: {
            text: 'Serviços',
          },
          editorType: 'dxSelectBox',
          dataField: 'nomeDoCliente',
          editorOptions: {
            valueExpr: 'nomeDoCliente',
            value: findAgenda.nomeDoCliente,
          },
        },
        {
          label: {
            text: 'Valor',
          },
          editorType: 'dxSelectBox',
          dataField: 'nomeDoCliente',
          editorOptions: {
            valueExpr: 'nomeDoCliente',
            value: findAgenda.nomeDoCliente,
          },
        },
        {
          label: {
            text: 'Duração',
          },
          editorType: 'dxSelectBox',
          dataField: 'nomeDoCliente',
          editorOptions: {
            valueExpr: 'nomeDoCliente',
            value: findAgenda.nomeDoCliente,
          },
        },
        {
          label: {
            text: 'Dia',
          },
          editorType: 'dxSelectBox',
          dataField: 'nomeDoCliente',
          editorOptions: {
            valueExpr: 'nomeDoCliente',
            value: findAgenda.nomeDoCliente,
          },
        },
        {
          label: {
            text: 'Horario',
          },
          editorType: 'dxSelectBox',
          dataField: 'nomeDoCliente',
          editorOptions: {
            valueExpr: 'nomeDoCliente',
            value: findAgenda.nomeDoCliente,
          },
        },
        {
          label: {
            text: 'Observação (opcional)',
          },
          editorType: 'dxSelectBox',
          dataField: 'nomeDoCliente',
          editorOptions: {
            width: '100%',
            type: 'datetime',
            valueExpr: 'nomeDoCliente',
            value: findAgenda.nomeDoCliente,
          },
        },
        {
          label: {
            text: 'Valor Pago',
          },
          editorType: 'dxSelectBox',
          dataField: 'nomeDoCliente',
          editorOptions: {
            width: '100%',
            type: 'datetime',
            valueExpr: 'nomeDoCliente',
            value: findAgenda.nomeDoCliente,
          },
        },
        ]);
    };

    const handleNovoAgendamento = () => {
        setAbrirModalAgendamento(true);
    }

    // setando o local como brasil
    useEffect(() => {
        (async () => {
            try {
                const data = await listAgenda()
                setAgenda(data.dados)
            } catch (error) {
                console.log(error);
            }
        })()
        locale('pt-BR')
    }, []);

    // a altura da agenda, sera o tamanho da tela do usuario -150 pixels
    const height = window.innerHeight - 150;
      
    // função para calcular a data final com base na data e hora de início e na duração
    function calcularEndDate(data, horario, duracao) {
        const [horasInicio, minutosInicio] = horario.split(':').map(Number);
        const [ano, mes, dia] = data.split('-').map(Number); // Ajustando para o formato 'AAAA-MM-DD'
    
        const dataInicio = new Date(ano, mes - 1, dia, horasInicio, minutosInicio);
        
        // Separando a duração em horas e minutos
        const [horasDuracao, minutosDuracao] = duracao.split(':').map(Number);
    
        // Calculando o tempo total em minutos
        const totalMinutos = horasDuracao * 60 + minutosDuracao;
    
        // Adicionando os minutos de duração ao horário de início
        const endDate = new Date(dataInicio.getTime() + totalMinutos * 60 * 1000);
    
        return endDate;
    }
    
    

    return (
        <LayoutPage>
            <SideBar>
                <div className='flex flex-col justify-center h-dvh bg-[#242222] p-12'>
                    <div className='bg-white w-full p-1 flex flex-col justify-center items-center text-3xl font-semibold rounded-t-md'>
                        <div>Agenda</div>
                        <Button
                            variant="icon"
                            icon={<Plus />}
                            onClick={handleNovoAgendamento}
                        />

                    </div>
                    <div className='w-full h-full bg-white rounded-b-md'>
                        <Scheduler
                            timeZone="America/Sao_Paulo"
                            dataSource={agenda?.map(compromisso => {
                                return {
                                  text: compromisso.servico,
                                  startDate: new Date(compromisso.data + 'T' + compromisso.horario),
                                  endDate: calcularEndDate(compromisso.data, compromisso.horario, compromisso.duracao),
                                  assigneeId: compromisso.id, // ou qualquer outra propriedade que desejar usar
                                  priorityId: 1, // ou qualquer outra propriedade que desejar usar
                                };
                              })}
                            views={views}
                            currentView="agenda"
                            defaultCurrentDate={currentDate}
                            height={height}
                            // appointmentComponent={Appointment}
                            onAppointmentFormOpening={onAppointmentFormOpening}
                        />
                    </div>
                </div>

                {abrirModalAgendamento && (
                    <ModalAgendamento
                        onClose={() => { setAbrirModalAgendamento(false) }}
                    />
                )}
            </SideBar>
        </LayoutPage>
    )
}

const ModalAgendamento = ({ onClose }) => {
    // trazendo as operações de formulário da biblioteca hook form
    const { register, handleSubmit,  formState: { errors }, setValue } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await saveAgenda(data)
            notification.success({
                message: "Sucesso",
                description: res.mensagem
            })
        } catch (error) {
            notification.warning({
                message: "Error",
                description: "Ocorreu um erro inesperado"
            })
        }
    }

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
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Row>
                        <Selectpicker
                            label="Cliente"
                            {...register("nomeDoCliente", { required: "Campo obrigatório" })}
                        >
                            <option>Arthur</option>
                        </Selectpicker>
                        <Selectpicker
                            label="Serviços"
                            {...register("servico", { required: "Campo obrigatório" })}
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
                                {...register("preco", {
                                    required: "Campo obrigatório", min: {
                                        value: 0,
                                        message: "Digite um valor válido"
                                    }
                                })}
                                errors={errors.preco}
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
                        <Col>
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
                                unidadeMedida="min"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText
                                type="date"
                                className="w-full"
                                label="Dia"
                                inputMode="numeric"
                                {...register("data", {
                                    required: "Campo obrigatório"
                                })}
                                errors={errors.data}
                            />
                        </Col>
                        <Col>
                            <InputText
                                type="time"
                                className="w-full"
                                label="Horario"
                                inputMode="numeric"
                                {...register("horario", {
                                    required: "Campo obrigatório",
                                    min: {
                                        value: 0,
                                        message: "Digite uma duração válida"
                                    }
                                })}
                                errors={errors.horario}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputText
                                type="text"
                                label="Observação (opcional)"
                                placeholder="Alguma observação para este agendamento"
                                {...register("descricao")}
                                errors={errors.descricao}
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
