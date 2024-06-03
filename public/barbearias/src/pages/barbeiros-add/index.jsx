import Header from "../../components/Header";
import InputText from "../../components/InputText";

export default function BarbeirosForm() {
    return (
        <div className="w-full h-dvh bg-[#242222]">
            <Header />
            <div className="w-full flex justify-center">

                <div className="flex flex-col bg-white md:w-6/12 shadow-sm shadow-[#242222] rounded-md w-full">
                    <div className="w-fit self-center">
                        <span className="text-3xl font-semibold">Barbeiros - Cadastro</span>
                    </div>
                    <div className="w-11/12 h-0.5 bg-black self-center mt-4 mb-4 opacity-5"></div>

                    <form className="flex flex-col md:flex-row gap-4 p-2 md:w-11/12 w-full">
                        <InputText
                            label="Nome"
                            type="text"
                            className="md:w-64"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}