import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Dropdown } from 'flowbite-react';
import { Checkbox, Radio } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/Cart';
import Layout from '../../components/Layout/Layout';
import { Prices } from '../../components/Prices';

function AllCategoryProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in gettin categories');
        }
    }

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, [])

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

    //get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-count`)
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
        // eslint-disable-next-line
    }, [page]);

    //load more function
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    //filter by categories
    const handleFilter = async (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all);
    }

    useEffect(() => {
        if (!checked.length || !radio.lenth) getAllProducts();
        // eslint-disable-next-line
    }, [checked.length, radio.lenth])

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
        // eslint-disable-next-line
    }, [checked, radio]);

    //get filtered products
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/product/product-filters`, { checked, radio });
            setProducts(data?.products);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={"Dynavation Electronics-All Products"}>
            <div className='flex flex-row pt-24 md:pt-36 lg:pt-24'>
                {/* filtering by category */}
                <div className='hidden lg:block lg:basis-2/12 xl:basis-1/5 text-xl'>
                    <h4 className='text-sm lg:text-base xl:text-lg pl-4'>Filter by Category</h4>
                    <div className='flex flex-col items-start pl-8'>
                        {categories?.map(c => (
                            <div><Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox></div>
                        ))}
                    </div>
                    {/* filtering by price */}
                    <h4 className='text-sm lg:text-base xl:text-lg pl-4'>Filter by Prices</h4>
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
                    <center>
                        <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-10'><span className='border-4 border-gray-500 font-serif font-bold rounded-xl px-6 py-3 bg-white text-black'>All Products</span></h1>
                        <div className='flex justify-end mb-4 lg:hidden'>
                            <div className='mx-2'>
                                <Dropdown inline label="Filter">
                                    <div>
                                        {categories?.map(c => (
                                            <div><Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox></div>
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
                                <button onClick={() => window.location.reload()} className='border border-2 border-blue-700 px-2 py-1 rounded-lg sm:text-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white'>Reset Filters</button>
                            </div>
                        </div>
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
                            <div>
                                {products && products.length < total && (
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }} className='border border-2 border-blue-700 px-2 py-1 rounded-lg sm:text-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white'>
                                        {loading ? "Loading.." : "Loadmore"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        </Layout>
    )
}

export default AllCategoryProduct
