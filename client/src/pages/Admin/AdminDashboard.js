import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

function AdminDashboard() {
    const [auth] = useAuth();
    return (
        <Layout title={"Admin Dashboard"}>
            <center>
                <div className='flex flex-row pt-28 w-5/6'>
                    <div className='basis-1/5'>
                        <AdminMenu />
                    </div>
                    <div className='basis-4/5'>
                        <h1 className='text-3xl'>Admin Details</h1>

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
