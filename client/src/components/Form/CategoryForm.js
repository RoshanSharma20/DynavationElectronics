import { Button, TextInput } from 'flowbite-react'
import React from 'react'

function CategoryForm({ handleSubmit, value, setValue }) {

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextInput type="text" placeholder="Enter New Category Name" value={value} onChange={(e) => setValue(e.target.value)} required />
                </div>
                <Button type="submit" className='my-2'>Submit</Button>
            </form>
        </>
    )
}

export default CategoryForm
