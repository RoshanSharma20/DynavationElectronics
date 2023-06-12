import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput } from 'flowbite-react';


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
                <div>
                    <form className='w-1/2' onSubmit={handleSubmit}>
                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div>
                            <TextInput
                                id="answer"
                                type="text"
                                placeholder="Answer"
                                value={answer} onChange={(e) => setAnswer(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div>
                            <TextInput
                                id="password"
                                type="password"
                                placeholder='New Password'
                                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                required={true}
                            />
                        </div>
                        <Button type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </center>

        </Layout>
    )
}

export default ForgotPassword
