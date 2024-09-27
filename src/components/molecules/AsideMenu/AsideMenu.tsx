import ItemMenu from "../../atoms/ItemMenu/ItemMenu"

const AsideMenu = () => {
    return (
        <nav className="flex flex-col gap-4 px-4">
            <ItemMenu icon={"/iconUserWhite.avif"} text="Perfil" link="/perfil"/>
            <ItemMenu icon={"/dashboard.avif"} text="Dashboard" link="/escritorio"/>
            <ItemMenu icon={"/iconDevices.avif"} text="Dispositivos" link="/dispositivos"/>
            <ItemMenu icon={"/icon-temperature.avif"} text="Temperaturas" link="/temperaturas"/>
            <ItemMenu icon={"/iconUsers.avif"} text="Usuarios" link="/usuarios"/>
            {/* <ItemMenu icon={"/icon-reports.avif"} text="Informes" link="/informes"/> */}
            <ItemMenu icon={"/iconHelp.avif"} text="Ayuda" link="/ayuda"/>
        </nav>
    )
}

export default AsideMenu