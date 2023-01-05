import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from './Register/Register';
import List from './List/List';
import Container from './ColorChange/Container';
import Form from './Form/Form';
import MultiForm from './MultiForm/MultiForm';
import BigCalendar from './Calendar/Calendar';
import ApiChallenge from './ApiChallenge/ApiChallenge'

// Form provider까먹지만
import { FormProvider } from './context/FormContext';
import { ApiChallengeProvider } from './context/ApiChallengeContext';

const RoutesPath = () => {
  return (
    <Routes>
        <Route 
        path='/list' 
        element={
        <List/>} 
        />

        
      <Route 
        path='/form' 
        element={<Form/>} 
        />
          <Route 
          path='/multiForm' 
          element={            
          <FormProvider>
            <MultiForm/>
          </FormProvider>
        } 
          />

          <Route 
            path='/apiChallenge'
            element={
            <ApiChallengeProvider>

              <ApiChallenge/>
            </ApiChallengeProvider>
            }
            />
   
   <Route 
        path='/bigCalendar' 
        element={<BigCalendar/>} 
        />


        <Route 
        path='/register' 
        element={<Register/>} 
        />



      <Route 
        path='/color_change' 
        element={<Container/>} 
        />
  </Routes>

  )
}

export default RoutesPath