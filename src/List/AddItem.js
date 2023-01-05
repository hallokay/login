import React, {useRef} from 'react';
import { FaPlus } from 'react-icons/fa';

const AddItem = ({handleSubmit, setAddItem, addItem}) => {
  const inputRef = useRef();
  return (
    <>
        <form 
          className='addForm'
          onSubmit={handleSubmit}
        >
            <label htmlFor="addItem">Add Item</label>
            <input 
                type="text"
                id='addItem'
                ref={inputRef}
                required
                autoFocus
                placeholder='Add Item'
                value={addItem}
                onChange={(e) => setAddItem(e.target.value)}
                 />
            <button
                type="submit"
                aria-label='Add Item'
                onClick={() => inputRef.current.focus()}
                >
                    <FaPlus/>
                </button>
        </form>
    </>
  )
}

export default AddItem