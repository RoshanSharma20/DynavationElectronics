import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

function Users() {
    return (
        <Layout title={"Dashboard-all users"}>
            <div className='flex flex-row pt-24 md:pt-36 lg:pt-24'>
                <div className='basis-1/4'>
                    <AdminMenu />
                </div>
                <div className='basis-3/4'>
                    <h1> All Users</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Users
