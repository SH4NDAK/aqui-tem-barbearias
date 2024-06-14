import { ArrowLeft, ArrowLeftCircle, Cloud, CloudUpload, Eye, EyeOff } from "lucide-react";
import Header from "../../components/Header";
import InputText from "../../components/InputText";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { editUser, signUpRequest } from "../../services/auth";
import { notification } from 'antd';
import { ROLES } from "../../utils/role";


export default function BarbeirosForm() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const barbeiro = location.state || {};
    const isEdicao = Object.entries(barbeiro).length > 0;

    useEffect(() => {
        if (isEdicao) {
            setValue("usuario", barbeiro.usuario)
            setValue("email", barbeiro.email)
            setValue("telefone", barbeiro.telefone)
        }

        const user = JSON.parse(localStorage.getItem('usuario'));
        setUser(user);

        if (user.cargo != ROLES.Administrador) {
            navigate("/home");
        }

    }, []);

    const cargos = [
        {
            value: 4,
            name: "BARBEIRO"
        },
        {
            value: 2,
            name: "ADMINISTRADOR"
        },
    ];

    const navigate = useNavigate();
    const [verSenha, setVerSenha] = useState(false);
    const [verConfSenha, setVerConfSenha] = useState(false);

    const handleVoltar = () => {
        navigate("/barbeiros");
    }

    const onSubmit = async (data) => {
        try {

            data.cargo = 'cargo' in data ? Number(data.cargo) : ROLES.Barbeiro

            // Chamada de cadastro de usuário
            const res = 'senha' in data ? await signUpRequest(data) : await editUser(barbeiro.id, data)

            // se der erro de autenticacao volta a mensagen
            if (res.status === false) {
                return notification.error({
                    message: "Erro",
                    description: res.mensagem
                })
            }

            // Limpa os campos do formulário
            setValue("usuario", "", { shouldValidate: false });
            setValue("cargo", 4, { shouldValidate: false });
            setValue("email", "", { shouldValidate: false });
            setValue("telefone", "", { shouldValidate: false });
            setValue("senha", "", { shouldValidate: false });
            setValue("conf_senha", "", { shouldValidate: false });


            // envia mensagem de sucesso
            notification.success({
                message: "Sucesso",
                description: res.mensagem
            });

            if (isEdicao) {
                navigate("/barbeiros")
            }

        } catch (e) {
            console.log(e);
        }
    }


    const { register, formState, handleSubmit, setValue, watch } = useForm();
    const senha = watch('senha');

    return (

        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className="w-full flex justify-center">

                <div className="flex flex-col bg-white md:w-6/12 shadow-sm shadow-[#242222] rounded-md w-full">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Barbeiros - {isEdicao ? 'Edição' : 'Cadastro'}</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center mt-4 mb-4 opacity-5"></div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col md:flex-row gap-4 p-4 md:w-11/12 w-full flex-wrap justify-center"
                    >
                        <div className="w-full">
                            <InputText
                                type="text"
                                placeholder="Informe um nome"
                                label="Nome"
                                {...register("usuario", {
                                    required: "Campo obrigatório",
                                    minLength: {
                                        value: 3,
                                        message: "Informe pelo menos 3 caracteres"
                                    }
                                })}
                                errors={formState.errors.usuario}
                                variant={formState.errors.usuario ? 'invalid' : ''}
                            />
                            {
                                formState.errors.usuario && (
                                    <span className="text-red-600">{formState.errors.usuario.message}</span>
                                )
                            }
                        </div>
                        {
                            !isEdicao && user?.cargo == ROLES.Administrador && (
                                <div className="w-full">
                                    <label className="block text-sm font-semibold">Cargo</label>
                                    <select
                                        className="w-full border border-[#242222] p-2 text-[#242222] outline-none rounded-md"
                                        {...register("cargo", {
                                            required: "Campo obrigatório"
                                        })}
                                    >
                                        {
                                            cargos.map(cargo => {
                                                return (
                                                    <option value={cargo.value}>{cargo.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {
                                        formState.errors.cargo && (
                                            <span>{formState.errors.cargo.message}</span>
                                        )
                                    }
                                </div>
                            )
                        }
                        <div className="flex gap-4 w-full">
                            <div className="w-full">
                                <InputText
                                    label="E-mail"
                                    placeholder="Informe um e-mail"
                                    type="email"
                                    {...register("email", {
                                        required: "Campo obrigatório",
                                        minLength: {
                                            value: 4,
                                            message: "Informe um e-mail válido"
                                        }
                                    })}
                                    variant={formState.errors.email ? 'invalid' : ''}
                                />
                                {
                                    formState.errors.email && (
                                        <span className="text-red-600">{formState.errors.email.message}</span>
                                    )
                                }
                            </div>
                            {/* <div className="w-1/2">
                                <InputText
                                    label="Telefone"
                                    placeholder="Informe um telefone"
                                    type="text"
                                    maxLength={15}
                                    variant={formState.errors.telefone ? 'invalid' : ''}
                                    {...register("telefone", {
                                        required: "Campo obrigatório",
                                        minLength: {
                                            value: 15,
                                            message: "Telefone inválido"
                                        }
                                    })}
                                    onChange={(e) => {
                                        let valor = e.currentTarget.value
                                        valor.replace(/\D/g, '');

                                        const match = valor.match(/^(\d{2})(\d{5})(\d{4})$/);

                                        if (match) {
                                            valor = `(${match[1]}) ${match[2]}-${match[3]}`;
                                        }

                                        setValue("telefone", valor, { shouldValidate: true })
                                    }}
                                />
                                {
                                    formState.errors.telefone && (
                                        <span className="text-red-600">{formState.errors.telefone.message}</span>
                                    )
                                }
                            </div> */}
                        </div>
                        {
                            !isEdicao && (
                                <div className="flex gap-4 w-full">
                                    <div className="w-1/2">
                                        <div className="flex gap-2 items-center">
                                            <div className="w-full">
                                                <InputText
                                                    label="Senha"
                                                    type={verSenha ? "text" : "password"}
                                                    placeholder="Informe uma senha"
                                                    variant={formState.errors.senha ? 'invalid' : ''}
                                                    {...register("senha", {
                                                        required: "Campo obrigatório",
                                                        minLength: {
                                                            value: 4,
                                                            message: "Informe pelo menos 4 caracteres"
                                                        }
                                                    })}
                                                />
                                                {
                                                    formState.errors.senha && (
                                                        <span className="text-red-600">{formState.errors.senha.message}</span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2">

                                        <div className="flex gap-2 items-center">
                                            <div className="w-full">
                                                <InputText
                                                    label="Confirmar senha"
                                                    placeholder="Confirme a senha"
                                                    variant={formState.errors.conf_senha ? 'invalid' : ''}
                                                    type={verConfSenha ? "text" : "password"}
                                                    {...register("conf_senha", {
                                                        required: "Campo obrigatório",
                                                        validate: (conf_senha) => conf_senha === senha || "As senhas não coincidem"

                                                    })}
                                                />
                                                {
                                                    formState.errors.conf_senha && (
                                                        <span className="text-red-600">{formState.errors.conf_senha.message}</span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="w-full md:w-fit">
                            <button
                                type="button"
                                onClick={handleVoltar}
                                className="w-full flex items-center justify-center gap-1 p-2 bg-[#444444] text-white font-semibold rounded-md shadow-sm shadow-[#242222]"
                            >
                                <ArrowLeftCircle /> {isEdicao ? 'Cancelar edição' : 'Voltar'}
                            </button>
                        </div>
                        <div className="w-full md:w-fit">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-1 p-2 bg-[#242222] text-white font-semibold rounded-md shadow-sm shadow-[#242222]"
                            >
                                <CloudUpload /> {isEdicao ? 'Salvar edição' : 'Cadastrar'}
                            </button>
                        </div>

                    </form>
                </div>
            </div >
        </div >
    )
}
