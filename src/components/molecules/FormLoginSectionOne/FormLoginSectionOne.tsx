import { useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import hasEmptyString from '../../../helpers/validateObjectString';
import { UserData, FormLoginSectionOneProps } from '../../../interfaces/interfaces';
import userLoginService from '../../../services/userLoginService';
import { userContext } from '../../../main';

const FormLoginSectionOne = ({ setSectionNetx, setUserEmail }: FormLoginSectionOneProps) => {
    const { setUserInfo, userInfo } = useContext(userContext);

    const navigation = useNavigate();
    const [userData, setUserData] = useState<UserData>({
        email: '',
        password: '',
        chekData: false,
    });

    const loginUser = async (e: any) => {
        e.preventDefault();
        setUserEmail(userData.email);
        if (!hasEmptyString(userData)) {
            const res = await userLoginService(userData);
            if (res.token) {
                res.token &&
                    setUserInfo({ ...userInfo, token: res.token, id: res.id, rute: res.rolId });
                res.authenticated === '1'
                    ? navigation('/escritorio')
                    : setSectionNetx(true);
            }
        }
    };

    return (
        <form
            onSubmit={(e) => loginUser(e)}
            className='flex flex-col items-center px-4 text-gray-700'
        >
            <img
                src={"./iconUser.avif"}
                loading='lazy'
                alt='Usuario Tehu'
                title='Usuario Tehu'
                className='size-[75px]'
            />
            <div className='flex flex-col mt-10 w-full'>
                <label
                    className='pl-1 text-left'
                    htmlFor='form__login--form--userID'
                >
                    Ingresar con ID
                </label>
                <input
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserData({ ...userData, email: e.target.value })
                    }
                    id='form__login--form--userID'
                    type='email'
                    placeholder='correo@correo.com'
                    autoComplete='username'
                    name='email'
                    value={userData.email}
                    className='mt-1 rounded-lg border border-blueLight px-2 placeholder:text-gray-300'
                />
            </div>

            <div className='flex flex-col mt-6 w-full'>
                <label
                    className='pl-1 text-left'
                    htmlFor='form__login--form--password'
                >
                    Contraseña
                </label>
                <input 
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserData({ ...userData, password: e.target.value })
                    }
                    id='form__login--form--password'
                    type='password'
                    placeholder='********'
                    autoComplete='current-password'
                    name='password'
                    value={userData.password}
                    className='mt-1 rounded-lg border border-blueLight px-2 placeholder:text-gray-300'
                />
            </div>

            <div className='mt-10 w-full flex flex-col items-center'>
                <label className=''>
                    
                </label>
                <button className='bg-blueDark text-whiteLight w-full rounded-full border border-blueDark hover:bg-whiteLight hover:text-blueDark transition-all duration-300'>
                    Iniciar sesión
                </button>

                <p className='mt-4'>
                    ¿Eres nuevo en Tehu?{' '}
                    <Link to='/registro' className='pl-4 text-blueDark font-semibold'>
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default FormLoginSectionOne;