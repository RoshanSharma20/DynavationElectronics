import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import axios from 'axios';


function CartPage() {
    const [cart, setCart] = useCart();
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    // const [clientToken, setClientToken] = useState("");
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    // const [instance, setInstance] = useState("");


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
    // const getToken = async () => {
    //     try {
    //         const { data } = await axios.get(`${process.env.REACT_APP_API}/product/braintree/token`)
    //         setClientToken(data?.clientToken);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getToken();
    // }, [auth?.token])


    //handle payments
    // const handlePayment = async () => {
    //     try {
    //         setLoading(true);
    //         const { nonce } = await instance.requestPaymentMethod();
    //         // eslint-disable-next-line
    //         const { data } = await axios.post(`${process.env.REACT_APP_API}/product/braintree/payment`, {
    //             nonce,
    //             cart,
    //         });
    //         setLoading(false);
    //         localStorage.removeItem("cart");
    //         setCart([]);
    //         navigate("/dashboard/user/orders");
    //         toast.success("Payment Completed Successfully ");
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // };

    const checkoutHandler = async () => {
        const { Key } = await axios.get(`${process.env.REACT_APP_API}/payment/get-payment-key`);
        console.log(Key?.key);
        const amount = totalPrice();
        const { data } = await axios.post(`${process.env.REACT_APP_API}/payment/checkout`, { amount });

        const options = {
            key: Key?.key, // Enter the Key ID generated from the Dashboard
            amount: data?.order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Roshan",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: data?.order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                // alert(response.razorpay_payment_id);
                // const razorpay_payment_id = response.razorpay_payment_id;
                // alert(response.razorpay_order_id);
                // const razorpay_order_id = response.razorpay_order_id;
                // alert(response.razorpay_signature);
                // const razorpay_signature = response.razorpay_signature;
                // alert("payment successfull");
                // if (data?.ok) {
                navigate("/paymentsuccess");
                // }
            },
            prefill: {
                name: auth?.user?.name,
                email: auth?.user?.email,
                contact: auth?.user?.phone
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();
    }
    const topContainer = useRef();

    useEffect(() => {
        // To make sure page starts from the top
        topContainer.current.scrollIntoView({ block: "end", behavior: 'smooth' });
    }, []);

    return (
        <Layout>
            <div ref={topContainer} />
            <center>
                <div className='pt-24 md:pt-36 lg:pt-24 w-11/12 lg:w-5/6'>
                    <div className='text-center'>
                        <h1 className='text-xl lg:text-2xl xl:text-3xl'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center text-lg lg:text-xl xl:text-2xl'>
                            {cart?.length > 0 ? `you have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "your cart is empty"}
                        </h4>
                    </div>
                    <div className='lg:flex'>
                        <div className='lg:basis-2/4'>
                            <div className='sm:hidden flex flex-wrap'>
                                {
                                    // eslint-disable-next-line
                                    cart?.map((p) => (
                                        <div className='w-1/2 md:w-1/3 lg:w-1/4 px-2 pb-2' key={p._id} >
                                            <div className='group border-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-105 pb-1'>
                                                <img src={`${process.env.REACT_APP_API}/product/product-image/${p._id}`} alt="" className='w-auto h-24 sm:h-32 md:h-36 xl:h-48 rounded-t-md' />
                                                <div className="text-xl xl:text-2xl font-bold text-gray-900 group-hover:underline">
                                                    {p.name.substring(0, 20)}
                                                </div>
                                                <div className="text-sm lg:text-base xl:text-xl text-gray-700">
                                                    {p.description.substring(0, 30)}
                                                </div>
                                                <div className="text-sm lg:text-base xl:text-xl text-gray-700">
                                                    RS. <span className='text-md lg:text-lg'>{p.price}</span>
                                                </div>
                                                <button onClick={() => removeCartItem(p._id)} className='w-2/4 px-1 border border-2 border-blue-700 p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white'>Remove</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='hidden sm:block'>
                                {
                                    // eslint-disable-next-line
                                    cart?.map((p) => (
                                        <Card className='m-5 dark:bg-white'>
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
                                            <button onClick={() => removeCartItem(p._id)} className='w-1/4 border border-2 border-blue-700 p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white'>Remove</button>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                        <div className='lg:basis-2/4'>
                            <h2 className='text-xl'>Cart Summary</h2>
                            <p>Total | CheckOut | Payment</p>
                            <hr />
                            <h4 className='pt-4'>Total: {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <>
                                    <div>
                                        <h4>Current Address : {auth?.user?.address}</h4>
                                        <button onClick={() => navigate('/dashboard/user/profile')} className='border border-2 border-blue-700 p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white'>update address</button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    {auth?.token ? (
                                        <button onClick={() => navigate('/dashboard/user/profile')} className='border border-2 border-blue-700 p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white'>update address</button>
                                    ) : (
                                        <button onClick={() => navigate('/login', { state: "/cart" })} className='border border-2 border-blue-700 p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white'>Please login to checkout</button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                {!auth?.token || !cart?.length ? (
                                    ""
                                ) : (
                                    <>
                                        <Button
                                            className=""
                                            onClick={checkoutHandler}
                                            disabled={loading || !auth?.user?.address}>
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
