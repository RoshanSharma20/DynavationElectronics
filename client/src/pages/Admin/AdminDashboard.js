import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
import { Dropdown } from 'flowbite-react';

function AdminDashboard() {
    const [auth] = useAuth();
    return (
        <Layout title={"Admin Dashboard"}>
            <center>
                <div className='flex flex-row pt-28 w-5/6'>
                    <div className='hidden lg:block lg:basis-2/12 xl:basis-1/4'>
                        <AdminMenu />
                    </div>
                    <div className='basis-full lg:basis-10/12 xl:basis-3/4'>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>Admin Details</h1>
                        <div className='flex justify-end mb-4 lg:hidden'>
                            <Dropdown inline label="Admin Panel">
                                <AdminMenu />
                            </Dropdown>
                        </div>
                        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Name : {auth?.user?.name}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Admin Email :{auth?.user?.email}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Admin Contact :{auth?.user?.phone}</p>
                        </div>

                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default AdminDashboard
