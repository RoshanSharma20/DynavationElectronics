import React, { useState, useEffect } from 'react'
import useCategory from '../hooks/useCategory'
import Layout from '../components/Layout/Layout'
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

function Categories() {
    const categories = useCategory();
    return (
        <Layout title={'All Categories'}>
            <h1>All Categories</h1>
            <div className='flex flex-wrap'>
                {categories?.map((c) => (
                    <Button key={c._id}><Link to={`/category/${c.slug}`}>{c.name}</Link></Button>
                ))}
            </div>
        </Layout>
    )
}

export default Categories
