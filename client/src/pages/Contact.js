import React, { useRef } from 'react'
import Layout from '../components/Layout/Layout'
import emailjs from '@emailjs/browser';
import { TextInput, Textarea } from 'flowbite-react';
import { toast } from 'react-toastify';
import Social from "../../src/components/Layout/Social"

function Contact() {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_p4hqp89', 'template_a7blwdl', form.current, '_PoxzkvyCNUjbbNDc')
            .then((result) => {
                console.log(result.text);
                toast.success("Sent Successfully");
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                toast.error("Some error occurred");
            });
    };

    return (
        <Layout title={"Dynavation Electronics-Contact Us"}>
            <Social></Social>
            <center>
                <div className='w-5/6 pt-24 md:pt-36 lg:pt-24'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-10'><span className='border-4 border-gray-500 font-serif font-bold rounded-xl px-6 py-3 bg-white text-black'>Contact US</span></h1>
                    <hr />
                    <div className='md:flex md:divide-x-4 pt-2'>
                        <div className='w-5/6 md:w-1/2'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl'>We are here to help you</h1>
                            <form ref={form} onSubmit={sendEmail}>
                                <div className='p-2'>
                                    <TextInput color='dark:bg-white' type="text" placeholder='full name' name='user_name' required
                                    />
                                </div>
                                <div className='p-2'>
                                    <TextInput color='dark:bg-white' type="email" placeholder='Email' name='user_email' required
                                    />
                                </div>
                                <div className='p-2'>
                                    <TextInput color='dark:bg-white' type="tel" name="phone" placeholder="888 888 8888" pattern="[0-9]{10}" maxlength="12" required
                                    />
                                </div>
                                <div className='p-2'>
                                    <Textarea color='dark:bg-white' className='p-2' placeholder='requirments' name='message' rows={5} required
                                    />
                                </div>
                                <button type='submit' className='my-4'><span className='text-sm md:text-base lg:text-lg xl:text-xl mx-2 py-2 px-1 sm:p-1 xl:p-2 rounded-lg bg-white hover:bg-green-500 hover:text-white border-2 border-green-500 hover:border-none text-black hover:border-4 transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105'>Send</span></button>
                            </form>
                        </div>
                        <div className='w-11/12 pt-4 md:pt-0 md:w-1/2'>
                            <h1 className='text-2xl md:text-3xl'>Come Visit US</h1>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.934782095936!2d77.53132298519182!3d13.076260153671676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x110573c38a840623%3A0xbe7ee25b4a472fa8!2sAnalog%20%26%20Digital%20Devices%20(ADD)!5e0!3m2!1sen!2sin!4v1685619614123!5m2!1sen!2sin" width="100%" height="100%" align="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='md:px-2 md:pb-8' title='contact map'></iframe>
                        </div>
                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default Contact
