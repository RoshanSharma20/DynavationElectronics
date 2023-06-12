import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'flowbite-react';
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
            <center>
                <div className='flex flex-row pt-28'>
                    {/* filtering by category */}
                    <div className='basis-1/5 text-xl'>
                        <h4>Filter by Category</h4>
                        <div className='flex flex-col items-start pl-16'>
                            {categories?.map(c => (
                                <div><Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox></div>
                            ))}
                        </div>
                        {/* filtering by price */}
                        <h4>Filter by Prices</h4>
                        <div className='flex flex-col items-start pl-16'>
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {Prices?.map(p => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className='pt-2'>
                            <Button onClick={() => window.location.reload()}>Reset Filters</Button>
                        </div>
                    </div>
                    <div className='basis-4/5 pr-12'>
                        <h4 className='text-center text-3xl md:text-4xl'>All Products
                        </h4>
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
                            <div>
                                {products && products.length < total && (
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}>
                                        {loading ? "Loading.." : "Loadmore"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default AllCategoryProduct
