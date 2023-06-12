import { Button } from 'flowbite-react'
import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate('/search');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form className='flex' role='search' onSubmit={handleSubmit}>
                <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <Button className='ml-2 transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110' type="submit" gradientDuoTone="purpleToBlue"
                    outline>Submit</Button>
            </form>
        </div>
    )
}

export default SearchInput
