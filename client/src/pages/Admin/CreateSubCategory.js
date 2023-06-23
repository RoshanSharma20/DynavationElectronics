import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { Button, Dropdown, Table } from 'flowbite-react'
import SubCategoryForm from '../../components/Form/SubCategoryForm'
import axios from 'axios'
import { Modal, Select } from 'antd'
import { toast } from 'react-toastify'
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell'
const { Option } = Select;

function CreateSubCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [visible, setVisible] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [selected, setSelected] = useState(null);
    // const navigate = useNavigate();


    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting all categories');
        }
    }

    const getSubCategoriesByCategories = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/subCategory/get-subCategory`, { category });//fetching all subcategories related to a category id 
            console.log(data?.subcategory);
            setSubCategory(data?.subcategory);
        } catch (error) {
            console.log(error);
        }
    }


    //handle category submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/subCategory/create-subCategory`, { name, category });

            if (data?.success) {
                toast.success(`${data.subcategory.name} is created`);
                getSubCategoriesByCategories();
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
            const { data } = await axios.put(`${process.env.REACT_APP_API}/subCategory/update-subCategory/${selected._id}`, { name: updatedName });
            if (data?.success) {
                toast.success(`subcategory is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getSubCategoriesByCategories();
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
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/subCategory/delete-subCategory/${pid}`);
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


    useEffect(() => {
        getAllCategory();
    }, [])

    // useEffect(() => {
    //     getSubCategoriesByCategories()
    // }, [category]);

    return (
        <Layout title={"Dyanvation Electronics-create subCategory"}>
            <center>
                <div className='flex flex-row pt-24 md:pt-36 lg:pt-24 w-5/6'>
                    <div className='hidden lg:block lg:basis-2/12 xl:basis-1/4'>
                        <AdminMenu />
                    </div>
                    <div className='basis-full lg:basis-10/12 xl:basis-3/4'>
                        <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl my-10'><span className='border-4 border-gray-500 font-serif font-bold rounded-xl px-6 py-3 bg-white text-black'>Manage Sub-Category</span></h1>
                        <div className='flex justify-end mb-4 lg:hidden'>
                            <Dropdown inline label="Admin Panel">
                                <AdminMenu />
                            </Dropdown>
                        </div>
                        <div className='py-2'>
                            <div className='mb-2'>
                                <Select
                                    // bordered={false}
                                    placeholder="Select a category"
                                    size="large"
                                    showSearch
                                    className="form-select flex flex-grow"
                                    onChange={(value) => {
                                        setCategory(value);
                                        // getSubCategoriesByCategories();
                                    }}
                                >
                                    {categories?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <SubCategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <Button onClick={getSubCategoriesByCategories} disabled={category.length === 0}>{category.length === 0 ? "select category" : "show all subcategories"}
                        </Button>
                        <div className='w-full md:w-1/2 pt-2'>
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>Name</Table.HeadCell>
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {subCategory?.map((c) => (
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
                        <SubCategoryForm
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

export default CreateSubCategory
