import axios from 'axios';
import React, { useState } from 'react';
import {useRouter} from 'next/router';

const ProductForm = ({
  _id,
  title: existingTitle, 
  sku: existingSku, 
  description: existingDescription, 
  price: existingPrice,
  images,
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

  const uploadImage = async (e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Images</label>
      <div className='mb-3'>
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 2MB)</p>
                </div>
                <input onChange={uploadImage} id="dropzone-file" type="file" className="hidden" />
            </label>
        </div>
        {!images?.length && (
          <div>No images in this product</div>
        )}
      </div>
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