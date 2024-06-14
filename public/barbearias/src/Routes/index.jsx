import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/login/index"
import Register from "../pages/register"
import RecoveryPage from "../pages/RecoveryPage"
import AgendaPage from "../pages/AgendaPage"
import App from "../App"
import Home from "../pages/home"
import TipoServicoPage from "../pages/TipoServicoPage"
import TipoServicoFormPage from "../pages/TipoServicoFormPage"
import EditTipoServico from "../pages/ServiceType/edit/[id]"
import Perfil from "../pages/perfil/index"
import Barbeiros from "../pages/barbeiros"
import BarbeirosForm from "../pages/barbeiros-add"
import Agenda from "../pages/agenda"


// isso é para registrar rotas do projeto, o primeiro pametro é a rota o 2 é o componente
export const router = createBrowserRouter([
  {
    path: "/",     // Aqui define a rota
    element: <Login /> // Aqui define o componente
  },
  {
    path: "/cadastro",
    element: <Register />
  },
  {
    path: "/tipos-servico",
    element: <TipoServicoPage />
  },
  {
    path: "/tipos-servico/add",
    element: <TipoServicoFormPage />
  },
  {
    path: "/tipos-servico/edit/:id",
    element: <EditTipoServico />
  },
  {
    path: "/recovery",
    element: <RecoveryPage />
  },
  {
    path: "/agenda",
    element: <Agenda />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/perfil",
    element: <Perfil />
  },
  {
    path: "/barbeiros",
    element: <Barbeiros />
  },
  {
    path: "/barbeiros/add",
    element: <BarbeirosForm />
  },

])