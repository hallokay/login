import React from 'react'

const Square = ({colorValue, hexValue, isDarkTxt}) => {
  return (
    <>
        <section 
            className="square"
            style={{
                backgroundColor: colorValue,
                color: isDarkTxt ? '#111' : '#fff'
                }}>
        
            <p>{colorValue ? colorValue : 'Empty Value'}</p>
            <p>{hexValue ? hexValue :  null}</p>

        </section>
    </>
  )
}

Square.defaultProps = {
   colorValue: 'Empty Color Value' 
}
export default Square