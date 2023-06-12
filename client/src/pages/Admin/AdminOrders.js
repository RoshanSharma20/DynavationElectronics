import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { Card, Table } from "flowbite-react";
const { Option } = Select;

function AdminOrders() {
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
    ]);
    const [orders, setOrders] = useState([]);
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
                <div className="flex pt-28 w-5/6">
                    <div className="basis-1/4">
                        <h1><AdminMenu /></h1>
                    </div>
                    <div className="basis-3/4">
                        <h1 className="text-3xl">All Orders</h1>
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
                                                    <Select
                                                        bordered={false}
                                                        onChange={(value) => handleChange(o._id, value)}
                                                        defaultValue={o?.status}
                                                    >
                                                        {status.map((s, i) => (
                                                            <Option key={i} value={s}>
                                                                {s}
                                                            </Option>
                                                        ))}
                                                    </Select>
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
                                                        <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} width="300" />
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

export default AdminOrders
