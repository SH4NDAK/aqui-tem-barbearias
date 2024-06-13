import { useState } from "react";
import { createContext } from "react";
import Recovery from "./pages/RecoveryPage";
import Verification from "./pages/Verification";
import Login from "./pages/login/index";
import Reset from "./pages/ResetPassword";

export const RecoveryContext = createContext();
function App() {
  const [page, setPage] = useState("recovery");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  function NavigateComponents() {
    if (page === "recovery") return <Recovery />;
    if (page === "verification") return <Verification />;
    if (page === "reset") return <Reset />;

    return <Login />;
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div className="flex justify-center items-center">
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
  );
}

export default App;
