import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Card, Table } from 'flowbite-react';
import moment from 'moment';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/auth/orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);


    return (
        <Layout title={"User Dashboard-Orders"}>
            <center>
                <div className='flex flex-row pt-28 w-5/6'>
                    <div className='basis-1/5'>
                        <UserMenu />
                    </div>
                    <div className='basis-4/5'>
                        <h1>User Orders</h1>
                        {orders?.map((o, i) => {
                            return (
                                <div>
                                    <Table>
                                        <Table.Head>
                                            <Table.HeadCell>
                                                #
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Status
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Buyer
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Date
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Payment
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Quantity
                                            </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell>
                                                    {i + 1}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {o?.status}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {o?.buyer?.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {moment(o?.createAt).fromNow()}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {o?.payment.success ? "Success" : "Failed"}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {o?.products?.length}
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                    <div className='flex flex-col'>
                                        {o?.products?.map((p, i) => (
                                            <Card className='m-5'>
                                                <div className='flex flex-row'>
                                                    <div>
                                                        <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} alt="proudct image" width="300" />
                                                    </div>
                                                    <div className='ml-3 pt-2 grid justify-items-start'>
                                                        <p>Name : {p.name}</p>
                                                        <p>Description : {p.description.substring(0, 30)}</p>
                                                        <p>price : {p.price}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </center>
        </Layout>
    )
}

export default Orders
