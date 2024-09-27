import Logo from '../../components/atoms/Logo/Logo'
import FormChangePass from '../../components/molecules/FormChangePass/FormChangePass'



const ChangePass = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-center bg-cover bg-[url('./back-mobile.avif')] md:bg-[url('./back-desktop.avif')]">
            <div className="flex flex-col items-center text-center py-28 max-w-full">
                <Logo />
                <div className="mt-20">
                    <FormChangePass />
                </div>
            </div>
        </div>
    )
}

export default ChangePass