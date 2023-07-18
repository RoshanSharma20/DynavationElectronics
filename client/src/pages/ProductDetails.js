import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/Cart';
import { HiDownload } from 'react-icons/hi'
import { toast } from 'react-toastify';

function ProductDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();


    //initial product details
    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
        // eslint-disable-next-line
    }, [params?.slug])

    //get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product?.category._id);
        } catch (error) {
            console.log(error);
        }
    }


    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    const topContainer = useRef();

    useEffect(() => {
        // To make sure page starts from the top
        topContainer.current.scrollIntoView({ block: "end", behavior: 'smooth' });
    }, []);
    return (
        <Layout>
            <div ref={topContainer} />
            <center>
                <div className='w-11/12 pt-24 md:pt-36 lg:pt-24'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-8 my-10'><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>Product Details</span></h1>
                    <div>
                        <div>
                            <div className='flex items-stretch'>
                                <div className='basis-3/6 lg:basis-2/5 px-2'>
                                    <img src={`${process.env.REACT_APP_API}/product/product-image/${product._id}`} alt="" />
                                </div>
                                <div className='basis:3/6 lg:basis-3/5 self-center'>
                                    {/* <div className='grid grid-cols-1 justify-items-start items-center'> */}
                                    <div className='flex justify-center items-center'>
                                        <div>
                                            <h5 className="text-md sm:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight text-gray-900">
                                                Name:{product.name}
                                            </h5>
                                            <p className="text-sm md:text-md xl:text-lg text-gray-700">
                                                Description:{product.description}
                                            </p>
                                            <p className="text-sm md:text-md xl:text-lg text-gray-700">
                                                Price:{product.price}
                                            </p>
                                            <p className="text-sm md:text-md xl:text-lg text-gray-700">
                                                Category:{product?.category?.name}
                                            </p>
                                            <div className='hidden lg:block border border-2 py-2 my-2 rounded-lg'>
                                                <a href={`${product?.url_link}`} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500' rel="noopener noreferrer"><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>User Manual</a>
                                            </div>
                                            <button className='hidden lg:block text-sm md:text-md xl:text-lg px-1 border border-2 border-blue-700 p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white' onClick={() => {
                                                setCart([...cart, product]);
                                                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                                toast.success("Item added to cart");
                                            }}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='lg:hidden border border-2 py-2 my-2 rounded-lg'>
                                <a href={`${product?.url_link}`} target='_blank' className='w-full lg:w-1/3 mx-1 py-1 text-md lg:text-lg xl:text-xl 2xl:text-2xl underline underline-offset-2 hover:text-blue-500' rel="noopener noreferrer"><HiDownload className='inline-block mx-2 text-xl lg:text-2xl xl:text-3xl'></HiDownload>User Manual</a>
                            </div>
                            <button className='lg:hidden text-sm md:text-md xl:text-lg mt-2' onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                toast.success("Item added to cart");
                            }}>Add to Cart</button>
                        </div>
                    </div>
                    <div className='pt-8'>
                        <h3 className='text-3xl'>Similar Products</h3>
                        {relatedProducts.length < 1 && (<p>No similar products found</p>)}
                        <div className='flex flex-wrap'>
                            {relatedProducts?.map((p) => (
                                <div className='w-1/2 md:w-1/3 lg:w-1/4 px-2 pb-2' key={p._id} >
                                    <div className='group border-b-2 drop-shadow-md rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105'>
                                        <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} alt="" className='w-auto h-24 sm:h-32 md:h-36 xl:h-48 rounded-t-md' />
                                        <div className="text-xl xl:text-2xl font-bold text-gray-900 group-hover:underline bg-gradient-to-b from-sky-400 to-sky-700 bg-clip-text text-transparent">
                                            {p.name.substring(0, 20)}
                                        </div>
                                        <div className="text-sm lg:text-base xl:text-xl text-gray-700 bg-gradient-to-b from-red-500 to-yellow-500 bg-clip-text text-transparent">
                                            {p.description.substring(0, 18)}..
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
            </center>
        </Layout>
    )
}

export default ProductDetails
