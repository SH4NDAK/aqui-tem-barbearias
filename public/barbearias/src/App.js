
import { useState } from "react";
import InputText from './components/InputText';

export default function App() {

  // usestate é bascimente o estado de um elemento

  // estado login (valor dele)
  const [login, setLogin] = useState(null);

  return (
    <div className="flex justify-center items-center w-screen h-dvh bg-[#242222]">
      <div className="flex flex-col bg-white p-12 rounded-lg gap-4">
        <div className="w-full flex justify-center font-bold text-5xl">
          LOGO
        </div>
        <div className="w-full flex flex-col">
          <InputText
            label="Login"
          />
        </div>
      </div>

    </div>
  );
}
