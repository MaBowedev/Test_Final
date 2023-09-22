import React from 'react'
import { useState } from "react";
import Img from '../assets/images/Iran.jpg'
import { Link } from 'react-router-dom';
import Header from './Header.jsx'





function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function send_register(ev) {
    ev.preventDefault();

    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (response.status === 200) {
      alert('registration successful');
    }
    else {
      alert('registration failed');
    }
  }


  return (

    <main className=' bg-gray-200 h-screen '>
      <div className='flex items-center justify-center  w-full'> 
               <Header />
               </div>
      <section className='text-center flex items-center justify-center mt-20 pt-5'>

        <form className=' bg-red-500 w-1/3 p-5 rounded-md ' id='register' onSubmit={send_register}>
          <h2 className='font-bold text-4xl'>Register</h2>
          <p className='mt-10 font-bold'>Inserisci i dati richiesti per poterti registrare</p>
          <div className='flex flex-col justify-center items-center mt-2 gap-5  '>

            <input className='border-2 border-black w-2/3 rounded-md' type="text"
              placeholder='username min 5 caratteri...' value={username}
              onChange={ev => setUsername(ev.target.value)} />

            <input className='border-2 border-black w-2/3 rounded-md' type="password"
              placeholder='password min 5 caratteri...'
              value={password}
              onChange={ev => setPassword(ev.target.value)} />

            <button className='border-2  border-black mt-2 w-1/3 rounded-lg bg-gray-300'>Register</button>
          </div>

        </form>
      </section>



    </main>
  )
}

export default Register