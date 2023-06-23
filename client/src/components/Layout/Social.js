import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Social() {
    return (
        <>
            <button className='fixed right-2 top-48 p-2 rounded-full bg-green-500 text-3xl'>
                <Link to="https://wa.me/916360336739"><FaWhatsapp></FaWhatsapp></Link>
            </button>
            {/* <button className='fixed right-2 top-64 p-2 rounded-full bg-red-500 text-3xl'>
                <FaInstagram></FaInstagram>
            </button> */}
        </>
    )
}

export default Social
