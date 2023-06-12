import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Spinner({ path = "login" }) {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () => clearInterval(interval);
    }, [count, navigate, location, path])
    return (
        <center className=''>
            <h1>Redirecting to you in {count} second</h1>
            <div
                className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
            </div>
        </center>

    )
}

export default Spinner
