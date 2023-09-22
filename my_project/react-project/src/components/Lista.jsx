import React from 'react'
import img from '../assets/images/Iran.jpg'
import { Link } from 'react-router-dom';
import { compareAsc, format } from 'date-fns'
import formatISO9075 from 'date-fns/esm/fp/formatISO9075/index';

/* fare funzione per andare a contare numero di caratteri per title che non superi i 40 */

function Lista({ _id, title, summary, content, cover, createdAt, author }) {


    function adaptTitle (string){
    
        let newTitle = ''
        if(string.length <= 50){
            newTitle = string
        }
        else{
         newTitle = string.substring(0 , 50) + '...'
            
              
        }
        return newTitle
    } 
 


return (
    <section className=' flex justify-center items-center border hover:scale-105 ease-in-out duration-300 border-black  mt-5' >

        <div className=' ' >


            <div className='w-52 h-40   text-center '>
                <Link to={`/post/${_id}`} >
                    <div > <h1 className='text-sm  font-bold  break-words'>"{adaptTitle(title)}"</h1></div>
                </Link><p className='font-semibold text-sd justify-center  flex gap-2 ' id='info'>
                    <time>{format(new Date(createdAt), 'd MMM- YYY')}</time></p>
                <Link to={`/post/${_id}`}>
                    <img className='  h-28 w-full ' src={'http://localhost:8080/' + cover} />
                </Link>
            </div>

        </div>



    </section>


)
}

export default Lista