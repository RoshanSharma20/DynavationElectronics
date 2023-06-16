import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify'
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';
import { Button, Dropdown, Table } from 'flowbite-react';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';


function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle category submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/category/create-category`, { name });

            if (data?.success) {
                toast.success(`${data.category.name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form")
        }
    }

    //handle category update form
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/category/update-category/${selected._id}`, { name: updatedName });
            if (data?.success) {
                toast.success(`category is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong in updating category")
        }
    }

    //handle category delete
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/category/delete-category/${pid}`);
            if (data?.success) {
                toast.success(`${name} is deleted`);
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong in updating category")
        }
    }

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in gettin categories');
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])
    return (
        <Layout title={"Dashboard-Create Category"}>
            <center><div className='flex flex-row pt-24 md:pt-36 lg:pt-24 w-5/6'>
                <div className='hidden lg:block lg:basis-2/12 xl:basis-1/4'>
                    <AdminMenu />
                </div>
                <div className='basis-full lg:basis-10/12 xl:basis-3/4'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 bg-gradient-to-b from-slate-100 via-sky-400 to-blue-800 bg-clip-text text-transparent'>Manage Category</h1>
                    <div className='flex justify-end mb-4 lg:hidden'>
                        <Dropdown inline label="Admin Panel">
                            <AdminMenu />
                        </Dropdown>
                    </div>
                    <div className='py-2'>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                    </div>
                    <div className='w-full md:w-1/2 pt-2'>
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Name</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {categories?.map((c) => (
                                    <>
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell key={c._id}>{c.name}</TableCell>
                                            <TableCell>
                                                <div className='flex'>
                                                    <Button className='mx-1' onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}>Edit</Button>
                                                    <Button className='mx-1' onClick={() => handleDelete(c._id)}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </Table.Row>
                                    </>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </div>
                <Modal
                    onCancel={() => setVisible(false)}
                    footer={null}
                    visible={visible}
                >
                    <CategoryForm
                        value={updatedName}
                        setValue={setUpdatedName}
                        handleSubmit={handleUpdate}
                    />
                </Modal>
            </div>
            </center>
        </Layout>
    )
}

export default CreateCategory
