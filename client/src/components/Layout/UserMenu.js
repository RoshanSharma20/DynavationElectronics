import { ListGroup } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function UserMenu() {
    return (
        <>
            <div className='text-center'>
                <div className="w-48">
                    <ListGroup>
                        <center><h1 className='text-lg py-2'><Link to='/dashboard/user'>User Dashboard</Link></h1></center>
                        <hr />
                        <ListGroup.Item>
                            <Link to='/dashboard/user/profile'>Profile</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/dashboard/user/orders'>orders</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        </>
    )
}

export default UserMenu
