import { Button } from 'flowbite-react'
import React from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Social() {
    return (
        <>
            <button className='fixed right-2 top-48 p-2 rounded-full bg-green-500 text-3xl'>
                <Link to="https://wa.me/918618245199"><FaWhatsapp></FaWhatsapp></Link>
            </button>
            <button className='fixed right-2 top-64 p-2 rounded-full bg-red-500 text-3xl'>
                <FaInstagram></FaInstagram>
            </button>
        </>
    )
}

export default Social
