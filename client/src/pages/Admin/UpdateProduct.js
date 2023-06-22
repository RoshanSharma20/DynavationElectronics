import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { Button, Dropdown, TextInput } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;

function UpdateProduct() {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/get-product/${params.slug}`)
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
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
            toast.error('Something went wrong in gettind categories');
        }
    }

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            image && productData.append("image", image);
            productData.append("shipping", shipping);
            const { data } = axios.put(`${process.env.REACT_APP_API}/product/update-product/${id}`, productData);

            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in creating product")
        }
    }

    //delete product function
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/product/delete-product/${id}`);
            if (data?.success) {
                toast.success("Product deleted Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in deleting product")
        }
    }

    useEffect(() => {
        getSingleProduct();
        getAllCategory();
        // eslint-disable-next-line
    }, [])
    return (
        <Layout title={"Dashboard-Create Product"}>
            <center>
                <div className='flex flex-row pt-24 md:pt-36 lg:pt-24 w-5/6'>
                    <div className='hidden lg:block lg:basis-2/12 xl:basis-1/4'>
                        <AdminMenu />
                    </div>
                    <div className='basis-full lg:basis-10/12 xl:basis-3/4'>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 my-10'><span className='border-2 rounded-2xl px-4 py-2 bg-blue-500 text-white'>Update Product</span></h1>
                        <div className='flex justify-end mb-4 lg:hidden'>
                            <Dropdown inline label="Admin Panel">
                                <AdminMenu />
                            </Dropdown>
                        </div>
                        <div className='w-5/6'>
                            <div className='mb-2'>
                                <Select
                                    placeholder="Select a category"
                                    size="large"
                                    showSearch
                                    className="form-select flex flex-grow"
                                    onChange={(value) => {
                                        setCategory(value);
                                    }} value={category}
                                >
                                    {categories?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className='p-2'>
                                <label className='button rounded-full p-3 bg-indigo-500'>
                                    {image ? image.name : "upload image"}
                                    <input type="file" name="photo" accept="image/*" onChange={(e) => setImage(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className=''>
                                {image ? (
                                    <div>
                                        <img src={URL.createObjectURL(image)} alt="product_image" height={"200px"}
                                            className='object-contain h-44 w-44' />
                                    </div>
                                ) : (
                                    <div>
                                        <img src={`${process.env.REACT_APP_API}/product/product-image/${id}`} alt="product_image" height={"200px"}
                                            className='object-contain h-44 w-44' />
                                    </div>
                                )}
                            </div>
                            <div className='my-4'>
                                <div>
                                    <TextInput type="text" placeholder="Enter New Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                            </div>
                            <div className='my-4'>
                                <div>
                                    <TextInput type="text" placeholder="Enter Product description" value={description} sizing="lg" onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className='my-4'>
                                <div>
                                    <TextInput type="number" placeholder="Enter Product price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </div>
                            </div>
                            <div className='my-4'>
                                <div>
                                    <TextInput type="number" placeholder="Enter Product quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                </div>
                            </div>
                            <div className='my-4'>
                                <Select
                                    // bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select flex flex-grow"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }} value={shipping ? "Yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className='flex my-4'>
                                <Button onClick={handleUpdate} className='mx-2'>
                                    Update Product
                                </Button>
                                <Button onClick={handleDelete} className='mx-2'>
                                    Delete Product
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </Layout >
    )
}

export default UpdateProduct
