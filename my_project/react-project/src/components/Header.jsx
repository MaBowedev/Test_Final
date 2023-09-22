import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useState } from 'react'
import { Navigate } from "react-router-dom";



export default function Header() {
    const [username, setUsername] = useState(null)


    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include',

        }).then(response => {
            response.json().then(userinfo => {
                setUsername(userinfo.username);
            });
        });
    }, []);


    function logout() {
        fetch('http://localhost:8080/logout', {
            credentials: 'include',
            method: 'POST',
        })
        setUsername(null);

    }





    return (
        <main className='w-3/4 bg-red-500 rounded-md  ' >

            <div className='flex justify-center'>
                <h1 className=" font-bold bg-white rounded-full w-1/3 text-center text-3xl ">IL BLOG QUOTIDIANO</h1>
            </div>
            <header className=" rounded-full"  >

                <nav className="flex gap-10 justify-between font-bold">

                    <div className="flex font-extrabold  hover:scale-125 hover:text-white  ease-in-out duration-300 rounded-md flex-col items-center  ml-6 ">
                        <Link className='flex flex-col mb-2 items-center' to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg><p>Home</p>
                                
                        </Link>
                        

                    </div>



                    <div className=" flex gap-5 mr-5">



                        <nav className='flex font-extrabold items-center gap-5'>
                            {username && (
                                <>
                                    <Link className="flex flex-col  hover:scale-125 hover:text-white mb-2 mr-5  ease-in-out duration-300 rounded-md   items-center" to="/create">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                        </svg>
                                        <p>Crea nuovo articolo</p>

                                    </Link>





                                    <a onClick={logout} className="flex flex-col mr-5 items-center mb-2  hover:scale-125 hover:text-white  ease-in-out duration-300 rounded-md  cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                        <p>Log-out</p>

                                    </a>

                                </>
                            )}

                            {!username && (

                                <>


                                    <Link className="flex flex-col items-center mr-5 mb-2 hover:scale-125 hover:text-white  ease-in-out duration-300 rounded-md " to="/login">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                                        </svg>

                                        <p>Log-in</p>
                                    </Link>

                                    <Link className="flex flex-col items-center mb-2  hover:scale-125 hover:text-white  ease-in-out duration-300 rounded-md " to="/register">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                        </svg>

                                        <p>Register</p>
                                    </Link>


                                </>



                            )}

                        </nav>

                    </div>
                </nav>

            </header>
        </main>

    )

}