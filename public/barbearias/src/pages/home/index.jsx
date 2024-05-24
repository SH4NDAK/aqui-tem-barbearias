import { useState } from "react";
import { Button, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import { ArrowRightCircle, Calendar } from "lucide-react";


export default function Home() {
    const navigate = useNavigate();

    const handleAgendaClick = () => {

    }


    return (
        <div className="w-full h-dvh bg-[#242222]">
            <div className="flex justify-center items-center p-1">
                <div className="p-2 flex flex-col w-1/2 bg-white h-1/2 shadow-sm shadow-black rounded-sm">
                    <div className="flex justify-center mb-4">
                        <span className="text-5xl font-semibold">Menu principal</span>
                    </div>
                    <div className="w-full flex md:flex-row">
                        <div className="p-2 w-48 bg-gray-200 rounded-sm shadow-sm shadow-[#242222]">
                            <div className="flex flex-row items-center">
                                <Calendar className="me-1" /> <span className="font-semibold">Agenda</span>
                            </div>
                            <div className="w-full mt-3">
                                <button 
                                    className="flex flex-row justify-center w-full bg-[#242222] rounded-md shadow-sm shadow-[#242222] p-1.5 text-white font-semibold text-end"
                                    onClick={handleAgendaClick}
                                >
                                    Acessar <ArrowRightCircle className="ms-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}