import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Button, Card } from 'flowbite-react';
import { useCart } from '../context/Cart';
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
    return (
        <Layout>
            <center>
                <div className='w-11/12 pt-28'>
                    <h1 className='text-3xl md:text-4xl'>Product Details</h1>
                    <div>
                        <div>
                            <div className='flex items-stretch'>
                                <div className='basis-2/5 px-2'>
                                    <img src={`${process.env.REACT_APP_API}/product/product-image/${product._id}`} alt="" />
                                </div>
                                <div className='basis-3/5 self-center'>
                                    {/* <div className='grid grid-cols-1 justify-items-start items-center'> */}
                                    <div className='flex justify-center items-center'>
                                        <div>
                                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                Name:{product.name}
                                            </h5>
                                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                                Description:{product.description}
                                            </p>
                                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                                Price:{product.price}
                                            </p>
                                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                                Category:{product?.category?.name}
                                            </p>
                                            <Button>Add to Cart</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pt-8'>
                        <h3 className='text-2xl'>Similar Products</h3>
                        {relatedProducts.length < 1 && (<p>No similar products found</p>)}
                        <div className='flex flex-wrap'>
                            {relatedProducts?.map((p) => (
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
                                            <buttone className='mx-1 p-3 rounded-lg bg-white hover:bg-gradient-to-r from-pink-400 to-orange-500 border-2 border-red-300 hover:border-none text-black hover:border-4 transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105' onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                                toast.success("Item added to cart");
                                            }}>Add to Cart</buttone>
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
