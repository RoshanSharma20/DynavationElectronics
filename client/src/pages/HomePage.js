import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Layout from '../components/Layout/Layout'
import logo from '../img/DE_logo.png'
import testing from "../img/740051.jpg"
import { Carousel } from 'antd'
import { Card } from 'flowbite-react'
import { FaShippingFast } from 'react-icons/fa'
// import { GrUserWorker } from 'react-icons/gr'
// import { MdOutlineManageAccounts } from 'react-icons/md'
import { BsGear, BsTools } from 'react-icons/bs'
import { BiCheckShield } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { useCart } from '../context/Cart'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// Import Swiper styles
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    // eslint-disable-next-line
    const [page, setPage] = useState(1);
    // eslint-disable-next-line
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
        // eslint-disable-next-line
        getAllProducts();
        getAllCategory();
        // eslint-disable-next-line
    }, [])
    return (
        <Layout title={"Dynavation Electronics - Home Page"}>
            <center>
                <div className='lg:w-11/12 xl:w-5/6 pt-24 md:pt-36 lg:pt-24'>
                    <Carousel autoplay draggable autoplaySpeed={5000} effect="fade">
                        <div>
                            <img
                                alt="..."
                                src={testing}
                                className="object-cover h-48 sm:h-64 md:h-80 lg:h-96 xl:h-auto max-w-6xl rounded-lg shadow-xl dark:shadow-gray-800"
                            />
                        </div>
                        <div >
                            <img
                                alt="..."
                                src={testing}
                                className="object-cover h-48 sm:h-64 md:h-80 lg:h-96 xl:h-auto max-w-6xl rounded-lg shadow-xl dark:shadow-gray-800"
                            />
                        </div>
                        <div>
                            <img
                                alt="..."
                                src={testing}
                                className="object-cover h-48 sm:h-64 md:h-80 lg:h-96 max-w-6xl xl:h-auto rounded-lg shadow-xl dark:shadow-gray-800"
                            />
                        </div>
                    </Carousel>
                </div>
                <hr />
                <div className='w-full xl:w-11/12 pt-8'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl'><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>Shop by Category</span></h1>
                    <div className='w-5/6 pt-2'>
                        {categories.length > 0 && <Swiper
                            navigation={true}
                            slidesPerView={1}
                            spaceBetween={20}
                            breakpoints={{
                                // 640: { slidesPerView: 2, spaceBetween: 5 },
                                768: { slidesPerView: 3, spaceBetween: 50 }
                            }}
                            loop={true}
                            centeredSlides={true}
                            speed={800}
                            autoplay={{ delay: 3000 }}
                            modules={[Autoplay, Navigation]}
                        >
                            {categories.map((c) => (
                                <div>
                                    <SwiperSlide key={c._id}>
                                        <button className='text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl px-2 py-1 rounded-lg border border-2 border-blue-700 hover:border-0 hover:bg-blue-700 hover:text-white'>
                                            {c.name}
                                        </button>
                                    </SwiperSlide>
                                </div>
                            ))}
                        </Swiper>}
                    </div>
                </div>
                <div className='w-11/12 xl:w-5/6 pt-8'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-8'><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>Featured Products</span></h1>
                    <div>
                        <div className='flex flex-wrap'>
                            {products?.map((p) => (
                                <div className='w-1/2 md:w-1/3 lg:w-1/4 px-2 pb-2' key={p._id} >
                                    <div className='group border-b-2 drop-shadow-md rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105'>
                                        <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} alt="" className='w-auto h-24 sm:h-32 md:h-36 xl:h-48 rounded-t-md' />
                                        <div className="text-xl xl:text-2xl font-bold text-gray-900 group-hover:underline bg-gradient-to-b from-sky-400 to-sky-700 bg-clip-text text-transparent">
                                            {p.name.substring(0, 20)}
                                        </div>
                                        <div className="text-sm lg:text-base xl:text-xl text-gray-700 bg-gradient-to-b from-red-500 to-yellow-500 bg-clip-text text-transparent">
                                            {p.description.substring(0, 30)}
                                        </div>
                                        <div className="text-sm lg:text-base xl:text-xl text-gray-700 dark:text-gray-400">
                                            RS. <span className='text-md lg:text-lg'>{p.price}</span>
                                        </div>
                                        <div className='flex justify-center pb-2'>
                                            <button className='mx-1 py-1 px-1 sm:p-1 xl:p-2 rounded-lg bg-white hover:bg-blue-500 hover:text-white border-2 border-blue-300 hover:border-none text-black hover:border-4 transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105 text-sm lg:text-md xl:text-lg' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                            <button className='mx-1 py-1 px-1 sm:p-1 xl:p-2 rounded-lg bg-white hover:bg-blue-500 hover:text-white border-2 border-blue-300 hover:border-none text-black hover:border-4 transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105 text-sm lg:text-md xl:text-lg' onClick={() => {
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
                <div className='w-11/12 xl:w-5/6 pt-8'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-8'><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>Our Esteemed Partners</span></h1>
                    <div className='flex justify-evenly flex-wrap'>
                        {partners.map((partner, i) => (
                            <div className='p-8'>
                                <Card
                                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                                    imgSrc={logo} key={i} className='h-24 w-24 xl:w-40 xl:h-40'
                                >
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                                        <p>
                                            {partner.name}
                                        </p>
                                    </h5>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-10/12 xl:w-5/6 pt-8'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-8'><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>Why Choose Us</span></h1>
                    <div className='flex flex-wrap md:flex-nowrap'>
                        <div className='py-2 md:py-0 px-2'>
                            <Card className='dark:bg-white'>
                                <h5 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                                    <BsTools></BsTools>
                                </h5>
                                <p className='text-sm md:text-base text-gray-700 dark:text-gray-400'>After Sale Support</p>
                                <p className="text-sm md:text-base text-gray-700 dark:text-gray-400">
                                    Service & support will be provided to all customers by team of experienced Technicians.
                                </p>
                            </Card>
                        </div>
                        <div className='py-2 md:py-0 px-2'>
                            <Card className='dark:bg-white'>
                                <h5 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                                    <BsGear></BsGear>
                                </h5>
                                <p className='text-sm md:text-base text-gray-700 dark:text-gray-400'>30+ Years Industry experience</p>
                                <p className="text-sm md:text-base text-gray-700 dark:text-gray-400">
                                    Over 30 years of expertise in Electronic T.M.I and Electronic repair & production tools.
                                </p>
                            </Card>
                        </div>
                        <div className='py-2 md:py-0 px-2'>
                            <Card className='dark:bg-white'>
                                <h5 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                                    <BiCheckShield></BiCheckShield>
                                </h5>
                                <p className='text-sm md:text-base text-gray-700 dark:text-gray-400'>1 Year Warranty</p>
                                <p className="text-sm md:text-base text-gray-700 dark:text-gray-400">
                                    Service & spares support will be provided throughout the life of the product.
                                </p>
                            </Card>
                        </div>
                        <div className='py-2 md:py-0 px-2'>
                            <Card className='dark:bg-white'>
                                <h5 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                                    <FaShippingFast></FaShippingFast>
                                </h5>
                                <p className='text-sm md:text-base text-gray-700 dark:text-gray-400'>Free shipping</p>
                                <p className="text-sm md:text-base text-gray-700 dark:text-gray-400">
                                    All over India.

                                    Products will be tested & despatched within 1-2 working days.
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
