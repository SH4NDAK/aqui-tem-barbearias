import { Plus, Search } from "lucide-react";
import Header from "../../components/Header";
import InputText from "../../components/InputText";
import { useNavigate } from "react-router-dom";
import { listByCargo } from "../../services/barbeiro";

export default function Barbeiros() {
    const navigate = useNavigate()

    const handleCadastroClick = () => {
        navigate("/barbeiros/add")        
    }

    const handlePesquisarClick = async () => {
        const response = await listByCargo(4);

        console.log(response);
    }

    return (
        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className="w-full flex justify-center">
                <div className="flex flex-col bg-white md:w-6/12 shadow-sm shadow-[#242222] rounded-md w-full">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Barbeiros</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center mt-4 mb-4 opacity-5"></div>

                    <form className="flex flex-col md:flex-row gap-4 p-2 md:w-11/12 w-full">
                        <div>
                            <button
                                type="button"
                                className="md:mt-4 flex justify-center text-white bg-[#242222] p-2 rounded-md md:w-fit w-full"
                                onClick={handleCadastroClick}
                            >
                                <Plus />
                            </button>
                        </div>
                        <InputText
                            label="Nome"
                            type="text"
                            className="md:w-64"
                        />
                        <div className="md:w-full flex justify-end">
                            <button
                                type="button"
                                className=" font-semibold md:mt-4 flex justify-center text-white bg-[#242222] p-2 rounded-md md:w-fit w-full"
                                onClick={handlePesquisarClick}
                            >
                                <Search className="me-1" />Pesquisar
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}