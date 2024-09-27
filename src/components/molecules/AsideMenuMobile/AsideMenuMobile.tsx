import { useState } from 'react';
import ItemMenu from "../../atoms/ItemMenu/ItemMenu"


const AsideMenuMobile = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  return (
    <div className="w-full z-10">
      <div className="bg-blueLight h-24 flex items-center justify-between px-6">
        <div
          className={`${menuActive ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <img
            className=""
            src={"/iconHamburguer.avif"}
            loading="lazy"
            alt="Tehu System"
            title="Tehu System"
          />
        </div>
        <div className="">
          <img
            className=""
            src={"/logoTehuWhite.avif"}
            loading="lazy"
            alt="Tehu System"
            title="Tehu System"
          />
        </div>
      </div>
      <div className="">
        <nav
          className={`${menuActive ? 'opacity-100 visible' : 'opacity-0 invisible'
            } bg-blueDark flex flex-col gap-4 py-20 h-screen absolute top-31 w-full z-10 transition-opacity ease-in duration-500`}
          onClick={toggleMenu}
        >
          <ItemMenu
          
            icon={"/iconUserWhite.avif"}
            text="Perfil"
            link="/perfil"
          />
          <ItemMenu
          
            icon={"/dashboard.avif"}
            text="Dashboard"
            link="/escritorio"
          />
          <ItemMenu
          
            icon={"/iconDevices.avif"}
            text="Dispositivos"
            link="/dispositivos"
          />
          <ItemMenu
            
            icon={"/icon-temperature.avif"}
            text="Temperaturas"
            link="/temperaturas"
          />
          <ItemMenu
            
            icon={"/iconUsers.avif"}
            text="Usuarios"
            link="/usuarios"
          />
          {/* <ItemMenu
            
            icon={"/icon-reports.avif"}
            text="Informes"
            link="/informes"
          /> */}
          <ItemMenu
            
            icon={"/iconHelp.avif"}
            text="Ayuda"
            link="/ayuda"
          />
        </nav>
      </div>
    </div>
  )
}

export default AsideMenuMobile