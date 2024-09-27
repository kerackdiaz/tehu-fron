import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigation = useNavigate()

  const handleLogout = () => {
    localStorage.clear();
    navigation('/')
  };

  return (
    <div>
      <ul>
        <li
          className="flex items-center text-white cursor-pointer"
          onClick={handleLogout}
        >
          <img className='w-5' src={"../iconLogout.avif"} loading="lazy" alt="Salir" title="Salir" />
          <p className="pl-2">Salir</p>
        </li>
      </ul>
    </div>
  )
}

export default Logout