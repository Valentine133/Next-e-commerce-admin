import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useState } from 'react';
import {useRouter} from 'next/router';

const NewProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  const createProduct = async (e) => {
    e.preventDefault();
    const data = {title, sku, description, price};
    await axios.post('/api/products', data);
    setGoToProducts(true);
  }

  if (goToProducts) { 
    router.push('/products');
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
        <label>Title</label>
        <input 
          className='form-control' 
          type="text" 
          placeholder='Title' 
          value={title} 
          onChange={e => setTitle(e.target.value)}/>
        <label>SKU</label>
        <input 
          className='form-control' 
          type="text" 
          placeholder='SKU' 
          value={sku} 
          onChange={e => setSku(e.target.value)}/>
        <label>Description</label>
        <textarea 
          className='form-control' 
          name="description"
          rows="5" 
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Description'/>
        <label>Price (USD)</label>
        <input 
          className='form-control' 
          type="number" 
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder='Price' />
        <button type='submit' className='btn-primary'>Save</button>
      </form>
    </Layout>
  )
}

export default NewProduct;