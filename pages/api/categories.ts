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
    const { name, parentCategory } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent:parentCategory,
    });
    res.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { name, parentCategory,_id } = req.body;
    const categoryDoc = await Category.updateOne({_id}, {
      name,
      parent: parentCategory,
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