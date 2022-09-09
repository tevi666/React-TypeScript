import axios from 'axios';
import React, { useState } from 'react';
import {IProduct} from '../models'
import Error from './Error';

const productData: IProduct = {
    title: '',
    price: 14.5,
    description: 'test description',
    image: 'https://i.pravatar.cc',
    category: 'test category',
    rating: {
        rate: 42,
        count: 10
    }
}

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

const CreateProduct = ({onCreate}: CreateProductProps) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const submitHandler = async(e: React.FormEvent) => {
        e.preventDefault();
        setError('')
        if(value.trim().length === 0) {
            setError('Please enter valid title.')
            return
        }
        productData.title = value
        const res = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
        onCreate(res.data)
    }
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }
    return (
        <form onSubmit={submitHandler}>
            <input 
            type="text" 
            className='border py-2 px-4 mb-2 w-full outline-0' placeholder="Enter product title" 
            value={value} 
            onChange={changeHandler} />
            {error && <Error error={error}/>}
            <button type='submit' className='py-2 px-4 border bg-yellow-400 hover:text-white transition-all'>Create</button>
        </form>
    );
};

export default CreateProduct;