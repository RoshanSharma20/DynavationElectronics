import { ListGroup } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function AdminMenu() {
    return (
        <>
            <div className='text-center'>
                <div className="w-48">
                    <ListGroup className='dark:bg-white'>
                        <center><h1 className='text-lg py-2 dark:text-black'>Admin Panel</h1></center>
                        <hr />
                        <ListGroup.Item>
                            <Link to='/dashboard/admin/create-category' className='dark:text-black'>Create Category</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/dashboard/admin/create-product' className='dark:text-black'>Create Product</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/dashboard/admin/products' className='dark:text-black'>Products</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/dashboard/admin/orders' className='dark:text-black'>Orders</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        </>
    )
}

export default AdminMenu
