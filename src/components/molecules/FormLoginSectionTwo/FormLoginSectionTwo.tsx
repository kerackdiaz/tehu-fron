import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import hasEmptyString from "../../../helpers/validateObjectString";
import userLoginCodeService from "../../../services/userLoginCodeService";
import userLoginSendCode from "../../../services/userLoginSendCode";
interface FormLoginSectionTwoProps {
  userEmail: string;
}

const FormLoginSectionTwo = ({ userEmail }: FormLoginSectionTwoProps) => {
  const navigation = useNavigate();
  const [code, setCode] = useState<string[]>(['', '', '', '']);

  const valideUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasEmptyString(code)) {
      const codeEnd = {
        "code": code.join('')
      };
      const token = JSON.parse(localStorage.getItem('token') || "");
      const codeValidate = await userLoginCodeService(codeEnd, token);
      codeValidate && navigation('/escritorio');
    }
  }

  const reSendCode = async () => {
    const token = JSON.parse(localStorage.getItem('token') || '');
    await userLoginSendCode(token);
  }

  const codeInputs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });
    if (value && index < 3) {
      codeInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = e.key;
    if (key === "Backspace" && index > 0) {
      e.preventDefault();
      codeInputs.current[index - 1]?.focus();
      setCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = '';
        return newCode;
      });
    }
  };

  return (
    <form onSubmit={valideUser} className='flex flex-col items-center text-gray-700'>
      <div className="mt-6 text-center mb-6">
        <p>Se ha enviado el código de verificación al correo {userEmail}</p>
      </div>
      <div className="flex gap-10 md:gap-12">
        {Array.from({ length: 4 }, (_, index) => (
          <input
            key={index}
            ref={(element) => codeInputs.current[index] = element!}
            value={code[index]}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            type="number"
            maxLength={1}
            className="bg-gray-300 w-12 text-center text-xl rounded-md border-gray-300"
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-12 gap-3">
        <p>¿No recibió el código?</p>
        <button onClick={() => reSendCode()} className="flex justify-center items-center text-blueDark cursor-pointer rounded-full w-40 px-4 border border-blueDark  hover:bg-blueDark hover:text-whiteLight transition-all duration-300">Reenviar</button>
      </div>

      <hr className="w-full mt-8 border-1 border-gray-400"/>
      <p className="mt-4 font-light text-center md:text-justify">Te enviaremos un código de 4 dígitos a través de correo electrónico, para verificar su identidad y autorización. </p>
      
      <button className="mt-8 bg-blueDark text-whiteLight w-full rounded-full border border-blueDark hover:bg-whiteLight hover:text-blueDark transition-all duration-300">Ingresar</button>
        {/* <p>¿No tienes una cuenta? <Link to='/registro' className="btn__link">Ingresa aquí</Link></p> */}
      
    </form>
  );
}

export default FormLoginSectionTwo;