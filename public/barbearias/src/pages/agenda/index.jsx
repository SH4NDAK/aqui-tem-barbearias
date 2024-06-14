import { ArrowLeftCircle, ArrowRightCircle, CalendarDays, MailOpen, Pencil, WandIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InputText from "../../components/InputText";
import Selectpicker from "../../components/Selectpicker";
import { cancelarSolicitacao, saveAgenda, verificarCliente } from "../../services/agenda";
import { listByServico } from "../../services/barbeiro";
import { listService } from "../../services/service";
import { ROLES } from "../../utils/role";
import { notification } from "antd";

export default function Agenda() {
    const location = useLocation();
    const navigate = useNavigate();
    const [agendas, setAgendas] = useState([]);
    const [user, setUser] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [barbeiros, setBarbeiros] = useState(null);
    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const [solicitado, setSolicitado] = useState(null);
    const [modalCancelamento, setModalCancelamento] = useState(false);


    useEffect(() => {
        (async () => {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            setUser(usuario);

            // Se for cliente, carrega os tipos de serviço da barbearia e verifica se ele tem algum agendamento pendente
            if (usuario.cargo === ROLES.Cliente) {

                const res = await verificarCliente(usuario.usuario);
                if (res.dados[0]) {
                    res.dados[0].data = formatarData(res.dados[0].data);
                }

                setSolicitado(res.dados[0]);

                // Serviços da barbearia
                const { dados } = await listService();
                setServicos(dados);
            }
        })();
    }, []);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const handlePesquisarBarbeiros = async (servicoSelecionado) => {

        if (!servicoSelecionado) {
            setBarbeiros(null);
            return;
        }

        // Barbeiros que trabalham com este serviço
        const { dados } = await listByServico(servicoSelecionado);
        setBarbeiros(dados);
    };

    const handleEditar = async () => {
        const dados = solicitado;
        setSolicitado(false);

        console.log(dados);
        setValue("id_tipo_servico", dados.id_tipo_servico, { shouldValidate: true });
        await handlePesquisarBarbeiros(dados.id_tipo_servico);
        setValue("id_usuario_dono", dados.id_usuario_dono);
        setValue("data", formatarData(dados.data, true))
        setValue("horario", dados.horario)
        setValue("observacao", dados.observacao)
    }

    const handleCancelarAgendamento = () => {
        setModalCancelamento(true)
    }

    const onSubmit = async (data) => {

        // Adiciona o nome do cliente se o agendamento tiver sendo feito por ele
        if (user.cargo == ROLES.Cliente) {
            data.NomeDoCliente = user.usuario
        }

        try {
            await saveAgenda(data);
            setModalConfirmacao(true);
        } catch (error) {
            console.error(error);
        }

    };

    const formatarData = (data, inverso = false) => {
        if (inverso) {
            let [dia, mes, ano] = data.split("/")
            return [ano, mes, dia].join('-');
        }

        const [ano, mes, dia] = data.split("-");
        return [dia, mes, ano].join('/');
    }

    const validarData = (value) => {
        console.log(value);
        const selectedDate = new Date(value);
        const today = new Date();

        // Comparando as datas
        if (selectedDate < today) {
            return "A data não pode ser anterior a hoje";
        }

        return true;
    };


    return (
        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className='flex flex-col justify-center'>
                {location.state && (
                    <div className='w-full mt-4 bg-white p-1 flex flex-col justify-center items-center rounded-md md:w-11/12 self-center'>
                        <div className='text-3xl font-semibold'>
                            Barbearia {(location.state.nome).toUpperCase()}
                        </div>
                        {
                            !solicitado ? (
                                <>
                                    <div className='w-full md:w-11/12 mt-4 mb-4'>
                                        <div className='self-start text-xl'>
                                            Olá <b>{user?.usuario}</b>! Que bom te ter por aqui, vamos agendar seu próximo serviço?
                                        </div>
                                    </div>
                                    <div className='w-full md:w-11/12'>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div>
                                                <Selectpicker
                                                    label="Serviço"
                                                    {...register("id_tipo_servico", {
                                                        required: "Campo obrigatório",
                                                        onChange: (e) => {
                                                            setValue("id_tipo_servico", e.currentTarget.value, { shouldValidate: true });
                                                            handlePesquisarBarbeiros(e.currentTarget.value);
                                                        }
                                                    })}
                                                    errors={errors.servico}
                                                >
                                                    <option value=''>{servicos.length === 0 ? 'NENHUM SERVIÇO ENCONTRADO' : 'SELECIONE 1'}</option>
                                                    {servicos.map(servico => (
                                                        <option key={servico.id} value={servico.id}>{servico.nome}</option>
                                                    ))}
                                                </Selectpicker>

                                                {barbeiros && (
                                                    <>
                                                        <div className='mt-4 transition-all'>
                                                            <Selectpicker
                                                                label="Barbeiro"
                                                                onChange={(e) => {
                                                                    const barbeiroId = e.currentTarget.value;
                                                                    setValue("id_usuario_dono", barbeiroId, { shouldValidate: true });
                                                                }}
                                                                {...register("id_usuario_dono", {
                                                                    required: "Campo obrigatório"
                                                                })}
                                                                errors={errors.barbeiro}
                                                            >
                                                                <option value=''>SELECIONE 1</option>
                                                                {barbeiros.map(barbeiro => (
                                                                    <option key={barbeiro.id} value={barbeiro.id}>{barbeiro.usuario}</option>
                                                                ))}
                                                            </Selectpicker>
                                                        </div>

                                                        <div className='flex flex-col md:flex-row gap-4 w-full'>
                                                            <div className="md:w-1/2">
                                                                <InputText
                                                                    type="date"
                                                                    label="Data"
                                                                    {...register("data", {
                                                                        required: "Campo Obrigatório",
                                                                        validate: validarData
                                                                    })}
                                                                    variant={errors.data ? 'invalid' : ''}
                                                                />
                                                            </div>
                                                            <div className="md:w-1/2">
                                                                <InputText
                                                                    type="time"
                                                                    label="Horario"
                                                                    inputMode="numeric"
                                                                    {...register("horario", { required: "Campo Obrigatório" })}
                                                                    variant={errors.horario ? 'invalid' : ''}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='w-full'>
                                                            <InputText
                                                                type="text"
                                                                label="Observação (opcional)"
                                                                placeholder="Alguma observação para este agendamento"
                                                                {...register("observacao")}
                                                            />
                                                        </div>

                                                        <div className='md:mt-4 w-full gap-4 flex flex-col md:flex-row'>
                                                            <Button
                                                                variant="gray"
                                                                type="button"
                                                                icon={<ArrowLeftCircle className="me-1" />}
                                                                onClick={() => navigate("/home")}
                                                                className="w-full"
                                                            >
                                                                Voltar
                                                            </Button>
                                                            <Button
                                                                icon={<CalendarDays className='me-1' />}
                                                                className="w-full"
                                                            >
                                                                Solicitar agendamento
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </form>

                                    </div>
                                </>
                            )
                                : (
                                    <>
                                        <div className="text-lg">
                                            Bem vindo de volta <b>{(user.usuario).toUpperCase()}</b>!, verificamos que você solicitou um agendamento na nossa barbearia, aqui está:
                                        </div>
                                        <div className="w-full md:w-6/12 bg-gray-100 p-2 rounded-md shadow-sm shadow-[#242222]">
                                            <div className="text-base"><b>Data: </b> {solicitado.data}</div>
                                            <div className="text-base"><b>Horário: </b> {solicitado.horario}h</div>
                                            <div className="text-base"><b>Observação: </b> {solicitado.observacao}</div>
                                            <div className="text-base"><b>Status: </b> <span className={`font-semibold ${solicitado.aprovado ? 'text-blue-600' : 'text-yellow-400'}`}>{solicitado.aprovado ? 'APROVADO' : 'PENDENTE'}</span></div>
                                            {
                                                !solicitado.aprovado && (
                                                    <div className="w-full flex flex-col md:flex-row gap-4 justify-end">
                                                        <button
                                                            className="w-full md:w-fit flex flex-row justify-center items-center bg-[#242222] p-2 shadow-sm shadow-[#242222] text-white font-semibold rounded-md"
                                                            onClick={() => handleEditar(solicitado)}
                                                        >
                                                            <Pencil className="me-1" /> Editar dados
                                                        </button>
                                                        <button
                                                            className="w-full md:w-fit flex flex-row justify-center items-center bg-red-600 p-2 shadow-sm shadow-[#242222] text-white font-semibold rounded-md"
                                                            onClick={() => handleCancelarAgendamento(solicitado)}
                                                        >
                                                            <X className="me-1" /> Cancelar agendamento
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </>
                                )
                        }

                    </div>
                )}

                {
                    modalConfirmacao && (
                        <ModalConfirmacaoAgendamento />
                    )
                }

                {
                    modalCancelamento && (
                        <ModalCancelamento
                            solicitado={solicitado}
                        />
                    )
                }
            </div>
        </div>
    );

    function ModalConfirmacaoAgendamento() {

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50 pointer-events-none"></div>

                <div className="relative w-full md:w-3/12 bg-white p-2 rounded-md shadow-sm shadow-[#242222] z-50">
                    <div className="flex w-full justify-between">
                        <span className="w-fit flex flex-row items-center font-semibold bold text-lg">
                            <MailOpen className="text-blue-600 me-1" /> Solicitação confirmada!
                        </span>
                        <X
                            className="cursor-pointer"
                            onClick={() => navigate("/home")}
                        />
                    </div>
                    <div>
                        Sua solicitação de agendamento com a barbearia com foi enviada sucesso!, volte mais tarde para verificar a situação do agendamento.
                    </div>
                    <div className="md:w-full flex md:gap-2 justify-end">
                        <button
                            type="button"
                            className="font-semibold md:mt-4 flex justify-center text-white bg-[#242222] p-2 rounded-md md:w-fit w-full"
                            onClick={() => navigate("/home")}
                        >
                            <ArrowRightCircle className="me-1" /> Entendi
                        </button>

                    </div>
                </div>
            </div>
        )

    }

    function ModalCancelamento({ solicitado }) {

        const handleCancelar = async () => {
            await cancelarSolicitacao(solicitado.id);
            notification.success({ message: "Solicitação cancelada com sucesso" });
            navigate(0);
            setModalCancelamento(false)
        }

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50 pointer-events-none"></div>

                <div className="relative w-full md:w-3/12 bg-white p-2 rounded-md shadow-sm shadow-[#242222] z-50">
                    <div className="flex w-full justify-between">
                        <span className="w-fit flex flex-row items-center font-semibold bold text-lg">
                            <X className="text-red-600 me-1" /> Cancelar agendamento
                        </span>
                        <X
                            className="cursor-pointer"
                            onClick={() => setModalCancelamento(false)}
                        />
                    </div>
                    <div>
                        Tem certeza que deseja cancelar a solicitação de agendamento? essa ação é irreversível.
                    </div>
                    <div className="md:w-full flex md:gap-2 justify-end">
                        <button
                            type="button"
                            className="font-semibold md:mt-4 flex justify-center text-white bg-[#444444] p-2 rounded-md md:w-fit w-full"
                            onClick={() => setModalCancelamento(false)}
                        >
                            <X className="me-1" /> Não
                        </button>
                        <button
                            type="button"
                            className="font-semibold md:mt-4 flex justify-center text-white bg-[#242222] p-2 rounded-md md:w-fit w-full"
                            onClick={handleCancelar}
                        >
                            Sim <ArrowRightCircle className="ms-1" />
                        </button>

                    </div>
                </div>
            </div>
        )

    }
}
