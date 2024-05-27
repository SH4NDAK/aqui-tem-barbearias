import { useState } from "react";
import { Button, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle, Bell, BellRing, Calendar, Scissors, User } from "lucide-react";
import Header from "../../components/Header";


export default function Home() {
    const navigate = useNavigate();


    const handleAgendaClick = () => {
        navigate("/agenda")
    }

    const handleTipoServicoClick = () => {
        navigate("/tipos-servico")
    }

    const handleUsuariosClick = () => {
        navigate("/usuarios")
    }


    return (
        <>

            <div className="w-full h-dvh bg-[#242222]">
                <Header />

                <div className="flex justify-center items-center p-1">
                    <div className="p-2 flex flex-col md:w-1/2 sm:w-full bg-white h-1/2 shadow-sm shadow-black rounded-md">
                        <div className="flex justify-center mb-4">
                            <span className="md:text-5xl sm:text-4xl font-semibold">Menu principal</span>
                        </div>
                        <div className="flex justify-center w-full">
                            <div className="bg-[#242222] h-0.5 w-11/12 mt-1 mb-4 opacity-5"></div>
                        </div>
                        <div className="w-full flex sm:flex-col gap-4 md:flex-row justify-center flex-grow-0">
                            <div
                                className="p-2 bg-gray-200 md:w-48 sm:w-full rounded-sm shadow-sm shadow-[#242222] cursor-pointer hover:scale-105 transition-all"
                                onClick={handleAgendaClick}
                            >
                                <div className="flex flex-row items-center">
                                    <Calendar className="me-1" /> <span className="font-semibold">Agenda</span>
                                </div>
                                <div className="w-full mt-3">
                                    <button
                                        className="flex flex-row justify-center w-full bg-[#242222] rounded-md shadow-sm shadow-[#242222] p-1.5 text-white font-semibold text-end hover:bg-[#1b1919] transition-colors"
                                        onClick={handleAgendaClick}
                                    >
                                        Acessar <ArrowRightCircle className="ms-1" />
                                    </button>
                                </div>
                            </div>
                            <div
                                className="p-2 bg-gray-200 md:w-48 sm:w-full rounded-sm shadow-sm shadow-[#242222] cursor-pointer hover:scale-105 transition-all"
                                onClick={handleTipoServicoClick}
                            >
                                <div className="flex flex-row items-center">
                                    <Scissors className="me-1" /> <span className="font-semibold">Tipos de serviço</span>
                                </div>
                                <div className="w-full mt-3">
                                    <button
                                        className="flex flex-row justify-center w-full bg-[#242222] rounded-md shadow-sm shadow-[#242222] p-1.5 text-white font-semibold text-end hover:bg-[#1b1919] transition-colors"
                                        onClick={handleTipoServicoClick}
                                    >
                                        Acessar <ArrowRightCircle className="ms-1" />
                                    </button>
                                </div>
                            </div>
                            <div
                                className="p-2 bg-gray-200 md:w-48 sm:w-full rounded-sm shadow-sm shadow-[#242222] cursor-pointer hover:scale-105 transition-all"
                                onClick={handleUsuariosClick}
                            >
                                <div className="flex flex-row items-center">
                                    <User className="me-1" /> <span className="font-semibold">Barbeiros</span>
                                </div>
                                <div className="w-full mt-3">
                                    <button
                                        className="flex flex-row justify-center w-full bg-[#242222] rounded-md shadow-sm shadow-[#242222] p-1.5 text-white font-semibold text-end hover:bg-[#1b1919] transition-colors"
                                        onClick={handleUsuariosClick}
                                    >
                                        Acessar <ArrowRightCircle className="ms-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}