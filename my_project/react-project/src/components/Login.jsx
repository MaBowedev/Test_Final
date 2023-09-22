import React from 'react'
import Img from '../assets/images/Iran.jpg'
import { Link } from 'react-router-dom';
import Header from './Header.jsx'
import { useState } from "react";
import { Navigate } from "react-router-dom";


function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  async function do_login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    if (response.ok) {
      setRedirect(true);
    } else {
      alert('credenziali errate')
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (

    <main className=' bg-gray-200 h-screen '>
      <div className='  flex items-center justify-center  w-full'>
        <Header />
      </div>

      <section className=' flex justify-center items-center text-center mt-20 pt-5 '>

        <form className=' bg-red-500 w-1/3 p-5 rounded-md ' id='login' onSubmit={do_login}>
          <h2 className='font-bold text-4xl'>Log-in</h2>
          <p className='mt-10 font-bold'>Inserisci il tuo nome utente e password per accedere</p>

          <div className='flex flex-col justify-center items-center mt-2 gap-5'>

            <input className='border-2 border-black w-2/3 rounded-md ' type="text"
              placeholder='username...'
              value={username}
              onChange={ev => setUsername(ev.target.value)} />

            <input className='border-2 border-black w-2/3 rounded-md ' type="password"
              placeholder='password...'
              value={password}
              onChange={ev => setPassword(ev.target.value)} />

            <button className='border-2 border-black mt-2 w-1/3 rounded-lg bg-gray-300'>Login</button>
          </div>

        </form>
      </section>



    </main>
  )
}

export default Login