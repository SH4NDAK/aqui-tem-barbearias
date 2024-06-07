import { Dropdown, Menu } from "antd";
import { Menu as MenuIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CardServiceType({ record, deleteServiceType }) {
    const navigate = useNavigate();

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a onClick={() => navigate(`edit/${record.id}`)}>Editar</a>
            </Menu.Item>
            <Menu.Item key="1" onClick={() => deleteServiceType(record)}>
                <Trash />
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="flex flex-row rounded border border-black m-1 p-1 justify-between">
            <div className="flex flex-col ">
                Nome: {record.nomeServico} <br />
                Duração: {record.duracaoServico} <br />
                Preço: {record.precoServico} <br />
                {record.ativoServico ? 'Ativado' : 'Desativado'} <br />
            </div>
            <Dropdown overlay={menu} trigger={['click']} placement="top">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <MenuIcon />
                </a>
            </Dropdown>
        </div>
    );
}
