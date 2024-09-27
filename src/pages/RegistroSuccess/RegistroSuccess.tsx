
import { Link } from 'react-router-dom'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { green } from '@mui/material/colors';

const RegistroSuccess = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center text-gray-700" style={{ backgroundImage: `url(${window.innerWidth >= 768 ? './back-desktop.avif' : './back-mobile.avif'})` }}>
            <div className="bg-blueLight4 rounded-3xl shadow-lg py-10 px-6 mx-4 max-w-[500px]">
                <div className="flex max-[500px]:flex-col justify-center items-center gap-y-4 gap-x-8">
                    <CheckCircleOutlineRoundedIcon sx={{ fontSize: 130, color: green[400]  }} />
                    <h1 className="text-blueDark2 font-bold max-[500px]:text-center text-left text-5xl max-[500px]:w-full w-[240px] leading-[50px] ">Su registro ha sido exitoso</h1>
                </div>
                <hr className='mt-10 border border-blueLight2'/>
                <div className="flex flex-col items-center mt-10">
                    <p className=" text-justify self-start">
                        En la bandeja de entrada de su correo electrónico, le haremos llegar su respectivo ID USUARIO, para poder iniciar su cuenta con TEHU SYSTEM.
                    </p>
                    <p className="mt-2 self-start">Gracias por contar con nosotros.</p>
                    
                    <Link className="block mt-10 w-full" to={'/login'}>
                        <button className="bg-blueDark text-whiteLight w-full rounded-full border border-blueDark hover:bg-whiteLight hover:text-blueDark transition-all duration-300">Iniciar sesión</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegistroSuccess