import React, { useEffect, useState } from 'react'
import Header from './Header.jsx'
import { Link } from 'react-router-dom';
import Article from './Article.jsx'
import Lista from './Lista.jsx'
import pic1 from '../assets/images/pubblicità.jpg'
import pic2 from '../assets/images/vancanze.jpg'



function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/post').then(response => {
            response.json().then(posts => {
                setPosts(posts)
            });
        });
    }, []);

    function slideLeft() {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }


    function slideRight() {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }




    function OrderPost_politica() {
        let counte = 0
        posts.forEach((el) => {
            if (el.genre == "Politica") {
                counte++
            }
        })
        console.log(counte)
        if (counte > 0) {
            const newSort = posts.filter(obj => (obj.genre == "Politica"))
            console.log(newSort)
            return setPosts(newSort)
        }
        else {
            location.reload()
        }
    }
    function OrderPost_attualità() {
        let counte = 0
        posts.forEach((el) => {
            if (el.genre == "Attualità") {
                counte++
            }
        })
        console.log(counte)
        if (counte > 0) {
            const newSort = posts.filter(obj => (obj.genre == "Attualità"))
            console.log(newSort)
            return setPosts(newSort)
        }
        else {
            location.reload()
        }
    }


    function OrderPost_cronaca() {
        let counte = 0
        posts.forEach((el) => {
            if (el.genre == "Cronaca") {
                counte++
            }
        })
        console.log(counte)
        if (counte > 0) {
            const newSort = posts.filter(obj => (obj.genre == "Cronaca"))
            console.log(newSort)
            return setPosts(newSort)
        }
        else {
            location.reload()
        }
    }


    function OrderPost_sport() {
        let counte = 0
        posts.forEach((el) => {
            if (el.genre == "Sport") {
                counte++
            }
        })
        console.log(counte)
        if (counte > 0) {
            const newSort = posts.filter(obj => (obj.genre == "Sport"))
            console.log(newSort)
            return setPosts(newSort)
        }
        else {
            location.reload()
        }
    }

    function OrderPost_cultura() {
        let counte = 0
        posts.forEach((el) => {
            if (el.genre == "Cultura") {
                counte++
            }
        })
        console.log(counte)
        if (counte > 0) {
            const newSort = posts.filter(obj => (obj.genre == "Cultura"))
            console.log(newSort)
            return setPosts(newSort)
        }
        else {
            location.reload()
        }

    }
    function OrderPost_tutti() {
        location.reload()
    }

    return (




        <main className=' bg-gray-200  '>

            <div className='flex items-center justify-center sticky top-0  w-full'>
                <Header />
            </div>
            <section className=' flex flex-col justify-center items-center  ' >


                <div className=' flex items-center  w-3/4'>



                    <svg onClick={slideLeft} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer hover:bg-slate-500 rounded-xl ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>


                    <div id='slider' className='flex justify-center rounded-md  items-center overflow-hidden scroll-smooth  overflow-x-auto scrollbar-hide    '>

                        {posts.length > 0 && posts.map(post => (
                            <Lista {...post} />
                        ))}
                    </div>

                    <svg onClick={slideRight} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="  w-5 h-5  cursor-pointer ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>


                </div>

                <section className='w-3/4 p-5 border bg-red-500  border-black mt-5 rounded-md'>
                    <div>
                        <nav className='flex gap-5 justify-around text-lg font-bold'>
                            <button className='hover:text-white hover:scale-125 ease-in-out duration-300' onClick={OrderPost_tutti}> <a className='hover:text-white hover:scale-125 ease-in-out duration-300' >Tutti</a></button>
                            <button className='hover:text-white hover:scale-125 ease-in-out duration-300' onClick={OrderPost_politica}> <a className='hover:text-white hover:scale-125 ease-in-out duration-300' >Politica</a></button>
                            <button className='hover:text-white hover:scale-125 ease-in-out duration-300' onClick={OrderPost_attualità}><a className='hover:text-white hover:scale-125 ease-in-out duration-300'>Attualità</a></button>
                            <button className='hover:text-white hover:scale-125 ease-in-out duration-300' onClick={OrderPost_cronaca}><a className='hover:text-white hover:scale-125  ease-in-out duration-300'>Cronaca</a></button>
                            <button className='hover:text-white hover:scale-125 ease-in-out duration-300' onClick={OrderPost_sport}> <a className='hover:text-white  hover:scale-125  ease-in-out duration-300'>Sport</a></button>
                            <button className='hover:text-white hover:scale-125 ease-in-out duration-300' onClick={OrderPost_cultura}><a className='hover:text-white  hover:scale-125  ease-in-out duration-300'>Cultura</a></button>

                        </nav>
                    </div>
                </section>

            </section>

            <section className='flex justify-center '>
                <section className=' bg-slate-100  h-[60vw] border-black mt-5 w-1/4'>
                     <h1 className='font-bold mt-5'>I nostri Partner:</h1>
                    <div className='flex flex-col gap-10   '>
                        <div>
                            <a href="https://www.zucchettikos.it/"> <img className='h-96  mt-8 w-full' src={pic1} alt="" />  </a>
                        </div>

                        <div>
                            <a href="https://www.settemari.it/"> <img className='h-96 text-end mt-8 w-full' src={pic2} alt="" />  </a>
                        </div>
                    </div>

                </section>

                <section className=' bg-slate-100 p-10 h-[60vw] overflow-y-scroll flex flex-wrap items-center mt-5 w-2/4  '>
                    <h1 className='font-extrabold  text-2xl   mb-5'>Articoli pubblicati</h1>
                    {posts.length > 0 && posts.map(post => (
                        <Article {...post} />
                    ))}
                </section>

            </section>
             <section className='flex items-center justify-center  sticky bottom-0'>
                 <footer className='w-1/4 bg-red-500/60 rounded-xl text-center'> 
                 <p className='font-bold'>IL BLOG QUOTIDIANO di Mark Boer </p>
                 </footer>
    
             </section>
        </main>
    )
}
export default Home