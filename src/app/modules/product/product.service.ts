import { User } from '../user/user.model';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  let data;
  if (searchTerm) {
    data = {
      $or: [
        { name: { $regex: new RegExp(searchTerm, 'i') } },
        { description: { $regex: new RegExp(searchTerm, 'i') } },
      ],
    };
  } else {
    data = {};
  }

  const result = await Product.find(data);
  if (result.length === 0) {
    return {
      message: 'No product found.',
    };
  }

  return result;
};

const getCardOrFavoriteProductsFromDB = async (
  token: string,
  action: string,
) => {
  if (!token) {
    throw new Error('Token is missing');
  }

  const user = await User.findOne({ token });
  if (!user) {
    throw new Error('User not found');
  }

  let result: TProduct[];

  if (action === 'card') {
    result = await Product.find({ _id: { $in: user.my_card } });
  } else if (action === 'favorite') {
    result = await Product.find({ _id: { $in: user.my_favorite } });
  } else {
    result = [];
  }

  if (result.length === 0) {
    return {
      message: 'No product found.',
    };
  }

  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};
const updateProductIntoDB = async (id: string, data: TProduct) => {
  const result = await Product.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true, runValidators: true },
  );

  return result;
};
const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getCardOrFavoriteProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
