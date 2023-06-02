import axios from 'axios';
import React, { useState } from 'react';
import {useRouter} from 'next/router';

const ProductForm = ({
  _id,
  title: existingTitle, 
  sku: existingSku, 
  description: existingDescription, 
  price: existingPrice
}) => {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription  || '');
  const [price, setPrice] = useState(existingPrice  || '');
  const [sku, setSku] = useState(existingSku  || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = {title, sku, description, price};

    if (_id) {
      //update
      await axios.put('/api/products', {...data,_id});
    } else {
      // create
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) { 
    router.push('/products');
  }

  return (
    <form onSubmit={saveProduct}>
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
  )
}

export default ProductForm