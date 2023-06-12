import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


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
                <div className='flex flex-row pt-28 w-5/6'>
                    <div className='basis-1/5'>
                        <AdminMenu />
                    </div>
                    <div className='basis-4/5'>
                        <h1 className='text-center text-3xl'>All Products list</h1>
                        <div className='flex flex-wrap'>
                            {products?.map((p) => (

                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='w-1/4 px-2 pb-2'>
                                    <div key={p._id} >
                                        <div className='group border-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105'>
                                            <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} alt="" className='w-auto h-48 rounded-t-md' />
                                            <h5 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:underline">
                                                {p.name}
                                            </h5>
                                            <h1 className="font-normal text-gray-700 dark:text-gray-400">
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
