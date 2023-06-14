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

    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
    const [isToggleVisible, setIsToggleVisible] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsNavbarCollapsed(window.innerWidth >= 1110);
            setIsToggleVisible(window.innerWidth <= 1110);
        }

        // Attach the resize event listener
        window.addEventListener('resize', handleResize);

        // Check the initial screen width
        handleResize();

        // Cleanup by removing the resize event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function handleToggle() {
        setIsNavbarCollapsed(!isNavbarCollapsed);
    }
    return (
        <>
            <Layout title={"Header-Dynavation Electronics"}>
                <Navbar
                    fluid={true}
                    rounded={true} className='bg-gray-50 fixed w-full z-20 top-0 left-0'>
                    <div className='flex md:basis-full lg:basis-1/12'>
                        <Navbar.Brand to="/" className='xl:pl-4 2xl:pl-16'>
                            <img
                                src={logo} className="mr-3 object-fill h-16 sm:h-16" alt="Dynavation Electronics logo" />
                            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                <p className='m-0 p-0'>Dynavation</p>
                                <p className='m-0 p-0'>Electronics</p>
                            </span>
                        </Navbar.Brand>
                    </div>
                    <div className="flex md:order-2">
                        {isToggleVisible && (
                            <Navbar.Toggle onClick={handleToggle} />
                        )}
                    </div>
                    <Navbar.Collapse>
                        {isNavbarCollapsed && (
                            <>
                                <div className={`flex ${isToggleVisible ? 'md:order-2' : ''}`}>
                                    {isToggleVisible && (
                                        <Navbar.Toggle onClick={handleToggle} />
                                    )}
                                </div>
                                <SearchInput />
                                <Link
                                    to="/" className='text-md xl:text-lg pt-2 xl:px-1 2xl:px-2'>
                                    Home
                                </Link>
                                <Link to="/about" className='text-md xl:text-lg pt-2 xl:px-1 2xl:px-2'>
                                    About
                                </Link>
                                <Link to="/" className='text-md xl:text-lg pt-2 xl:px-1 2xl:px-2  transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:bg-gradient-to-r from-gray-50 via-purple-500 to-gray-50 hover:scale-110'>
                                    Resources
                                </Link>
                                <div className='text-md xl:text-lg pt-2 xl:px-1 2xl:px-2'>
                                    <Dropdown inline label="Categories" dismissOnClick={true}>
                                        <Dropdown.Item><Link to="/categories">All Categories</Link></Dropdown.Item>
                                        <div>
                                            {catgories?.map((c) => (
                                                <Dropdown.Item><Link to={`/category/${c.slug}`}>{c.name}</Link></Dropdown.Item>
                                            ))}
                                        </div>
                                    </Dropdown>
                                </div>
                                <Link to="/contactus" className='text-md xl:text-lg pt-2 xl:px-1 2xl:px-2'>
                                    Contact
                                </Link>
                                {
                                    !auth.user ? (
                                        <>
                                            <Link to="/register" className='text-md xl:text-lg  pt-2 xl:px-1 2xl:px-2'>
                                                Register
                                            </Link>
                                            <Link to="/login" className='text-md xl:text-lg  pt-2 xl:px-1 2xl:px-2'>
                                                Login
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className='text-md xl:text-lg pt-2 xl:px-1 2xl:px-2'>
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
                                            <FaShoppingCart className='text-2xl xl:text-3xl hidden lg:block'></FaShoppingCart>
                                        </Link>
                                        <Link to="/cart" className='text-md xl:text-lg pt-2 xl:px-1 2xl:px-2 lg:hidden font-medium'>
                                            Cart
                                        </Link>
                                    </Badge>
                                </div>
                            </>)}
                    </Navbar.Collapse>
                </Navbar>
            </Layout>

        </>
    )
}

export default Header

