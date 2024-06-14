import { ArrowLeftCircle, ArrowRightCircle, Calendar, CalendarDays, CheckCircle, CloudUpload, MailOpen, Pencil, Plus, Search, WandIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InputText from "../../components/InputText";
import Selectpicker from "../../components/Selectpicker";
import { aprovarReprovarAgendamento, cancelarSolicitacao, editarAgendamento, listarAgendamentos, saveAgenda, verificarCliente } from "../../services/agenda";
import { getServicos, listByCargo, listByServico } from "../../services/barbeiro";
import { listService } from "../../services/service";
import { ROLES } from "../../utils/role";
import { notification } from "antd";
import Label from "../../components/Label";

export default function Agenda() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [barbeiros, setBarbeiros] = useState(null);
    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const [solicitado, setSolicitado] = useState(null);
    const [modalCancelamento, setModalCancelamento] = useState(false);
    const [modalAgendamento, setModalAgendamento] = useState(false);
    const [isEdicao, setIsEdicao] = useState(false);

    const [cancelar, setCancelar] = useState();

    // Pesquisa de agendamentos
    const [data, setData] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [aprovados, setAprovados] = useState(false);
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        (async () => {
            await new Promise(async resolve => {
                const usuario = JSON.parse(localStorage.getItem('usuario'));
                setUser(usuario);

                if (usuario.cargo === ROLES.Administrador) {
                    navigate("/home");
                }

                // Se for cliente, carrega os tipos de serviço da barbearia e verifica se ele tem algum agendamento pendente
                if (usuario.cargo === ROLES.Cliente) {

                    const res = await verificarCliente(usuario.usuario);

                    if (res.dados) {
                        res.dados.forEach(dado => {
                            dado.data = formatarData(res.dados[0].data);
                        })
                    }

                    setSolicitado(res.dados);

                    // Serviços da barbearia
                    const { dados } = await listService();
                    setServicos(dados.filter(servico => !!servico.ativo || servico.ativo == 'true'));
                }
                resolve();
            })
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

    const handlePesquisarAgendamentos = async () => {
        const { dados } = await listarAgendamentos(user.id, data, cliente, aprovados);
        setAgendamentos(dados);
    }

    const handleEditar = async (solicitado) => {
        const dados = solicitado;
        setIsEdicao(true);
        setSolicitado(false);
        setValue("id_tipo_servico", dados.id_tipo_servico, { shouldValidate: true });
        await handlePesquisarBarbeiros(dados.id_tipo_servico);
        setValue("id_usuario_dono", dados.id_usuario_dono);
        setValue("data", formatarData(dados.data, true))
        setValue("horario", dados.horario)
        setValue("observacao", dados.observacao)
    }

    const handleCancelarAgendamento = (solicitado) => {
        setCancelar(solicitado);
        setModalCancelamento(true);
    }

    const handleAprovarReprovarAgendamento = async (agendamento, aprovar) => {
        try {
            const { dados } = await aprovarReprovarAgendamento(agendamento, aprovar);

            // Função para encontrar o agendamento no array baseado em critérios
            const findAgendamento = (item) => {
                return (
                    item.data === agendamento.data &&
                    item.horario === agendamento.horario &&
                    item.id_tipo_servico === agendamento.id_tipo_servico &&
                    item.id_usuario_dono === agendamento.id_usuario_dono
                    // Adicione mais critérios se necessário
                );
            };

            // Encontrar o índice do agendamento no array de agendamentos
            const index = agendamentos.findIndex(findAgendamento);

            if (index !== -1) {
                // Substituir o agendamento antigo pelo agendamento atualizado
                agendamentos[index] = dados;

                // Atualizar o estado dos agendamentos (se você estiver usando React)
                setAgendamentos([...agendamentos]);
            }

            notification.success({ message: `Solicitação de agendamento ${aprovar ? 'aprovada' : 'reprovada'} com sucesso` });
        } catch (error) {
            console.error(error);
            notification.error({ message: `Erro ao ${aprovar ? 'aprovar' : 'reprovar'} agendamento` });
        }
    };

    const onSubmit = async (data) => {

        // Adiciona o nome do cliente se o agendamento tiver sendo feito por ele
        if (user.cargo == ROLES.Cliente) {
            data.NomeDoCliente = user.usuario
        }

        if (user.cargo == ROLES.Barbeiro) {
            data.aprovado = true;
        }

        try {
            isEdicao ? await editarAgendamento(data) : await saveAgenda(data);
            user.cargo == ROLES.Cliente ? setModalConfirmacao(true) : setModalAgendamento(false);

            if (user.cargo == ROLES.Barbeiro) {
                notification.success({ message: "Agendamento cadastrado com sucesso" });
            }

        } catch (error) {
            console.error(error);
        }
        finally {
            setValue("NomeDoCliente", "");
            setValue("id_tipo_servico", '');
            setValue("data", '');
            setValue("horario", '');
            setValue("observacao", '');
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

    const handleModalAgendamento = () => {
        (async () => {
            const { dados } = await getServicos(user.id);
            setServicos(dados);
            setBarbeiros([user]);
            setValue("id_usuario_dono", user.id)
        })();
        setModalAgendamento(true);
    }

    return (
        <div className="w-full h-dvh min-h-full bg-[#242222]">
            <Header />
            <div className='flex flex-col justify-center'>
                {
                    location.state ? (
                        <div className='w-full mt-4 bg-white p-1 flex flex-col justify-center items-center rounded-md md:w-11/12 self-center'>
                            <div className='text-3xl font-semibold'>
                                Barbearia {(location.state.nome).toUpperCase()}
                            </div>
                            {
                                !solicitado || solicitado.length == 0 ? (
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
                                                                            required: "Campo Obrigatório"
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
                                                                    onClick={() => user.cargo == ROLES.Barbeiro ? setModalAgendamento(false) : navigate("/home")}
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
                                            <div className="md:w-fit w-full">
                                                <Button
                                                    onClick={() => setSolicitado(false)}
                                                >
                                                    <Plus className="me-1" /> Novo agendamento
                                                </Button>
                                            </div>
                                            <div className="text-xl">
                                                Meus agendamentos
                                            </div>

                                            {solicitado.map(s => {
                                                return (
                                                    <div className="w-full md:w-6/12 bg-gray-100 p-2 rounded-md shadow-sm shadow-[#242222] mb-2">
                                                        <div className="text-base"><b>Data: </b> {s.data}</div>
                                                        <div className="text-base"><b>Horário: </b> {s.horario}h</div>
                                                        <div className="text-base"><b>Observação: </b> {s.observacao}</div>
                                                        <div className="text-base"><b>Status: </b> <span className={`font-semibold ${!!s.aprovado ? 'text-blue-600' : s.aprovado === null ? 'text-yellow-400' : 'text-red-600'}`}>{s.aprovado ? 'APROVADO' : s.aprovado === null ? 'PENDENTE' : 'REPROVADO'}</span></div>
                                                        {
                                                            s.aprovado === null && (
                                                                <div className="w-full flex flex-col md:flex-row gap-4 justify-end">
                                                                    <button
                                                                        className="w-full md:w-fit flex flex-row justify-center items-center bg-[#242222] p-2 shadow-sm shadow-[#242222] text-white font-semibold rounded-md"
                                                                        onClick={() => handleEditar(s)}
                                                                    >
                                                                        <Pencil className="me-1" /> Editar dados
                                                                    </button>
                                                                    <button
                                                                        className="w-full md:w-fit flex flex-row justify-center items-center bg-red-600 p-2 shadow-sm shadow-[#242222] text-white font-semibold rounded-md"
                                                                        onClick={() => handleCancelarAgendamento(s)}
                                                                    >
                                                                        <X className="me-1" /> Cancelar agendamento
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )


                                            })
                                            }
                                        </>



                                    )
                            }
                        </div>
                    ) :
                        (
                            <div className='w-full mt-4 bg-white p-1 flex flex-col gap-4 justify-center items-center rounded-md md:w-11/12 self-center'>
                                <div className="text-3xl font-semibold">
                                    Agenda - {user?.usuario}
                                </div>
                                <div className="w-full md:w-fit">
                                    <Button
                                        onClick={handleModalAgendamento}
                                    >
                                        <Plus /> Novo agendamento
                                    </Button>
                                </div>
                                <div className="w-11/12">
                                    <div className="flex gap-4 md:flex-row flex-col w-full">
                                        <div className="md:w-1/3">
                                            <InputText
                                                type="date"
                                                label="Agendamentos do dia"
                                                value={data}
                                                onChange={(e) => setData(e.currentTarget.value)}
                                            />
                                        </div>
                                        <div className="md:w-1/3">
                                            <InputText
                                                type="text"
                                                label="Cliente"
                                                value={cliente}
                                                onChange={(e) => setCliente(e.currentTarget.value)}
                                            />
                                        </div>
                                        <div className="flex mt-1 gap-1 items-center md:w-fit">
                                            <input
                                                id="apenas_aprovados"
                                                type="checkbox"
                                                value={aprovados}
                                                onChange={(e) => setAprovados(!aprovados)}
                                            />
                                            <Label
                                                label="Apenas aprovados"
                                                htmlFor="apenas_aprovados"
                                            />
                                        </div>
                                        <div className="mt-3 md:w-fit">
                                            <button
                                                className="w-full md:w-fit h-fit flex justify-center items-center bg-[#242222] p-2  rounded-md text-white font-semibold text-sm hover:bg-[#272525] shadow-sm shadow-black transition-colors"
                                                onClick={handlePesquisarAgendamentos}
                                            >
                                                <Search className="me-1" /> Pesquisar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {
                                    agendamentos.length > 0 ?
                                        agendamentos.map(agendamento => {
                                            return (
                                                <div className="w-full md:w-6/12 bg-gray-100 p-2 rounded-md shadow-sm shadow-[#242222]">
                                                    <div className="text-base"><b>Cliente: </b> {agendamento.nomeDoCliente}</div>
                                                    <div className="text-base"><b>Serviço: </b> {agendamento.nomeTipoServico}</div>
                                                    <div className="text-base"><b>Data: </b> {formatarData(agendamento.data)}</div>
                                                    <div className="text-base"><b>Horário: </b> {agendamento.horario}h</div>
                                                    <div className="text-base"><b>Observação: </b> {agendamento.observacao}</div>
                                                    <div className="text-base"><b>Status: </b> <span className={`font-semibold ${agendamento.aprovado ? 'text-blue-600' : agendamento.aprovado === null ? 'text-yellow-400' : 'text-red-600'}`}>{agendamento.aprovado ? 'APROVADO' : agendamento.aprovado === null ? 'PENDENTE' : 'REPROVADO'}</span></div>
                                                    {
                                                        agendamento.aprovado === null && (
                                                            <div className="w-full flex flex-col md:flex-row gap-4 justify-end">
                                                                <button
                                                                    className="w-full md:w-fit flex flex-row justify-center items-center bg-red-600 p-2 shadow-sm shadow-[#242222] text-white font-semibold rounded-md"
                                                                    onClick={() => handleAprovarReprovarAgendamento(agendamento, false)}
                                                                >
                                                                    <X className="me-1" /> Reprovar soliticação
                                                                </button>
                                                                <button
                                                                    className="w-full md:w-fit flex flex-row justify-center items-center bg-green-600 p-2 shadow-sm shadow-[#242222] text-white font-semibold rounded-md"
                                                                    onClick={() => handleAprovarReprovarAgendamento(agendamento, true)}
                                                                >
                                                                    <CheckCircle className="me-1" /> Aprovar solicitação
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )
                                        })
                                        :
                                        (<span className="text-2xl font-semibold">Nenhum agendamento encontrado</span>)
                                }
                            </div>
                        )

                }

                {
                    modalConfirmacao && (
                        <ModalConfirmacaoAgendamento />
                    )
                }

                {
                    modalCancelamento && (
                        <ModalCancelamento
                            solicitado={cancelar}
                        />
                    )
                }
                {
                    modalAgendamento && (
                        <ModalAgendamento />
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


        const handleCancelar = async (solicitado) => {
            try {
                const res = await cancelarSolicitacao(solicitado.id);
                notification.success({ message: "Solicitação cancelada com sucesso" });
                setTimeout(() => {
                    navigate(0);
                }, 1000);
                setModalCancelamento(false)
            } catch (error) {
                console.log(error);
            }
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
                            onClick={() => handleCancelar(solicitado)}
                        >
                            Sim <ArrowRightCircle className="ms-1" />
                        </button>

                    </div>
                </div>
            </div>
        )

    }

    function ModalAgendamento() {

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50 pointer-events-none"></div>

                <div className="relative w-full md:w-3/12 bg-white p-2 rounded-md shadow-sm shadow-[#242222] z-50">
                    <div className="flex w-full justify-between">
                        <span className="w-fit flex flex-row items-center font-semibold bold text-lg">
                            <Calendar className="me-1" /> Novo agendamento - {user.usuario}
                        </span>
                        <X
                            className="cursor-pointer"
                            onClick={() => setModalAgendamento(false)}
                        />
                    </div>
                    <div className='w-full'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-full">
                                <InputText
                                    type="text"
                                    label="Cliente"
                                    placeholder="Digite o nome do cliente"
                                    {...register("NomeDoCliente", {
                                        required: "Campo Obrigatório"
                                    })}
                                    variant={errors.NomeDoCliente ? 'invalid' : ''}
                                />
                            </div>
                            <div>
                                <Selectpicker
                                    label="Serviço"
                                    {...register("id_tipo_servico", {
                                        required: "Campo obrigatório",
                                    })}
                                    errors={errors.servico}
                                >
                                    <option value=''>{servicos.length === 0 ? 'NENHUM SERVIÇO ENCONTRADO' : 'SELECIONE 1'}</option>
                                    {servicos.filter(servico => servico.ativo).map(servico => (
                                        <option key={servico.id} value={servico.id}>{servico.nome}</option>
                                    ))}
                                </Selectpicker>

                                {barbeiros && (
                                    <>
                                        <div className='mt-4 transition-all'>
                                            <Selectpicker
                                                label="Barbeiro"
                                                {...register("id_usuario_dono", {
                                                    required: "Campo obrigatório"
                                                })}
                                                disabled
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
                                                        required: "Campo Obrigatório"
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
                                                placeholder="Alguma observação para este agendaento"
                                                {...register("observacao")}
                                            />
                                        </div>

                                        <div className='md:mt-4 w-full gap-4 flex flex-col md:flex-row'>
                                            <Button
                                                variant="gray"
                                                type="button"
                                                icon={<ArrowLeftCircle className="me-1" />}
                                                onClick={() => user.cargo == ROLES.Barbeiro ? setModalAgendamento(false) : navigate("/home")}
                                                className="w-full"
                                            >
                                                Voltar
                                            </Button>
                                            <Button
                                                icon={<CloudUpload className='me-1' />}
                                                className="w-full"
                                            >
                                                Agendar
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )

    }
}
