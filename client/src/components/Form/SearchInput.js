
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
            <form className='flex justify-center ml-2' role='search' onSubmit={handleSubmit}>
                <input type="text" id="search-navbar" className="block w-7/12 xl:w-8/12 2xl:w-full lg:p-2 pl-3 lg:ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-300 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button className='ml-1 border border-2 border-blue-700 px-2 rounded-lg sm:text-md transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hover:scale-110 hover:border-0 hover:bg-blue-700 hover:text-white' type="submit"
                    outline>Search</button>
            </form>
        </div>
    )
}

export default SearchInput
