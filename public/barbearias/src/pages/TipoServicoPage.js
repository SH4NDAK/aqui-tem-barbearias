import { Lightbulb, Link, Pencil, Plus, Search, Trash } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import { useNavigate } from "react-router-dom";
import Row from "../components/Row";

export default function TipoServicoPage() {
    // chamando a função que navega entre as paginas do sistema
    const navigate = useNavigate()


    // função chamada ao clicar no botão '+' da lista de tipos de serviço, para cadastrar um
    const handleCadastroClick = () => {
        navigate("/tipo-servico/new")
    }

    return (
        <Container
            variant={"start"}
        >
            <FormContainer
                title="Tipos de serviço"
            >
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

                {/* 
                <div className="w-full relative overflow-x-auto p-0.5 rounded-sm bg-[#242222]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-200">
                        <thead className="text-xs text-white uppercase bg-[#242222]">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Valor | Duração
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Barbeiros
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-200 border-b text-gray-900 font-medium whitespace-nowrap ">
                                <td className="px-6 py-4 font-medium ">
                                    Corte + Barba
                                </td>
                                <td className="px-6 py-4 ">
                                    Silver
                                </td>
                                <td className="px-6 py-4">
                                    Laptop
                                </td>
                                <td className="px-6 py-4" colSpan={1}>
                                    <div className="flex gap-2">
                                        <Button variant="icon" icon={<Pencil />} />
                                        <Button variant="icon" icon={<Link className="text-blue-600" />} />
                                        <Button variant="icon" icon={<Lightbulb className="text-yellow-200" />} />
                                        <Button variant="icon" icon={<Trash className="text-red-600" />} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}

            </FormContainer>
        </Container>
    )
}   