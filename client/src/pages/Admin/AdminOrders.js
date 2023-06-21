import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { Card, Dropdown, Table } from "flowbite-react";
const { Option } = Select;

function AdminOrders() {
    // eslint-disable-next-line
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
    ]);
    const [orders, setOrders] = useState([]);
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();

    //get orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/auth/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            // eslint-disable-next-line
            const { data } = await axios.put(`${process.env.REACT_APP_API}/auth/order-status/${orderId}`, {
                status: value,
            });
            toast.success("Change applied successfully");
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Layout title={"All Orders Data"}>
            <center>
                <div className='flex flex-row pt-24 md:pt-36 lg:pt-24 w-11/12 lg:w-5/6'>
                    <div className='hidden lg:block lg:basis-2/12 xl:basis-1/5'>
                        <AdminMenu />
                    </div>
                    <div className='basis-full lg:basis-10/12 xl:basis-4/5'>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2'><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>All Orders</span></h1>
                        <div className='flex justify-end mb-4 lg:hidden'>
                            <Dropdown inline label="User Panel">
                                <AdminMenu />
                            </Dropdown>
                        </div>
                        {orders?.map((o, i) => {
                            return (
                                <div>
                                    <div className='hidden md:block'>
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
                                                        <Select
                                                            bordered={false}
                                                            onChange={(value) => handleChange(o._id, value)}
                                                            defaultValue={o?.status}
                                                        >
                                                            {
                                                                status.map((s, i) => (
                                                                    <Option key={i} value={s}>
                                                                        {s}
                                                                    </Option>
                                                                ))
                                                            }
                                                        </Select >
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {o?.buyer?.name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {moment(o?.createAt).fromNow()}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {o?.payment ? "Success" : "Failed"}
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
                                                            <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} alt='product' width="300" />
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
                                    <div className='md:hidden'>
                                        <div className='my-8 py-2 rounded-lg bg-gray-400'>
                                            <h1>#:{i + 1}</h1>
                                            <h1>Status:<Select
                                                bordered={false}
                                                onChange={(value) => handleChange(o._id, value)}
                                                defaultValue={o?.status}
                                            >
                                                {
                                                    status.map((s, i) => (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    ))
                                                }
                                            </Select ></h1>
                                            <h1>Date:{moment(o?.createAt).fromNow()}</h1>
                                            <h1>Payment:{o?.payment ? "Success" : "Failed"}</h1>
                                            <h1>Quantity:{o?.products?.length}</h1>
                                            <div className='flex flex-wrap'>
                                                {
                                                    // eslint-disable-next-line
                                                    o?.products?.map((p) => (
                                                        <div className='flex items-stretch py-2'>
                                                            <div className='basis-3/6 lg:basis-2/5 px-2'>
                                                                <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} alt="" />
                                                            </div>
                                                            <div className='basis:3/6 lg:basis-3/5 self-center'>
                                                                <div className='flex justify-center items-center'>
                                                                    <div>
                                                                        <h5 className="text-sm sm:text-md lg:text-lg xl:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                                            Name:{p.name}
                                                                        </h5>
                                                                        <p className="text-sm md:text-md xl:text-lg text-gray-700 dark:text-gray-400">
                                                                            Description:{p.description}
                                                                        </p>
                                                                        <p className="text-sm md:text-md xl:text-lg text-gray-700 dark:text-gray-400">
                                                                            Price:{p.price}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
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

export default AdminOrders

