import { useState } from 'react'
import { Link } from 'react-router-dom'

const ButtonCreateReport = () => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Link className='relative' to="/informes">
        <button className="bg-blueDark2 rounded-full text-whiteLight font-semibold h-10 pl-8 w-[160px] hover:bg-transparent hover:text-blueDark border border-blueDark transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >Crear informe
          <img
            className="absolute w-5 left-4 top-1/2 -translate-y-1/2"
            src={isHovered ? "../icon-report.avif" : "../icon-reports-white.avif"}
            alt="Crear Reportes"
          />
        </button>


      </Link>

    </>
  )
}

export default ButtonCreateReport