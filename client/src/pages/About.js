import React from 'react'
import Layout from '../components/Layout/Layout'
import logo from "../img/DE_logo.png"
import { Card } from 'flowbite-react';
import { HiDownload } from 'react-icons/hi'
import certificateOfIEC from '../components/docs/certificateOfIEC.pdf';
import Dynavation_ElectronicsPvtLtd from '../components/docs/Dynavation electronicsPvtLtd.pdf';
import DynavationElectronicsISO from '../components/docs/DynavationElectronicsISO.pdf';
import QRO_EGAC_DynavationElectronics from '../components/docs/QRO_EGAC_DynavationElectronics.pdf';
import RegsitrationCetificate from '../components/docs/RegistrationCertificate.pdf';
import UdyamRegistration from '../components/docs/UdyamRegistration.pdf';


function About() {
    const partners = [{ name: "apple" }, { name: "bosch" }, { name: "ramaiah" }, { name: "dell" }, { name: "siemens" }, { name: "philips" }, { name: "samsung" }, { name: "bajaj" }, { name: "bsnl" }]
    return (
        <Layout title={"Dynavation Electronics-About us"}>
            <center>
                <div className='w-5/6 lg:w-4/6 pt-24 md:pt-36 lg:pt-24'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-b from-slate-100 via-sky-400 to-blue-800 bg-clip-text text-transparent'>About Us</h1>
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
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-b from-slate-100 via-sky-400 to-blue-800 bg-clip-text text-transparent'>Our Esteemed Partners</h1>
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
                <div className='mt-16 w-5/6'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-b from-slate-100 via-sky-400 to-blue-800 bg-clip-text text-transparent'>Documents</h1>
                    <div className='flex justify-evenly flex-wrap'>
                        <div className='border border-2 py-3 my-2 rounded-lg'>
                            <a href={certificateOfIEC} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500'><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>certificateOfIEC</a>
                        </div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={Dynavation_ElectronicsPvtLtd} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500'><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>Dynavation_ElectronicsPvtLtd</a></div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={DynavationElectronicsISO} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500'><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>DynavationElectronicsISO</a></div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={QRO_EGAC_DynavationElectronics} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500'><HiDownload className='inline-block mx-2 text-xl lg:text-3xl xl:text-4xl'></HiDownload>QRO_EGAC_DynavationElectronics</a></div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={RegsitrationCetificate} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500'><HiDownload className='inline-block mx-2 text-xl lg:text-3xl xl:text-4xl'></HiDownload>RegsitrationCetificate</a></div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={UdyamRegistration} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500'><HiDownload className='inline-block mx-2 text-xl lg:text-3xl xl:text-4xl'></HiDownload>UdyamRegistration</a>
                        </div>
                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default About
