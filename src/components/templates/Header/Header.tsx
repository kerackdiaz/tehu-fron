import Logout from '../../atoms/Logout/Logout'
import Notification from '../../atoms/Notification/Notification'
import User from '../../atoms/User/User'


const Header = () => {
  return (
    <header className="flex items-center justify-end bg-blueLight h-16 fixed top-0 w-full z-10 lg:w-[80%] xl:w-[85%] 2xl:w-[86%] pr-10">
      <div className="flex items-center gap-8 justify-end px-12 w-full">
        <User />
        <Notification />
        <Logout />
      </div>
    </header>
  )
}

export default Header