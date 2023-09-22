import { useState } from 'react'
import Home from './components/Home.jsx'
import { Link } from 'react-router-dom';
import Login from './components/Login.jsx'
import Img from './assets/images/Iran.jpg'
import Register from './components/Register.jsx'
import './App.css'

import Create from './components/Create.jsx'
import Selected from './components/Selected.jsx'
import Edit from './components/Edit.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './components/UserContext.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<Selected />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </UserContextProvider>

  )


}

export default App
