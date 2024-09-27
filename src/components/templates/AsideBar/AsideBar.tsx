import AsideMenu from '../../molecules/AsideMenu/AsideMenu'
import Logout from '../../atoms/Logout/Logout'




const AsideBar = () => {
  return (
    <aside className="relative w-full">
      <div className="bg-blueDark flex flex-col h-screen md:gap-40">
        <div className="flex items-center justify-center pt-14 text-center">
          <img
            className="w-30"
            src={"/logoTehuWhite.avif"}
            loading="lazy"
            alt="Tehu System"
            title="Tehu System"
          />
        </div>
        <AsideMenu />
        
        <div className="bg-blueDark2 absolute bottom-0 w-full h-14">
          <div className="text-blueLight2 flex items-center justify-center h-full w-full">
            <Logout />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AsideBar