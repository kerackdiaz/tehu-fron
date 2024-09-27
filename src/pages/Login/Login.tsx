import Logo from '../../components/atoms/Logo/Logo'
import FormLogin from '../../components/organisms/FormLogin/FormLogin'

const Login = () => {


        


    return (
        <div className="min-h-screen flex items-center justify-center bg-center bg-cover bg-[url('./back-mobile.avif')] md:bg-[url('./back-desktop.avif')]">
            <div className="text-center w-11/12 max-w-full py-28 md:w-[400px]">
                <Logo />
                <div className="mt-20">
                    <FormLogin />
                </div>
            </div>
        </div>
    )
}

export default Login
