import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/login/index"
import Register from "../pages/register"
import ServiceTypes from "../pages/ServiceType/ServiceTypes"
import AddOrEditServiceTypes from "../pages/ServiceType/add/[id]"
import RecoveryPage from "../pages/RecoveryPage"
import AgendaPage from "../pages/AgendaPage"
import App from "../App"
// isso é para registrar rotas do projeto, o primeiro pametro é a rota o 2 é o componente

export const router = createBrowserRouter([
  {
    path:"/login",     // Aqui define a rota
    element: <App /> // Aqui define o componente
  },
  {
    path: "/cadastro",
    element: <Register />
  },
  {
    path: "/tipos-servico",
    element: <ServiceTypes />
  },
  {
    path: "/tipos-servico/add",
    element: <AddOrEditServiceTypes />
  },
  {
    path: "/recovery",
    element: <RecoveryPage />
  },
  {
    path: "agenda",
    element: <AgendaPage />
  }
])