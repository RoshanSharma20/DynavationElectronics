import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput } from 'flowbite-react';
import bgSignup from '../../img/signupAbstract.jpg'

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    //form sbumit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, phone, address);
        // toast.success('registered successfully');
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/auth/register`, { name, email, password, phone, address, answer });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
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
                    <div className='relative h-full w-full'>
                        <img src={bgSignup} alt="" className='w-full h-full object-cover absolute mix-blend-overlay' />
                        <div className='w-5/6 pt-28 pb-4'>
                            <h1 className='text-3xl md:text-5xl text-white'>Register</h1>
                            <form className='w-3/4 md:w-1/2' onSubmit={handleSubmit}>
                                <div className='p-2'>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        placeholder="Name"
                                        value={name} onChange={(e) => setName(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className='p-2'>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className='p-2'>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        placeholder='password'
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className='p-2'>
                                    <TextInput
                                        id="phone"
                                        type="text"
                                        placeholder="Phone"
                                        value={phone} onChange={(e) => setPhone(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className='p-2'>
                                    <TextInput
                                        id="address"
                                        type="text"
                                        placeholder="Address"
                                        value={address} onChange={(e) => setAddress(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className='p-2'>
                                    <TextInput
                                        id="answewr"
                                        type="text"
                                        placeholder="answer"
                                        value={answer} onChange={(e) => setAnswer(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className='p-2 relative'>
                                    <Button gradientDuoTone="purpleToBlue"
                                        outline type="submit" className='relative text-3xl font-bold md:font-extrabold transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110'>
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </center>
            </Layout>
        </>
    )
}

export default Register
