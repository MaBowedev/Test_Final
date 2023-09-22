
import React, { useContext, useEffect, useState } from 'react'
import Header from './Header.jsx'
import { Link, Navigate, useParams } from 'react-router-dom';
import img from '../assets/images/Iran.jpg'
import formatISO9075 from 'date-fns/esm/fp/formatISO9075/index';
import { compareAsc, format } from 'date-fns'
import { UserContext } from './UserContext.jsx';

function Selected() {
    const [redirect, setRedirect] = useState(false)
    const [postInfo, setPostInfo] = useState(null)
    const { userInfo } = useContext(UserContext)
    const { id } = useParams();
    useEffect(() => {
        fetch('http://localhost:8080/post/' + id).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    }, []);

    if (!postInfo) return '';


    async function deleteArt(id) {
        const response = await fetch(`http://localhost:8080/post/${id} `, {
            method: 'Delete',

        });


        if (response.ok) {
            setRedirect(true);
            alert('Delete successful');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }


    return (

        <main className=' bg-gray-200 h-full '>

            <div className='flex items-center justify-center  w-full'>
                <Header />
            </div>

            <section className='flex flex-col mt-5  items-center gap-5'>
                <h1 className=' text-5xl  w-1/2'>{postInfo.title}</h1>

                <img className='w-1/2 h-80 flex' src={`http://localhost:8080/${postInfo.cover}`} alt="" />
                <p className='w-1/2 text-3xl'>{postInfo.content}</p>
                <p>By {postInfo.author.username}</p>

                <time> Pubblicato il {format(new Date(postInfo.createdAt), 'd MMM - YYY')}</time>
                <div className='flex gap-5 items-center justify-center'>

                    <div className='border border-white rounded-md bg-black p-2'> <Link to={`/edit/${postInfo._id}`}><button className=' text-white rounded-md'>Modifica</button></Link> </div>
                    <div>  <button onClick={(e) => deleteArt(postInfo._id)} className='border border-white  bg-black text-white rounded-md p-2'>Elimina</button></div>


                </div>
            </section>


        </main>



    )
}

export default Selected