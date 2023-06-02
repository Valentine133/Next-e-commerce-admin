import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";


const handle = async (req, res) => {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    res.json(await Product.find());
  }

  if (method === 'POST') {
    const {title,sku,description,price} = req.body;

    const productDoc = await Product.create({
      title,sku,description,price
    })
    res.json(productDoc);
  }
}

export default handle;