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
        <>
            <Container
                variant={"center"}
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
                </FormContainer>

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
            </Container>

        </>
    )
}  