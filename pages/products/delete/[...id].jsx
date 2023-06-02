import Layout from '@/components/Layout';
import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteProductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const {id} = router.query;

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/api/products?id='+id).then(response => setProductInfo(response.data));
  }, [id]);

  const goBack = () => {
    router.push('/products');
  }

  const deleteProduct = async () => {
    await axios.delete('/api/products?id='+id);
    goBack();
  }

  return (
    <Layout>
      <h1 className='text-center'>Do you really want to delete product "{productInfo?.title}"?</h1>
      <div className="flex gap-3 justify-center">
        <button className='btn-accent' onClick={deleteProduct}>Yes</button>
        <button className='btn-danger' onClick={goBack}>No</button>
      </div>
    </Layout>
  )
}

export default DeleteProductPage