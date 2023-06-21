import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Dropdown } from 'flowbite-react'


function Products() {
    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/get-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting all products');
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <Layout title={"all products"}>
            <center>
                <div className='flex flex-row pt-24 md:pt-36 lg:pt-24 w-5/6'>
                    <div className='hidden lg:block lg:basis-2/12 xl:basis-1/5'>
                        <AdminMenu />
                    </div>
                    <div className='basis-full lg:basis-10/12 xl:basis-4/5'>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2'><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>All Products list</span></h1>
                        <div className='flex justify-end mb-4 lg:hidden'>
                            <Dropdown inline label="Admin Panel">
                                <AdminMenu />
                            </Dropdown>
                        </div>
                        <div className='flex flex-wrap'>
                            {products?.map((p) => (

                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='w-1/2 md:w-1/3 lg:w-1/4 px-1 pb-2'>
                                    <div key={p._id} >
                                        <div className='group border-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105'>
                                            <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} alt="" className='w-auto h-48 rounded-t-md' />
                                            <h5 className="text-xl xl:text-2xl font-bold text-gray-900 dark:text-white group-hover:underline">
                                                {p.name.substring(0, 30)}
                                            </h5>
                                            <h1 className="text-sm lg:text-base xl:text-xl text-gray-700 dark:text-gray-400">
                                                {p.description.substring(0, 30)}
                                            </h1>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default Products
