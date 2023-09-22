import React from 'react'
import img from '../assets/images/Iran.jpg'
import { Link } from 'react-router-dom';
import { compareAsc, format } from 'date-fns'
import formatISO9075 from 'date-fns/esm/fp/formatISO9075/index';



function Article({_id, title, genre,  summary, cover, content,  createdAt, author}) {
    return (



        <section className='flex flex-col w-full rounded-md  border-t  border-b mb-5 border-black  ' >

            <div >

                <Link to= {`/post/${_id}`} >
                <h1 className=' text-left text-3xl font-bold ' >{title}</h1>
                </Link>
               <Link to={`/post/${_id}`}> 
                <img className='w-full rounded-md h-96  ' src={'http://localhost:8080/'+cover} />
              </Link>
                <div className='text-left '>
                    <p className='text-xl font-semibold '>{summary}</p>
                    <p className='font-bold flex gap-2 mt-2' id='info'>
                        <a>by {author.username}</a>
                        <time>{format(new Date(createdAt), 'd MMM- YYY')}</time>
                        <p>{genre}</p>
                    </p>
                </div>

            </div>

        </section>
    )
}

export default Article