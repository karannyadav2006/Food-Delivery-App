import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Forgetpassword from './Pages/Forgetpassword'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/forget' element={<Forgetpassword/>}/>
     </Routes>
     {/* <Signup/> */}
    </>
  )
}

export default App
