import { useState } from 'react'
import FormLoginSectionOne from '../../molecules/FormLoginSectionOne/FormLoginSectionOne'
import FormLoginSectionTwo from '../../molecules/FormLoginSectionTwo/FormLoginSectionTwo'



const FormLogin = () => {

    const [sectionNext, setSectionNetx] = useState(false)
    const [userEmail, setUserEmail] = useState('')

    return (
        <div className="bg-blueLight4 shadow-md rounded-3xl m-auto p-8 h-[500px]">
            {!sectionNext && <FormLoginSectionOne setUserEmail={setUserEmail} setSectionNetx={setSectionNetx} />}
            {sectionNext && <FormLoginSectionTwo userEmail={userEmail} />}
        </div>
    )
}

export default FormLogin