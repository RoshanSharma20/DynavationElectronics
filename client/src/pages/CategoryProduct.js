import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Dropdown } from 'flowbite-react';
import { Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useCart } from '../context/Cart';
import { toast } from 'react-toastify';
import useCategory from '../hooks/useCategory';

function CategoryProduct() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [checked, setChecked] = useState(null);
    const [radio, setRadio] = useState([]);
    const params = useParams();
    const [cart, setCart] = useCart();
    const catgories = useCategory();
    const navigate = useNavigate();
    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-category/${params.slug}`)
            setProducts(data?.products);
            setCategory(data?.category);
            setChecked(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getProductsByCat();
            if (radio.length) {
                setRadio([]);
                window.location.reload()
            }
        }
        // eslint-disable-next-line
    }, [params?.slug]);

    useEffect(() => {
        // eslint-disable-next-line
        if (radio.length) filterProduct();
        // eslint-disable-next-line
    }, [radio]);

    //get filtered products
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/product/product-price-filter`, { checked, radio });
            setProducts(data?.products);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout title={`Dynavation Electronics - ${params?.slug}`}>
            <div className='pt-24 md:pt-36 lg:pt-24'>
                <center>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl'><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>{category?.name}</span></h1>
                    <div className='flex flex-row'>
                        <div className='hidden lg:block lg:basis-2/12 xl:basis-1/5 text-xl'>
                            {/* adding section to select category of products */}
                            <div className='text-sm lg:text-base xl:text-lg pl-4 py-2'>
                                <Dropdown inline label="Categories" dismissOnClick={true}>
                                    <div>
                                        {catgories?.map((c) => (
                                            <Dropdown.Item><Link to={`/category/${c.slug}`}>{c.name}</Link></Dropdown.Item>
                                        ))}
                                    </div>
                                </Dropdown>
                            </div>
                            {/* filtering by price */}
                            <h4 className='text-sm lg:text-base xl:text-lg pl-2'>Filter by Prices</h4>
                            <div className='flex flex-col items-start pl-8'>
                                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                    {Prices?.map(p => (
                                        <div key={p._id}>
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </div>
                                    ))}
                                </Radio.Group>
                            </div>
                            <center>
                                <div className='pt-2'>
                                    <button onClick={() => window.location.reload()} className='border border-2 border-blue-700 px-2 py-1 rounded-lg sm:text-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white'>Reset Filters</button>
                                </div>
                            </center>
                        </div>
                        <div className='basis-full lg:basis-10/12 xl:basis-4/5'>
                            <div className='flex justify-end mb-4 lg:hidden'>
                                <div className='mx-2'>
                                    <Dropdown inline label="Filter">
                                        <div>
                                            {catgories?.map((c) => (
                                                <Dropdown.Item><Link to={`/category/${c.slug}`}><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>{c.name}</span></Link></Dropdown.Item>
                                            ))}
                                        </div>
                                    </Dropdown>
                                </div>
                                <div className='mx-2'>
                                    <Dropdown inline label="filter by prices">
                                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                            {Prices?.map(p => (
                                                <div key={p._id}>
                                                    <Radio value={p.array}>{p.name}</Radio>
                                                </div>
                                            ))}
                                        </Radio.Group>
                                    </Dropdown>
                                </div>
                                <div className='mx-2'>
                                    <Button onClick={() => window.location.reload()} className='border border-2 border-blue-700 px-2 py-1 rounded-lg sm:text-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white'>Reset Filters</Button>
                                </div>
                            </div>
                            <div className='flex flex-wrap'>
                                {products?.map((p) => (
                                    <div className='w-1/2 md:w-1/3 lg:w-1/4 px-2 pb-2' key={p._id} >
                                        <div className='group  border-b-2 drop-shadow-md rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105'>
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
                </center>
            </div>
        </Layout>
    )
}

export default CategoryProduct
