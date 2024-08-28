import React from 'react'
import Navbar from './components/Navbar.tsx'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Signup from './pages/Signup.tsx'
import Chat from './pages/Chat.tsx'
import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'
import { useAuth } from './Context/Authcontext.tsx'

const App = () => {
  const auth = useAuth()
  
  
  return (
    <main>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        {auth?.isLoggedIn && <Route path='/chat' element={<Chat/>}/>}
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default App
