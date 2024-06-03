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

// isso é para registrar rotas do projeto, o primeiro pametro é a rota o 2 é o componente

export const router = createBrowserRouter([
  {
    path:"/",     // Aqui define a rota
    element: <Home /> // Aqui define o componente
  },
  {
    path:"/login",
    element: <Login />
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
    path: "/tipo-servico/add",
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
    element: <AgendaPage />
  },
  {
    path: "/home", 
    element: <Home />
  },
  {
    path: "/perfil", 
    element: <Perfil />
  }

])