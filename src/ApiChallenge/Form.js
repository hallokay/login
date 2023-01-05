import React from 'react'
import useApiContext from '../hooks/useApiContext';
import Button from './Button';

const Form = () => {

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Button 
        buttonText="users"
      />
        <Button 
        buttonText="posts"
      />
        <Button 
        buttonText="comments"
      />
    </form>
  )
}

export default Form