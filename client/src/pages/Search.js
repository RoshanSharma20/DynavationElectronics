import { Layout } from 'antd'
import React from 'react'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { toast } from 'react-toastify';

function Search() {
    // eslint-disable-next-line
    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    return (
        <Layout title={"search results"}>
            <center>
                <div className='w-5/6'>
                    <div className='text-center pt-24 md:pt-36 lg:pt-24'>
                        <h1>Search Results</h1>
                        <h6>{values?.results?.length < 1 ? "No products found" : `found ${values?.results?.length}`}</h6>
                        <div className='flex flex-wrap'>
                            {values?.results.map((p) => (
                                <div className='w-1/2 md:w-1/3 lg:w-1/4 px-2 pb-2' key={p._id} >
                                    <div className='group border-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105'>
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
        </Layout>
    )
}

export default Search
