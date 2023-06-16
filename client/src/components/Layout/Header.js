import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import Layout from './Layout'
import { useAuth } from '../../context/auth'
import { Navbar, Dropdown } from 'flowbite-react'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/Cart'
import { Badge } from 'antd'
import logo from '../../img/DE_logo.png'

function Header() {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const catgories = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem("auth");
    }
    return (
        <>
            <Layout title={"Header-Dynavation Electronics"}>
                <Navbar
                    fluid={true}
                    rounded={true} className='bg-gray-50 fixed w-full z-20 top-0 left-0'>
                    <div className='flex md:basis-full lg:basis-1/12 md:flex justify-center lg:flex-none'>
                        <Navbar.Brand to="/" className='xl:pl-4 2xl:pl-16'>
                            <img src={logo} className="mr-3 object-fill h-16 sm:h-16 lg:h-14 xl:h-16" alt="Dynavation Electronics logo" />
                            <span className="self-center whitespace-nowrap text-lg md:text-sm xl:text-lg font-semibold dark:text-white">
                                <p className='m-0 p-0'>Dynavation</p>
                                <p className='m-0 p-0'>Electronics</p>
                            </span>
                        </Navbar.Brand>
                    </div>
                    <div className="flex md:order-2">
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <SearchInput />
                        <Link
                            to="/" className='text-md xl:text-lg pt-2 2xl:px-2 hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110 hover:font-semibold'>
                            Home
                        </Link>
                        <Link to="/about" className='text-md xl:text-lg pt-2 2xl:px-2 hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110 hover:font-semibold'>
                            About
                        </Link>
                        <Link to="/" className='text-md xl:text-lg pt-2 2xl:px-2 hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110 hover:font-semibold'>
                            Resources
                        </Link>
                        <div className='text-md xl:text-lg pt-2 2xl:px-2 hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110 hover:font-semibold'>
                            <Dropdown inline label="Categories" dismissOnClick={true}>
                                <Dropdown.Item><Link to="/categories">All Categories</Link></Dropdown.Item>
                                <div>
                                    {catgories?.map((c) => (
                                        <Dropdown.Item><Link to={`/category/${c.slug}`}>{c.name}</Link></Dropdown.Item>
                                    ))}
                                </div>
                            </Dropdown>
                        </div>
                        <Link to="/contactus" className='text-md xl:text-lg pt-2 2xl:px-2 hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110 hover:font-semibold'>
                            Contact
                        </Link>
                        {
                            !auth.user ? (
                                <>
                                    <Link to="/register" className='text-md xl:text-lg  pt-2  2xl:px-2 hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110 hover:font-semibold'>
                                        Register
                                    </Link>
                                    <Link to="/login" className='text-md xl:text-lg  pt-2  2xl:px-2 hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110 hover:font-semibold'>
                                        Login
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className='text-md xl:text-lg pt-2 2xl:px-2 hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110 hover:font-semibold'>
                                        <Dropdown inline
                                            label={auth?.user?.name}
                                            dismissOnClick={true} >
                                            <Dropdown.Item>
                                                <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className='text-md'>
                                                    Dashboard
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Link to="/login" onClick={handleLogout} className='text-md'>
                                                    Logout
                                                </Link>
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                </>
                            )
                        }
                        <div className='pt-2'>
                            <Badge count={cart?.length} showZero size="small" offset={[7, 4]}>
                                <Link to="/cart">
                                    <FaShoppingCart className='text-xl lg:text-2xl xl:text-3xl hidden md:block hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110'></FaShoppingCart>
                                </Link>
                                <Link to="/cart" className='text-md xl:text-lg pt-2  2xl:px-2 md:hidden font-medium hover:text-blue-700 hover:underline underline-offset-3 transition ease-in-out delay-200 hover:-translate-y-1 duration-150 hover:scale-110'>
                                    Cart
                                </Link>
                            </Badge>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </Layout>

        </>
    )
}

export default Header

