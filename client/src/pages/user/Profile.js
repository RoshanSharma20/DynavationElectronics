import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Dropdown, TextInput } from 'flowbite-react';

function Profile() {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    //get user data
    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user])

    //form submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/auth/profile`, { name, email, password, phone, address });
            if (data?.error) {
                toast.error(data?.error);
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("profile updated successfully");
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    return (
        <Layout title={"User Dashboard-Profile"}>
            <center>
                <div className='flex flex-row pt-28 w-5/6'>
                    <div className='hidden lg:block lg:basis-2/12 xl:basis-1/5'>
                        <UserMenu />
                    </div>
                    <div className='basis-full lg:basis-10/12 xl:basis-4/5'>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>User Profile</h1>
                        <div className='flex justify-end mb-4 lg:hidden'>
                            <Dropdown inline label="User Panel">
                                <UserMenu />
                            </Dropdown>
                        </div>
                        <form className='w-full lg:w-1/2' onSubmit={handleSubmit}>
                            <div className='pt-2'>
                                <TextInput
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='pt-2'>
                                <TextInput
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className='pt-2'>
                                <TextInput
                                    id="password"
                                    type="password"
                                    placeholder='password'
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='pt-2'>
                                <TextInput
                                    id="phone"
                                    type="text"
                                    placeholder="Phone"
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className='pt-2'>
                                <TextInput
                                    id="address"
                                    type="text"
                                    placeholder="Address"
                                    value={address} onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className='pt-2'>
                                <Button type="submit" gradientDuoTone="purpleToBlue"
                                    outline>
                                    Update
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default Profile
