import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import hasEmptyString from '../../../helpers/validateObjectString'
import userRegisterService from '../../../services/userRegisterService'
import { Register } from '../../../interfaces/interfaces'

const FormRegister = () => {
    const navigate = useNavigate()
    const [userRegister, setUserRegisterInfo] = useState<Register>({
        company: '',
        name: '',
        position: '',
        phone: '',
        email: '',
        password: '',
        rolId: '1',
        authenticated: false,
        identificationNumber: '',
    });


    const registerUser = async (e: any) => {
        e.preventDefault()
        console.log(userRegister);

        if (!hasEmptyString(userRegister)) {
            await userRegisterService(userRegister) && navigate('/registro-exitoso')
        }
    }

    return (
        <div className='bg-whiteLight rounded-3xl mx-auto py-10 px-8 shadow-lg lg:max-w-[500px] text-grayDark'>
            <form onSubmit={(e) => registerUser(e)} className='flex flex-col space-y-4'>
                <div className='mb-1'>
                    <h1 className=' text-3xl font-semibold text-center mb-2'>
                        Nuevo registro
                    </h1>
                    <hr className='border-[1px] border-blueLight3'/>
                </div>

                <div>
                    <label className='block pl-1' htmlFor="form__register--form--name">Nombre Administrador</label>
                    <input
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegisterInfo({ ...userRegister, name: e.target.value })}
                        id='form__register--form--name'
                        type="text"
                        placeholder='Nombre'
                        className='w-full p-4 border border-blueLight rounded-lg'
                    />
                </div>

                <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
                    <div className='w-full'>
                        <label className='block pl-1' htmlFor="form__register--form--cargo">Cargo</label>
                        <input
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegisterInfo({ ...userRegister, position: e.target.value })}
                            id='form__register--form--cargo'
                            type="text"
                            placeholder='Cargo'
                            className='w-full p-4 border border-blueLight rounded-lg'
                        />
                    </div>
                    <div className='w-full'>
                        <label className='block pl-1' htmlFor="form__register--form--enty">Entidad/Laboratorio</label>
                        <input
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegisterInfo({ ...userRegister, company: e.target.value })}
                            id='form__register--form--enty'
                            type="text"
                            placeholder='Entidad'
                            className='w-full p-4 border border-blueLight rounded-lg'
                        />
                    </div>
                </div>

                <div>
                    <label className='block pl-1' htmlFor="form__register--form--tel">Teléfono de contacto</label>
                    <input
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegisterInfo({ ...userRegister, phone: e.target.value })}
                        id='form__register--form--tel'
                        type="tel"
                        placeholder='0000000000'
                        className='w-full p-4 border border-blueLight rounded-lg'
                    />
                </div>

                <div>
                    <label className='block pl-1' htmlFor="form__register--form--id">Número de Identificación</label>
                    <input
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegisterInfo({ ...userRegister, identificationNumber: e.target.value })}
                        id='form__register--form--id'
                        type="number"
                        placeholder='0000000000'
                        className='w-full p-4 border border-blueLight rounded-lg'
                    />
                </div>

                <div>
                    <label className='block pl-1' htmlFor="form__register--form--email">Correo</label>
                    <input
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegisterInfo({ ...userRegister, email: e.target.value })}
                        id='form__register--form--email'
                        type="email"
                        placeholder='correo@mail.com'
                        className='w-full p-4 border border-blueLight rounded-lg'
                    />
                </div>

                <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
                    <div className='w-full'>
                        <label className='block pl-1' htmlFor="form__register--form--pass">Contraseña</label>
                        <input
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegisterInfo({ ...userRegister, password: e.target.value })}
                            id='form__register--form--pass'
                            type="password"
                            placeholder='********'
                            className='w-full p-4 border border-blueLight rounded-lg'
                        />
                    </div>
                    <div className='w-full'>
                        <label className='block pl-1' htmlFor="form__register--form--conf">Confirmar contraseña</label>
                        <input
                            id='form__register--form--conf'
                            type="password"
                            placeholder='********'
                            className='w-full p-4 border border-blueLight rounded-lg'
                        />
                    </div>
                </div>

                <div className='text-center'>
                    <button className='mt-4 bg-blueDark text-whiteLight w-full rounded-full border border-blueDark hover:bg-whiteLight hover:text-blueDark transition-all duration-300'>Registrarse</button>
                    <p className='mt-4 text-gray-700'>
                        ¿Ya estás en Tehu? <Link to='/login' className="pl-4 text-blueDark font-semibold">Iniciá sesión</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default FormRegister