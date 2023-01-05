import React, { useState } from 'react'
import Input from './Input'
import Square from './Square'

const Container = () => {
    const [colorValue , setColorValue] = useState('');
    const [hexValue , setHexValue] = useState('');
    const [isDarkTxt , setIsDarkTxt] = useState(true);



  return (
    <div>   
        <Square
        colorValue={colorValue}
        hexValue={hexValue}
        isDarkTxt={isDarkTxt}
         />
        <Input
            colorValue={colorValue}
            setColorValue={setColorValue} 
            setHexValue={setHexValue}
            isDarkTxt={isDarkTxt}
            setIsDarkTxt={setIsDarkTxt}
            />

    </div>
  )
}

export default Container