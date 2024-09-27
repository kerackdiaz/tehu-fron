import ItemMenu from "../ItemMenu/ItemMenu"


const Menu = () => {
    return (
        <nav className="aside__menu">
            <ItemMenu icon={"./dashboard.avif"} text="Dashboard" link="/escritorio"/>
            <ItemMenu icon={"./iconDevices.avif"} text="Dispositivos" link="/dispositivos"/>
            <ItemMenu icon={"./iconUsers.avif"} text="Usuarios" link="/usuarios"/>
            <ItemMenu icon={"./iconHelp.avif"} text="Ayuda" link="/ayuda"/>
        </nav>
    )
}

export default Menu