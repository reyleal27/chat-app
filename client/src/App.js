import React, { Suspense } from 'react'
import { Route, Routes, } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
         <Route path='/' element={<Chat/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
     <Route path='/setavatar' element={<SetAvatar/>}/>
    </Routes>
    </Suspense>
  )
};

export default App;
