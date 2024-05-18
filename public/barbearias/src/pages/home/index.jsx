    import { useState } from "react";
    import { Button, Space } from 'antd';
    import { useNavigate } from "react-router-dom";


    export default function Home() {   
        const navigate = useNavigate();
    
        const handleLogin = () => {
            navigate('/login');
        };    

        const handleCadastro = () => {
            navigate('/cadastro')
        };

        return (
            <div>
                <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                    
                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderBottom: '1px solid #242222' }}>
                        
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                            
                            <div style={{ fontSize: '20px', color: '#242222', marginRight: '20px', fontFamily: 'monospace' }}>Sobre Nós</div>
                            
                            <div style={{ fontSize: '20px', color: '#242222', marginRight: '20px', fontFamily: 'monospace' }}>Contatos</div>
                            
                            <Button onClick={handleLogin} style={{ backgroundColor: '#242222', color: '#FFFFFF', marginRight: '10px', fontFamily: 'monospace' }}>Login</Button>
                            
                            <Button onClick={handleCadastro} style={{ backgroundColor: '#FFFFFF', color: '#242222', fontFamily: 'monospace' }}>Cadastro</Button>
                        
                        </div>
                    
                    </header>
                </div>
                <div style={{ fontFamily: 'monospace' , textAlign: 'Left', marginTop: '40px', marginLeft: '20px', fontSize: '80px', color: '#242222', fontWeight: 'bold' }}>
                    Aqui Tem 
                </div>

                <div style={{ fontFamily: 'monospace' , textAlign: 'Left', marginLeft: '20px', fontSize: '80px', color: '#242222', fontWeight: 'bold' }}>
                    BARBEARIA
                </div>

                <div style={{ fontFamily: 'monospace', textAlign: 'left', marginTop: '0px', marginLeft: '25px', fontSize: '18px', color: '#242222' }}>
                    Conectando Barbearias e Clientes: <br/>
                    Simplificando a Experiência de Cuidados <br/>
                    com a Aparência
                </div>
            </div>

        );
    }