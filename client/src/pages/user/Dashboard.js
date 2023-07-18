import React, { useEffect, useRef } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';
import { Dropdown } from 'flowbite-react';


function Dashboard() {
    const [auth] = useAuth();
    const topContainer = useRef();

    useEffect(() => {
        // To make sure page starts from the top
        topContainer.current.scrollIntoView({ block: "end", behavior: 'smooth' });
    }, []);
    return (
        <Layout title={"DYNAVATION ELECTRONICS"}>
            <div ref={topContainer} />
            <center>
                <div className='flex flex-row pt-24 md:pt-36 lg:pt-24 w-5/6'>
                    <div className='hidden lg:block lg:basis-2/12 xl:basis-1/5'>
                        <UserMenu />
                    </div>
                    <div className='basis-full lg:basis-10/12 xl:basis-4/5'>
                        <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-10'><span className='border-4 border-gray-500 font-serif font-bold rounded-xl px-6 py-3 bg-white text-black'>User Details</span></h1>
                        <div className='flex justify-end mb-4 lg:hidden'>
                            <Dropdown inline label="User Panel">
                                <UserMenu />
                            </Dropdown>
                        </div>
                        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-white dark:border-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">User Name : {auth?.user?.name}</h5>
                            <p className="font-normal text-gray-700 dark:text-black">User Email :{auth?.user?.email}</p>
                            <p className="font-normal text-gray-700 dark:text-black">User Contact :{auth?.user?.phone}</p>
                        </div>
                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default Dashboard
