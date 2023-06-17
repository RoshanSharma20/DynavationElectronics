import React, { useEffect } from 'react'
import { useCart } from '../context/Cart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentSuccess() {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    useEffect(() => {
        const handleSuccessPayment = async () => {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/product/payment-successfull`, { cart });
            console.log(data);
            if (data?.ok) {
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/dashboard/user/orders");
                toast.success("Payment Completed Successfully ");
            }
        }
        handleSuccessPayment();
    }, [cart, navigate, setCart]);
    return (
        <div className='pt-32'>
            <h1>payment success</h1>
        </div>
    )
}

export default PaymentSuccess
