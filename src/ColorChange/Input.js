import React from 'react'
import colorNames from 'colornames'
const Input = ({colorValue, setColorValue, setHexValue, isDarkTxt, setIsDarkTxt }) => {
  return (
    <form onSubmit={e => e.preventDefault()}>
        <label>Add Color Name</label>
        <input 
            type="text" 
            autoFocus
            placeholder='Add color name'
            required
            value={colorValue}
            onChange={e => {
                setColorValue(e.target.value)
                setHexValue(colorNames(e.target.value))
            }}
            />
            <button
                onClick={() => setIsDarkTxt(!isDarkTxt)}>
                글자 색상 변환
            </button>

    </form>
  )
}

export default Input