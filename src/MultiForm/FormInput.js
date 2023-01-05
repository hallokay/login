import React from 'react'
import useFormContext from '../hooks/useFormContext'
import MultiBilling from './MultiBilling'
import Shipping from './Shipping'
import OptIn from './OptIn'


const FormInput = () => {
    const { page } = useFormContext();

    const display = {
        0: <MultiBilling />,
        1: <Shipping />,
        2: <OptIn />
    }

    const content = (
        <div className="form-inputs">
            {display[page]}
        </div>
    )

    return content

}

export default FormInput