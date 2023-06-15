import React from 'react'
import Layout from '../components/Layout/Layout'
import logo from "../img/DE_logo.png"
import { Card } from 'flowbite-react';

function About() {
    const partners = [{ name: "apple" }, { name: "bosch" }, { name: "ramaiah" }, { name: "dell" }, { name: "siemens" }, { name: "philips" }, { name: "samsung" }, { name: "bajaj" }, { name: "bsnl" }]
    return (
        <Layout title={"Dynavation Electronics-About us"}>
            <center>
                <div className='w-5/6 lg:w-4/6 pt-24 md:pt-36 lg:pt-24'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>About Us</h1>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis magni dolorum, vero earum quisquam libero ex aspernatur fugit obcaecati maiores maxime repudiandae blanditiis? Debitis ad incidunt cumque praesentium voluptas consequuntur!
                        Iusto voluptatibus obcaecati eos fuga quasi atque, quod soluta, itaque nemo aut minus saepe, voluptates aspernatur fugiat maiores cupiditate. Nesciunt nulla voluptate .
                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut laudantium doloremque, explicabo dignissimos ipsa quo placeat odit esse porro tempore.
                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium modi quas, recusandae obcaecati reprehenderit, rerum omnis iure, vero consectetur sit consequatur! Minus asperiores dolore cumque hic unde velit molestias perspiciatis voluptate obcaecati! Suscipit animi necessitatibus quas fuga eligendi veniam neque?
                    </p>
                </div>
                {/* Our Esteemed Customers section */}
                <div className='w-11/12 xl:w-5/6 pt-8'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>Our Esteemed Partners</h1>
                    <div className='flex justify-evenly flex-wrap'>
                        {partners.map((partner, i) => (
                            <div className='p-8'>
                                <Card
                                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                                    imgSrc={logo} key={i} className='h-24 w-24 xl:w-40 xl:h-40'
                                >
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <p>
                                            {partner.name}
                                        </p>
                                    </h5>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default About
