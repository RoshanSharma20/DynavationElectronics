import React, { useEffect } from 'react'
import { useCart } from '../context/Cart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const handleSuccessPayment = async () => {
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Payment Completed Successfully ");
    }
    useEffect(() => {
        handleSuccessPayment();
    }, [])
    return (
        <div className='pt-32'>
            <h1>payment success</h1>
        </div>
    )
}

export default PaymentSuccess
