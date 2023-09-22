
import Header from './Header.jsx'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useParams } from "react-router-dom";



function Edit() {
    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState('')

    useEffect(() => {
        fetch('http://localhost:8080/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                });
            });
    }, [])

    async function updateArt(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('genre', genre);
        data.set('summary', summary);
        data.set('content', content)
        data.set('id', id)
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }

        const response = await fetch('http://localhost:8080/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });
        if (response.ok) {
            setRedirect(true);
        }
        else{
            alert(`non sei l'autore dell'articolo non puoi modificarlo`)
        }

    }




    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }




    return (
        <main className=' bg-gray-200 h-screen '>
            <div className='flex items-center justify-center  w-full'>
                <Header />
            </div>

            <div className='flex justify-center mt-5'>

                <form onSubmit={updateArt} className='flex w-1/3  text-center flex-col items-center border border-black justify-center'>
                    <h2 className='p-2 font-semibold text-2xl bg-red-500 w-full'>Modifica o articolo</h2>
                    <input className='border border-black p-5 w-full ' type="title"
                        placeholder={'Title'}
                        value={title}
                        onChange={ev => setTitle(ev.target.value)} />

                    <select value={genre} onChange={ev => setGenre(ev.target.value)} className='border border-black p-5 w-full' name="Genre" id="">
                        <option value=""></option>
                        <option value="Politica">Politica</option>
                        <option value="Attualità">Attualità</option>
                        <option value="Cronaca">Cronaca</option>
                        <option value="Sport">Sport</option>
                        <option value="Cultura">Cultura</option>

                    </select>
                    <input className='border border-black p-5 w-full' type="summary"
                        placeholder={'Summary'}
                        value={summary}
                        onChange={ev => setSummary(ev.target.value)} />
                    <input className='border border-black p-5 bg-white w-full' type="file"
                        onChange={ev => setFiles(ev.target.files)} />
                    <textarea placeholder={'Contenuto...'}
                        value={content}
                        onChange={ev => setContent(ev.target.value)} className='border p-5 h-full text-left w-full border-black' name="" id="" cols="30" rows="10"></textarea>
                    <button className='border flex items-center  hover:text-white hover:scale-105   ease-in-out duration-300 justify-center font-semibold text-2xl p-1 mb-2 bg-red-500 w-full border-black'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                        </svg>
                        <p>Modifica Articolo</p>
                    </button>
                </form>
            </div>

        </main>
    )
}

export default Edit