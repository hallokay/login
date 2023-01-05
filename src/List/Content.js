import React from 'react'
import ItemList from './ItemList';

const Content = ({items,handleCheck, handleDelete }) => {
  return (
    <>
    {items.length ? (
        <ItemList 
          items={items}
          handleCheck={handleCheck} 
          handleDelete={handleDelete} />
        ) : (
          <p>아이템이 없습니다.</p>
        )}
    </>
  )
}

export default Content