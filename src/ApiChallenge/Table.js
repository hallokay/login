import React from 'react'
import useApiContext from '../hooks/useApiContext'
import Row from './Row'
const Table = () => {
    const {
        items
    } = useApiContext()
  return (
    <>
        <table>
            <tbody>
                {items.map((item) => (
                    <Row item={item} />
                ))}
            </tbody>
        </table>
    </>
  )
}

export default Table