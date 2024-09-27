import React, { useState, useContext } from 'react';
import { userContext } from '../../../main';
import Swal from 'sweetalert2';
import userRegisterCreateService from '../../../services/userRegisterCreateService';

interface FormValues {
  rolId: number;
  name: string;
  identificationNumber: string;
  identificationType: string;
  email: string;
  phone: string;
  password: string;
  workGroup: string;
}

function getEmptyFields(obj: Record<string, any>): string[] {
  return Object.keys(obj).filter(key => !obj[key]);
}

const AddUser = () => {
  const {userInfo} = useContext(userContext)
  const [formValues, setFormValues] = useState<FormValues>({
    rolId: 1,
    name: '',
    identificationNumber: '',
    email: '',
    identificationType: 'cc',
    phone: '',
    password: '',
    workGroup: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const traducirError = (objWoro: string[]): string[] => {
    const traducciones: string[] = [];
    for (const msg of objWoro) {
      switch (msg) {
        case "name":
          traducciones.push("Nombre");
          break;

        case "phone":
          traducciones.push("Numero de celular");
          break;

        case "email":
          traducciones.push("email");
          break;

        case "identificationNumber":
          traducciones.push("Numero de identificación");
          break;

        default:
          traducciones.push("");
          break;
      }
    }

    return traducciones;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emptyFields = getEmptyFields(formValues);
    if (emptyFields.length === 0) {      
      const res = await userRegisterCreateService(formValues, JSON.parse(localStorage.getItem('token') || userInfo.token)  )
      if(res.msg = "Usuario creado correctamente") {
        setFormValues({
          rolId: 1,
          name: '',
          identificationNumber: '',
          email: '',
          identificationType: 'cc',
          phone: '',
          password: '',
          workGroup: ''
        });
      } 
    } else {
      const res = traducirError(emptyFields)
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios!',
        text: `Por favor completa los siguientes campos antes de enviar el formulario: ${res.join(', ')}`,
        confirmButtonColor: '#3683B5',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  console.log(formValues);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full bg-white rounded-lg m-8 ">
        <div className="flex flex-col">
          <h1 className="text-gray-800 text-3xl">Crear nuevo usuario</h1>
          <span className="block text-blueLight uppercase text-xl">
            Administración de usuarios
          </span>
        </div>


        <div>
          <form id="form--add--user" className="flex flex-col gap-6 mt-2" onSubmit={handleFormSubmit}>

            <div className="flex flex-col md:flex-row gap-x-4 w-full ">
              <div className="flex flex-col md:w-2/4">
                <label htmlFor="rolId" className="pl-1">Tipo de usuario *</label>
                <select
                  name="rolId"
                  id="rolId"
                  value={formValues.rolId}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">Seleccionar</option>
                  <option value="2">Administrador</option>
                  <option value="3">Coordinador</option>
                  <option value="4">Operario</option>
                </select>
              </div>

              <div className="flex flex-col md:w-2/4">
                <label htmlFor="name" className="pl-1">Nombres y Apellidos *</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Juan Alejandro Muñoz Avellaneda"
                  value={formValues.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>



            <div className="flex flex-col md:flex-row gap-x-4 w-full ">
              <div className="flex flex-col md:w-2/4">
                <label className="pl-1">Documento de Identidad *</label>
                <div className="flex">
                  <div className="min-w-[75px] pr-2">
                    <select
                      name="identificationType"
                      id="identificationType"
                      value={formValues.identificationType}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="cc">C.C</option>
                      <option value="ce">C.E</option>
                    </select>
                  </div>

                  <div className="w-full md:w-3/4">
                    <input
                      type="number"
                      name="identificationNumber"
                      id="identificationNumber"
                      placeholder="12345678"
                      value={formValues.identificationNumber}
                      onChange={handleInputChange}
                      className="border border-gray-300 w-full rounded-md p-2"
                    />
                  </div>
                </div>
              
              </div>

              <div className="flex flex-col md:w-2/4">
                <label htmlFor="workGroup" className="pl-1">Seleccione un grupo *</label>
                <select
                  name="workGroup"
                  id="workGroup"
                  value={formValues.workGroup}
                  onChange={handleInputChange}
                  className="border border-gray-300 w-full rounded-md p-2"
                >
                  <option value="">Seleccionar</option>
                  <option value="2">Cali</option>
                  <option value="3">Bogotá</option>
                  <option value="4">Medellín</option>
                </select>
              </div>
            </div>


            <div className="flex flex-col md:flex-row gap-x-4 w-full ">
              <div className="flex flex-col md:w-2/4">
                <label htmlFor="email" className="pl-1">Correo electrónico *</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="colaborador1@correo.com"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="flex flex-col md:w-2/4">
                <label htmlFor="password" className="pl-1">Contraseña de ingreso *</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="pq2j3-7h@42j:"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>



            
            <div className="flex justify-center items-center w-full mt-4">
              <button className="bg-blueDark text-whiteLight w-48 rounded-full border border-blueDark hover:bg-whiteLight hover:text-blueDark transition-all duration-300">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default AddUser;
