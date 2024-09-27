import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import userEditService from '../../../services/userEditService';

const FormChangePass: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailParam = searchParams.get('email');
  const tokenNewUser = searchParams.get('token');
  const navigation = useNavigate()
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      // Mostrar mensaje si los campos están vacíos
      Swal.fire({
        icon: 'warning',
        title: 'Ups!',
        text: 'Todos los campos * son obligatorios.',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (password === confirmPassword && tokenNewUser !== '') {
      // Las contraseñas coinciden
      setPasswordMatch(true);
      // Lógica para enviar la nueva contraseña al servidor y procesar la confirmación

      const setValuesPass = {
        'password': password,
      }
      const pass = await userEditService(setValuesPass, tokenNewUser || '')
      if (pass) {
        navigation('/login')
      }
    } else {
      // Las contraseñas no coinciden
      setPasswordMatch(false);
    }

    // Marcamos que el formulario ha sido enviado
    setSubmitted(true);
  };

  return (
    <section className="flex flex-col items-center justify-center bg-blueLight4 shadow-lg rounded-2xl py-6 px-4 md:p-6 w-[330px] md:w-[400px] text-gray-700 ">
      <img
        src={"./iconUser.avif"}
        loading="lazy"
        alt="Usuario Tehu"
        title="Usuario Tehu"
        className='size-[75px] rounded-full'
      />
      {emailParam && (
        <p className="text-xl text-center w-full my-4">
          {emailParam}
        </p>
      )}
      <p className="w-[350px] font-light my-4">
        Has sido invitado por tu Administrador a supervisar TEHU SYSTEM, ingresa una
        nueva contraseña por seguridad.
      </p>

      <form onSubmit={handleFormSubmit} className='w-full'>
        <div className="flex flex-col">
          <label
            className="block pl-1 text-left"
            htmlFor="form__changePass--password"
          >
            Nueva contraseña: *
          </label>
          <input
            id="form__changePass--password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 rounded-lg border border-blueLight px-2 placeholder:text-gray-300"
          />
        </div>

        <div className="flex flex-col my-2">
          <label
            className="block pl-1 text-left"
            htmlFor="form__changePass--password--confirm"
          >
            Confirmar contraseña: *
          </label>
          <input
            id="form__changePass--password--confirm"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 rounded-lg border border-blueLight px-2 placeholder:text-gray-300"
          />
        </div>
        {!passwordMatch && submitted && (
          <p className="text-red-600 pl-2 flex items-center h-8">
            Las contraseñas no coinciden.
          </p>
        )}
        {passwordMatch && submitted && (
          <p className="text-green-500 pl-2 flex items-center h-8">
            Las contraseñas coinciden.
          </p>
        )}
        <div className="flex items-center gap-4 my-6 text-sm">
          <input id="form__changePass--check" type="checkbox" className="size-4" />
          <label
            htmlFor="form__changePass--check"
          >
            Recordar datos
          </label>
        </div>

        <div className="text-center mt-6">
          <button type="submit" className="bg-blueDark text-whiteLight w-full rounded-full border border-blueDark hover:bg-whiteLight hover:text-blueDark transition-all duration-300">
            Confirmar código de seguridad
          </button>
          <p className="mt-4">
            ¿Ya estás en Tehu?{" "}
            <Link to="/login" className="pl-2 text-blueDark font-semibold">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default FormChangePass;
