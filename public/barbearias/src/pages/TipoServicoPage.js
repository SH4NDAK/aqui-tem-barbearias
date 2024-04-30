import { Lightbulb, Link, Pencil, Plus, Search, Trash } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";

export default function TipoServicoPage() {
    return (
        <Container
            variant={"start"}
        >
            <FormContainer
                title="Tipos de serviço"
                variant="row"
            >
                <form
                    className="flex w-full gap-4"
                >
                    <Button
                        type={"button"}
                        icon={<Plus />}
                        onClick={(e) => { alert("oi") }}
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
                </form>


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
                </div>

            </FormContainer>
        </Container>
    )
}   