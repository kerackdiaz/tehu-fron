import Button from "../../components/atoms/Button/Button";
import Logo from "../../components/atoms/Logo/Logo";

const Inicio = () => {
    return (
        <div className="flex justify-center items-center min-h-screen py-28 bg-center bg-cover bg-[url('./back-mobile.avif')] md:bg-[url('./back-desktop.avif')]">
            <div className="text-center mt-12">
                <Logo />
                <div className="px-8">
                    <div className="text-whiteLight mt-32 ">
                        <h1 className="text-6xl min-[805px]:text-7xl">Monitoreo Tehu System</h1>
                        <h2 className="text-lg tracking-[2px] md:tracking-[3px]">
                            mediciones autónomas de temperatura y humedad relativa
                        </h2>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-8 mt-10 md:flex-row">
                        <Button className="bg-whiteLight text-blueDark border border-whiteLight hover:bg-transparent hover:text-whiteLight transition-all duration-300" text="Iniciar sesión" route="/login" />
                        <Button className="bg-blueDark text-whiteLight border border-blueDark hover:bg-blueHover hover:border-whiteLight transition-all duration-300" text="Registrarse" route="/registro" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;