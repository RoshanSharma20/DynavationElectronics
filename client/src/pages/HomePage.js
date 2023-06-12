import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Layout from '../components/Layout/Layout'
import logo from '../img/DE_logo.png'
import testing from "../img/740051.jpg"
import { Carousel } from 'antd'
import { Button, Card } from 'flowbite-react'
import { FaShippingFast } from 'react-icons/fa'
import { GrUserWorker } from 'react-icons/gr'
import { BsGear } from 'react-icons/bs'
import { BiCheckShield } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { useCart } from '../context/Cart'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const partners = [{ name: "apple" }, { name: "bosch" }, { name: "ramaiah" }, { name: "dell" }, { name: "siemens" }, { name: "philips" }, { name: "samsung" }, { name: "bajaj" }, { name: "bsnl" }]


    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting categories');
        }
    }

    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
        getAllCategory();
    }, [])
    return (
        <Layout title={"Dynavation Electronics - Home Page"}>
            <center>
                <div className='w-5/6 pt-24'>
                    <Carousel autoplay draggable autoplaySpeed={7000} effect="fade">
                        <div>
                            <img
                                alt="..."
                                src={testing}
                                className="h-auto max-w-6xl rounded-lg shadow-xl dark:shadow-gray-800"
                            />
                        </div>
                        <div >
                            <img
                                alt="..."
                                src={testing}
                                className="h-auto max-w-6xl rounded-lg shadow-xl dark:shadow-gray-800"
                            />
                        </div>
                        <div>
                            <img
                                alt="..."
                                src={testing}
                                className="h-auto max-w-6xl rounded-lg shadow-xl dark:shadow-gray-800"
                            />
                        </div>
                    </Carousel>
                </div>
                <hr />
                <div className='w-5/6 pt-8'>
                    <h1 className='text-5xl'>Shop by Category</h1>
                    <div className='w-5/6 pt-2'>
                        {categories.length > 0 && <Swiper
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 1, spaceBetween: 10 },
                                768: { slidesPerView: 3, spaceBetween: 50 }
                            }}
                            loop={true}
                            centeredSlides={true}
                            speed={800}
                            autoplay={{ delay: 3000, }}
                            modules={[Autoplay]}
                        >
                            {categories.map((c) => (
                                <div>
                                    <SwiperSlide key={c._id}>
                                        <Button>
                                            <h1 className='test-3xl'>{c.name}</h1>
                                        </Button>
                                    </SwiperSlide>
                                </div>
                            ))}
                        </Swiper>}
                    </div>
                </div>
                <div className='w-5/6 pt-8'>
                    <h1 className='text-5xl'>Featured Products</h1>
                    <div>
                        <div className='flex flex-wrap'>
                            {products?.map((p) => (
                                <div className='w-1/4 px-2 pb-2' key={p._id} >
                                    <div className='group border-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105'>
                                        <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} alt="" className='w-auto h-48 rounded-t-md' />
                                        <h5 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:underline">
                                            {p.name}
                                        </h5>
                                        <h1 className="font-normal text-gray-700 dark:text-gray-400">
                                            {p.description.substring(0, 30)}
                                        </h1>
                                        <h1 className="font-normal text-gray-700 dark:text-gray-400">
                                            RS. <span className='text-lg'>{p.price}</span>
                                        </h1>
                                        <div className='flex justify-center pb-2'>
                                            <button className='mx-1 p-3 rounded-lg bg-white hover:bg-gradient-to-r from-pink-400 to-orange-500 border-2 border-red-300 hover:border-none text-black hover:border-4 transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                            <button className='mx-1 p-3 rounded-lg bg-white hover:bg-gradient-to-r from-pink-400 to-orange-500 border-2 border-red-300 hover:border-none text-black hover:border-4 transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105' onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                                toast.success("Item added to cart");
                                            }}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-5/6 pt-8'>
                    <h1 className='text-5xl'>Our Esteemed Partners</h1>
                    <div className='flex justify-evenly flex-wrap'>
                        {partners.map((partner, i) => (
                            <div className='p-8'>
                                <Card
                                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                                    imgSrc={logo} key={i} className='w-48 h-48'
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
                <div className='w-5/6 pt-8'>
                    <h1 className='text-3xl md:text-5xl'>Why Choose Us</h1>
                    <div className='flex flex-wrap md:flex-nowrap'>
                        <div className='py-2 md:py-0 px-2'>
                            <Card>
                                <h5 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <GrUserWorker></GrUserWorker>
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <p>
                                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                                    </p>
                                </p>
                            </Card>
                        </div>
                        <div className='px-2'>
                            <Card>
                                <h5 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <BsGear></BsGear>
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <p>
                                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                                    </p>
                                </p>
                            </Card>
                        </div>
                        <div className='px-2'>
                            <Card>
                                <h5 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <BiCheckShield></BiCheckShield>
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <p>
                                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                                    </p>
                                </p>
                            </Card>
                        </div>
                        <div className='px-2'>
                            <Card>
                                <h5 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <FaShippingFast></FaShippingFast>
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <p>
                                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                                    </p>
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </center>
        </Layout >
    )
}

export default HomePage
