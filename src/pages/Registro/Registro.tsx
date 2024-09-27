import Logo from "../../components/atoms/Logo/Logo"
import FormRegister from "../../components/organisms/FormRegister/FormRegister"


const Registro = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-cover bg-[url('./back-mobile.avif')] md:bg-[url('./back-desktop.avif')] py-20">
      <div className="flex flex-col md:flex-row items-center gap-y-20 w-full max-w-screen-xl px-5">
        <div className="md:w-[40%]">
          <Logo width="150px"/>
        </div>
        <div className="w-[85%] lg:w-[45%]">
          <FormRegister />
        </div>
      </div>
    </div>
  )
}

export default Registro