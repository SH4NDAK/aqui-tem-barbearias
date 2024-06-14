// src/Routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/index";
import Register from "../pages/register";
import RecoveryPage from "../pages/RecoveryPage";
import AgendaPage from "../pages/AgendaPage";
import Home from "../pages/home";
import TipoServicoPage from "../pages/TipoServicoPage";
import TipoServicoFormPage from "../pages/TipoServicoFormPage";
import EditTipoServico from "../pages/ServiceType/edit/[id]";
import Perfil from "../pages/perfil/index";
import Barbeiros from "../pages/barbeiros";
import BarbeirosForm from "../pages/barbeiros-add";
import Verification from "../pages/Verification";
import ResetPassword from "../pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
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
  },
  {
    path: "/barbeiros",
    element: <Barbeiros />
  },
  {
    path: "/barbeiros/add",
    element: <BarbeirosForm />
  },
  {
    path: "/verification",
    element: <Verification />
  },
  {
    path: "/reset",
    element: <ResetPassword />
  }
]);

export default router;
