import React from 'react'
import useApiContext from '../hooks/useApiContext';

const Button = ({buttonText}) => {
    const {
        reqType,
        setReqType
      } = useApiContext();
  
    return (
    <button
        className={buttonText === reqType ? "select" : null}
        onClick={() => setReqType(buttonText)}
    >

        {buttonText}
    </button>
  )
}

export default Button