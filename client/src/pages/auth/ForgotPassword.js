import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput } from 'flowbite-react';
import bgLogin from '../../img/loginAbstract.jpg'


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    //form sbumit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/auth/forgot-password`, { email, answer, newPassword });

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
        <Layout title={"Forgot Password - Dynavation Electronics"}>
            <center>
                <div className='w-5/6 pt-24 relative h-5/6'>
                    <img src={bgLogin} alt="" className='w-full h-5/6 object-cover absolute mix-blend-overlay' />
                    <div>
                        <h1 className='text-3xl md:text-5xl pt-8'>Reset Password</h1>
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
                                    id="answer"
                                    type="text"
                                    placeholder="Answer"
                                    value={answer} onChange={(e) => setAnswer(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className='p-3'>
                                <TextInput
                                    id="password"
                                    type="password"
                                    placeholder='New Password'
                                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <Button gradientDuoTone="redToYellow" type="submit" className='relative text-3xl font-bold md:font-extrabold transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110'>
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </center>

        </Layout>
    )
}

export default ForgotPassword
