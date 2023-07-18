import React, { useEffect, useRef } from 'react'
import Layout from '../components/Layout/Layout'
// import logo from "../img/Dynavation_Electronics_logo.jpeg"
import hantek from "../img/hantek.jpeg"
import fnirsi from "../img/fnirsi.jpeg"
import keysight from "../img/keysignt.jpeg"
import victor from "../img/victor.jpeg"
import { HiDownload } from 'react-icons/hi'
import certificateOfIEC from '../components/docs/certificateOfIEC.pdf';
import Dynavation_ElectronicsPvtLtd from '../components/docs/Dynavation electronicsPvtLtd.pdf';
import DynavationElectronicsISO from '../components/docs/DynavationElectronicsISO.pdf';
import QRO_EGAC_DynavationElectronics from '../components/docs/QRO_EGAC_DynavationElectronics.pdf';
import RegsitrationCetificate from '../components/docs/RegistrationCertificate.pdf';
import UdyamRegistration from '../components/docs/UdyamRegistration.pdf';


function About() {
    // const partners = [{ name: "apple" }, { name: "bosch" }, { name: "ramaiah" }, { name: "dell" }, { name: "siemens" }, { name: "philips" }, { name: "samsung" }, { name: "bajaj" }, { name: "bsnl" }]
    const topContainer = useRef();

    useEffect(() => {
        // To make sure page starts from the top
        topContainer.current.scrollIntoView({ block: "end", behavior: 'smooth' });
    }, []);
    return (
        <Layout title={"DYNAVATION ELECTRONICS"}>
            <div ref={topContainer} />
            <center>
                <div className='w-5/6 lg:w-4/6 pt-24 md:pt-36 lg:pt-24'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-10'><span className='border-4 border-gray-500 font-serif font-bold rounded-xl px-6 py-3 bg-white text-black'>About Us</span></h1>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        DYNAVATION ELECTRONICS PVT LTD is a distinguished provider of top-quality and dependable electronic test and measuring instruments, as well as electronic repair and production tools, to the Indian market. Our unwavering commitment to excellence has earned us a reputable position in the industry, and we remain dedicated to upholding this standard in the future.
                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        ISO 9001:2015 Certified:
                        We take immense pride in our ISO 9001:2015 certification, which underscores our strong emphasis on quality and customer satisfaction. This certification guarantees that our products and services meet rigorous quality standards and adhere to industry best practices.

                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Founder's Expertise and Technical Support:
                        With over three decades of experience in the field, our founder provides invaluable expertise to DYNAVATION ELECTRONICS PVT LTD. Supported by a dedicated technical team, we offer unparalleled customer support, ensuring seamless experiences and satisfaction for our esteemed clientele.
                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Commitment to Quality, Reliability, and Affordability:
                        Engineers and technicians consistently choose DYNAVATION ELECTRONICS PVT LTD due to our steadfast commitment to delivering products of exceptional quality, reliability, and affordability. We understand the critical importance of precise and dependable electronic instruments and tools, and we go above and beyond to exceed our customers' expectations.
                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Wide Range of Products:

                        Electronic Test & Measuring Instruments: Our comprehensive range encompasses digital multimeters, oscilloscopes, power supplies, signal generators, and more. These instruments provide accurate measurements and cater to diverse electronic testing applications.
                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Electronic Tools: We offer a diverse selection of electronic tools, including soldering irons, soldering stations, S.M.D. rework stations/systems, and more. Crafted with durability in mind, our tools are essential for efficient electronic repairs and production tasks.
                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Expert Guidance and Customer Support:
                        With our profound understanding of our product range and their applications, we provide expert guidance to customers, aiding them in selecting products that precisely align with their requirements and budgets. Our knowledgeable team is readily available to offer personalized advice, ensuring optimal solutions for their unique needs.
                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Extensive Distribution Network:
                        To ensure widespread accessibility, we have established a robust distribution network. Our trusted dealers/distributors are strategically located in key cities such as Bengaluru, Chennai, Coimbatore, Hyderabad, Kerala, Kolkata, and beyond. This expansive network enables efficient service provision to customers across different regions.
                    </p>
                    <p className='p-1 xl:p-2 text-sm lg:text-md xl:text-lg'>
                        Comprehensive After-Sales Service:
                        We prioritize customer satisfaction throughout their entire journey with us. Our dedicated technical team and well-equipped service facility cater to after-sales service requirements, promptly addressing any concerns or issues that may arise. Moreover, select dealers within our network also extend after-sales service and support.
                    </p>
                </div>
                {/* Our Esteemed Customers section */}
                <div className='w-11/12 xl:w-5/6 pt-8'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-10'><span className='border-4 border-gray-500 font-serif font-bold rounded-xl px-6 py-3 bg-white text-black'>Our Partners</span></h1>
                    <div className='flex justify-evenly flex-wrap'>
                        {/* {partners.map((partner, i) => ( */}
                        <div className='p-8'>
                            <div>
                                <div>
                                    <img src={hantek} alt="" className='h-24 w-24 xl:w-44 xl:h-40' />
                                </div>
                            </div>
                        </div>
                        <div className='p-8'>
                            <div>
                                <div>
                                    <img src={fnirsi} alt="" className='h-24 w-24 xl:w-44 xl:h-40' />
                                </div>
                            </div>
                        </div>
                        <div className='p-8'>
                            <div>
                                <div>
                                    <img src={keysight} alt="" className='h-24 w-24 xl:w-44 xl:h-40' />
                                </div>
                            </div>
                        </div>
                        <div className='p-8'>
                            <div>
                                <div>
                                    <img src={victor} alt="" className='h-24 w-24 xl:w-44 xl:h-40' />
                                </div>
                            </div>
                        </div>
                        {/* ))} */}
                    </div>
                </div>
                <div className='mt-16 w-5/6'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-10'><span className='border-4 border-gray-500 font-serif font-bold rounded-xl px-6 py-3 bg-white text-black'>Company Profile</span></h1>
                    <div className='flex justify-evenly flex-wrap'>
                        <div className='border border-2 py-3 my-2 rounded-lg'>
                            <a href={certificateOfIEC} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500' rel="noopener noreferrer"><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>certificateOfIEC</a>
                        </div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={Dynavation_ElectronicsPvtLtd} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500' rel="noopener noreferrer"><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>Dynavation_ElectronicsPvtLtd</a></div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={DynavationElectronicsISO} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500' rel="noopener noreferrer"><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>DynavationElectronicsISO</a></div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={QRO_EGAC_DynavationElectronics} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500' rel="noopener noreferrer"><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-2xl'></HiDownload>QRO_EGAC_DynavationElectronics</a></div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={RegsitrationCetificate} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500' rel="noopener noreferrer"><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>RegsitrationCetificate</a></div>
                        <div className='border border-2 py-2 my-2 rounded-lg'>
                            <a href={UdyamRegistration} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500' rel="noopener noreferrer"><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>UdyamRegistration</a>
                        </div>
                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default About
