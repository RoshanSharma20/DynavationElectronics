import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { Button, TextInput } from 'flowbite-react';
import bgLogin from '../../img/loginAbstract.jpg'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    //form sbumit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, { email, password });

            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <Layout title={"Register"}>
                <center>
                    <div className='w-5/6 pt-28 relative h-5/6 w-full'>
                        <img src={bgLogin} alt="" className='w-full h-5/6 object-cover absolute mix-blend-overlay' />
                        <div>
                            <h1 className='text-3xl md:text-5xl pt-8'>Login</h1>
                            <form className='w-3/4 md:w-1/2' onSubmit={handleSubmit}>
                                <div className='p-3'>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className='p-3'>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        placeholder='Password'
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className='flex justify-start p-3 relative'>
                                    <Link className="font-medium text-green-300 dark:text-blue-500 hover:underline" type="button" onClick={() => { navigate('/forgot-password') }}>
                                        Forgot Password?
                                    </Link>
                                </div>
                                <Button gradientDuoTone="redToYellow" type="submit" className='relative text-3xl font-bold md:font-extrabold transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110'>
                                    Submit
                                </Button>
                                <div>
                                    <Link to="/register" className="font-medium text-green-300 dark:text-blue-500 hover:underline p-3 relative" type="button">
                                        Sign Up
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </center>
            </Layout>
        </>
    )
}

export default Login
