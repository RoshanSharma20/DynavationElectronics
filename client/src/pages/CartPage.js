import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-toastify';

function CartPage() {
    const [cart, setCart] = useCart();
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [instance, setInstance] = useState("");


    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            // eslint-disable-next-line
            cart?.map((item) => {
                total = total + item.price;
            });
            return total;
        } catch (error) {
            console.log(error);
        }
    }

    //delete cart item
    const removeCartItem = async (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }

    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/braintree/token`)
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token])


    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            // eslint-disable-next-line
            const { data } = await axios.post(`${process.env.REACT_APP_API}/product/braintree/payment`, {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    return (
        <Layout>
            <center>
                <div className='pt-28 w-5/6'>
                    <div className='text-center'>
                        <h1 className='text-3xl'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center text-lg'>
                            {cart?.length > 0 ? `you have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "your cart is empty"}
                        </h4>
                    </div>
                    <div className='flex'>
                        <div className='basis-2/4'>
                            <div className='flex flex-col'>
                                {
                                    // eslint-disable-next-line
                                    cart?.map((p) => (
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
                                            <Button onClick={() => removeCartItem(p._id)} className='w-1/4'>Remove</Button>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                        <div className='basis-2/4'>
                            <h2 className='text-xl'>Cart Summary</h2>
                            <p>Total | CheckOut | Payment</p>
                            <hr />
                            <h4 className='pt-4'>Total: {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <>
                                    <div>
                                        <h4>Current Address : {auth?.user?.address}</h4>
                                        <Button onClick={() => navigate('/dashboard/user/profile')}>update address</Button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    {auth?.token ? (
                                        <Button onClick={() => navigate('/dashboard/user/profile')}>update address</Button>
                                    ) : (
                                        <Button onClick={() => navigate('/login', { state: "/cart" })}>Please login to checkout</Button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                {!clientToken || !auth?.token || !cart?.length ? (
                                    ""
                                ) : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />

                                        <Button
                                            className=""
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Make Payment"}
                                        </Button>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </center>
        </Layout>
    )
}
export default CartPage
