import { Lightbulb, Link, Pencil, Plus, Search, Trash } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import { useNavigate } from "react-router-dom";
import Row from "../components/Row";
import LayoutPage from "../components/LayoutPage";
import SideBar from "../components/SideBar";
import Header from "../components/Header";


export default function TipoServicoPage() {
    // chamando a função que navega entre as paginas do sistema
    const navigate = useNavigate()


    // função chamada ao clicar no botão '+' da lista de tipos de serviço, para cadastrar um
    const handleCadastroClick = () => {
        navigate("/tipo-servico/add")
    }

    return (
        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className="w-full flex flex-col justify-center items-center p-1 gap-4">
                <div className="flex flex-col bg-white md:w-1/3 p-2 shadow-sm shadow-[#242222] rounded-md w-full">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Tipos de serviço</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center mt-4 mb-4 opacity-5"></div>
                    <form>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="w-full md:w-fit flex justify-center">
                                <button
                                    className="bg-[#242222] p-2 text-white rounded-md shadow-sm shadow-[#242222] hover:bg-[#2b2828] transition-colors"
                                    onClick={handleCadastroClick}
                                >

                                    <Plus />
                                </button>
                            </div>
                            <div className="w-full md:w-11/12">
                                <InputText
                                    label="Nome"
                                    type="text"
                                />
                            </div>
                            <div className="w-full">
                                <button
                                    type="submit"
                                    className="w-full md:w-fit flex flex-row justify-center md:mt-2 items-center bg-[#242222] p-2 rounded-md text-white"
                                >
                                    <Search className="me-1" /> Pesquisar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col bg-white md:w-1/3 p-2 shadow-sm shadow-[#242222] rounded-md w-full">
                    <div className="w-full flex flex-row md:flex-col gap-2">
                        <div className="md:border-b md:border-[#242222] flex flex-col md:flex-row w-1/2 md:w-full gap-4 justify-between">
                            <div className="font-bold text-base">
                                Nome
                            </div>
                            <div className="font-bold text-base">
                                Valor | Duração
                            </div>
                            <div className="font-bold text-base">
                                Barbeiros
                            </div>
                            <div className="font-bold text-base">
                                Ações
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-1/2 md:w-full gap-4 justify-between">
                            <div>
                                Corte de cabelo
                            </div>
                            <div>
                                R$45,00 <br /> 30 minutos
                            </div>
                            <div>
                                Martins<br />
                                Martins<br />
                                Martins<br />
                                Martins<br />
                                Martins<br />
                                Martins<br />
                            </div>
                            <div>
                                <div className="flex justify-center">
                                    <button
                                        className="bg-[#242222] p-2 shadow-sm shadow-[#242222] rounded-md"
                                    >
                                        <Pencil className="text-blue-500" />
                                    </button>
                                    <button
                                        className="bg-[#242222] p-2 shadow-sm shadow-[#242222] rounded-md"
                                    >
                                        <Pencil className="text-blue-500" />
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-1/2 md:w-full gap-4 justify-between">
                            <div>
                                Nome
                            </div>
                            <div>
                                Valor | Duração
                            </div>
                            <div>
                                Barbeiros
                            </div>
                            <div>
                                Ações
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}  