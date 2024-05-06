import React, { useEffect, useState } from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { locale } from 'devextreme/localization'

const currentDate = new Date();
const views = [];

export default function AgendaPage() {

    const onAppointmentClick = () => {
        alert("abrir o modal")
    }

    // setando o local como brasil
    useEffect(() => {
        locale('pt-BR')
    }, [])

    // a altura da agenda, sera o tamanho da tela do usuario -150 pixels
    const height = window.innerHeight - 150;

    return (
        <div className='flex flex-col justify-center h-dvh bg-[#242222] p-12'>
            <div className='bg-white w-full p-1 flex justify-center text-3xl font-semibold rounded-t-md'>
                Agenda
            </div>
            <div className='w-full h-full bg-white rounded-b-md'>
                <Scheduler
                    timeZone="America/Sao_Paulo"
                    // dataSource={data}
                    views={views}
                    currentView="agenda"
                    defaultCurrentDate={currentDate}
                    height={height}
                    onAppointmentClick={onAppointmentClick}
                >

                </Scheduler>
            </div>
        </div>
    )
}
