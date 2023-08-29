import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";


const handle = async (req, res) => {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
    const {title,sku,description,price,images} = req.body;

    const productDoc = await Product.create({
      title,sku,description,price,images
    })
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const { title, sku, description, price,images,_id } = req.body;

    await Product.updateOne({_id}, {title, sku, description, price, images});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}

export default handle;