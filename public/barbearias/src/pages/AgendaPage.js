import React, { useEffect, useState } from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { locale } from 'devextreme/localization'
import Button from '../components/Button';
import { Plus, X } from 'lucide-react';
import FormContainer from '../components/FormContainer';
import Row from '../components/Row';
import Col from '../components/Col';
import InputText from '../components/InputText';

const currentDate = new Date();
const views = [];

export default function AgendaPage() {
    const [abrirModalAgendamento, setAbrirModalAgendamento] = useState(false);

    const onAppointmentClick = () => {
        alert("abrir o modal")
    }

    const handleNovoAgendamento = () => {
        setAbrirModalAgendamento(true);
    }

    // setando o local como brasil
    useEffect(() => {
        locale('pt-BR')
    }, [])

    // a altura da agenda, sera o tamanho da tela do usuario -150 pixels
    const height = window.innerHeight - 150;

    return (
        <>
            <div className='flex flex-col justify-center h-dvh bg-[#242222] p-12'>
                <div className='bg-white w-full p-1 flex flex-col justify-center items-center text-3xl font-semibold rounded-t-md'>
                    <div>Agenda</div>
                    <Button
                        variant="icon"
                        icon={<Plus />}
                        onClick={handleNovoAgendamento}
                    ></Button>

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

            {abrirModalAgendamento && (
                <ModalAgendamento
                    onClose={() => { setAbrirModalAgendamento(false) }}
                />
            )}
        </>
    )
}

const ModalAgendamento = ({ onClose }) => {
    return (
        <dialog
            className='absolute top-1/2 bg-gray-50 shadow-sm shadow-[#242222] rounded-sm p-2'
            open="true"
        >
            <div className='w-full flex items-center gap-4 mb-2'>
                <div className='text-lg font-semibold capitalize'>
                    Novo agendamento
                </div>
                <div
                    className='p-0.5 cursor-pointer transition-colors rounded-full hover:bg-gray-100'
                    onClick={onClose}
                >
                    <X className='text-gray-500' />
                </div>
            </div>
            <FormContainer variant="modal">
                <Row>
                    <Col>
                        <InputText
                            type="text"
                            label="valor"
                            
                        />
                    </Col>
                </Row>

            </FormContainer>
        </dialog>
    )
}
