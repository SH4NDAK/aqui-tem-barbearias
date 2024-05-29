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
            <div className="w-full flex justify-center p-1">
                <div className="flex flex-col bg-white w-1/3 p-2 shadow-sm shadow-[#242222] rounded-md sm:w-full">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Tipos de serviço</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center mt-4 mb-4 opacity-5"></div>
                    <form>
                        <Row>
                            <Button
                                type={"button"}
                                icon={<Plus />}
                                onClick={handleCadastroClick}
                                variant={"icon"}
                            >
                            </Button>
                            <InputText
                                label="Nome"
                                type="text"
                            />
                            <Button
                                type="submit"
                                variant={"icon"}
                                className="self-end"
                                icon={<Search className="me-1" />}
                            >
                                Pesquisar
                            </Button>

                        </Row>
                    </form>
                </div>
            </div>
            <div className="container">
                <table className="w-full flex flex-row rounded-lg overflow-hidden my-5 ">
                    <thead
                        className="bg-gray-200 p-1 font-semibold shadow-sm shadow-[#242222]"
                    >
                        <tr className="flex gap-2 font-bold max-lg:flex-col">
                            <td>Nome</td>
                            <td>Valor | Duração</td>
                            <td>Barbeiros</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>


    )
}  