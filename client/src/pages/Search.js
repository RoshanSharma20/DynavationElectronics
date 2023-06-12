import { Layout } from 'antd'
import React from 'react'
import { useSearch } from '../context/search'
import { Button, Card } from 'flowbite-react';

function Search() {
    const [values, setValues] = useSearch();
    return (
        <Layout title={"search results"}>
            <div>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>{values?.results?.length < 1 ? "No products found" : `found ${values?.results?.length}`}</h6>
                    <div className='flex flex-wrap'>
                        {values?.results.map((p) => (
                            <div className="max-w-sm" key={p._id} >
                                <Card imgSrc={`${process.env.REACT_APP_API}/product/product-image/${p._id}`}>
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {p.name}
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        {p.description.substring(0, 30)}
                                    </p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        {p.price}
                                    </p>
                                    <div className='flex'>
                                        <Button className='mx-1'>More Details</Button>
                                        <Button className='mx-1'>Add to Cart</Button>
                                    </div>
                                </Card>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
