import {Category} from '@/models/Category';
import { mongooseConnect } from "@/lib/mongoose";

const handle = async (req, res) => {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    const categories = await Category.find().populate('parent');
    res.json(categories);
  }

  if (method === 'POST') {
    const { name, parentCategory, properties } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent:parentCategory || undefined,
      properties: properties,
    });
    res.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { name, parentCategory, properties, _id } = req.body;
    const categoryDoc = await Category.updateOne({_id}, {
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.json(categoryDoc);
  }

  if (method === 'DELETE') {
    const {_id} = req.query;
    await Category.deleteOne({_id});
    res.json('ok');
  }
};

export default handle;