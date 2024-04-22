import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/login/index"
import Register from "../pages/register"
import ServiceTypes from "../pages/ServiceType/ServiceTypes"
import AddOrEditServiceTypes from "../pages/ServiceType/add/[id]"

// isso é para registrar rotas

export const router = createBrowserRouter([
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
    element: <ServiceTypes />
  },
  {
    path: "/tipos-servico/add",
    element: <AddOrEditServiceTypes />
  }
])