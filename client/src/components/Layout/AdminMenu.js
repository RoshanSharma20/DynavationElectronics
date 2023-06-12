import { ListGroup } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function AdminMenu() {
    return (
        <>
            <div className='text-center'>
                <div className="w-48">
                    <ListGroup>
                        <center><h1 className='text-lg py-2'>Admin Panel</h1></center>
                        <hr />
                        <ListGroup.Item>
                            <Link to='/dashboard/admin/create-category'>Create Category</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/dashboard/admin/create-product'>Create Product</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/dashboard/admin/products'>Products</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/dashboard/admin/orders'>Orders</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        </>
    )
}

export default AdminMenu
