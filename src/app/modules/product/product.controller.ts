import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = req.body;

  const result = await ProductServices.createProductIntoDB(product);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  const result = await ProductServices.getAllProductsFromDB(
    searchTerm as string,
  );

  res.status(200).json({
    success: true,
    message: searchTerm
      ? `Products matching search term ${searchTerm} fetched successfully!`
      : 'Products fetched successfully!',
    data: result,
  });
});
const getUserCardOrFavoriteProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { token } = req.body;
    const { action } = req.params;

    const result = await ProductServices.getCardOrFavoriteProductsFromDB(
      token,
      action,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  },
);

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await ProductServices.getSingleProductFromDB(productId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Products fetched successfully!',
    data: result,
  });
});
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = req.body;

  const result = await ProductServices.updateProductIntoDB(productId, product);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product updated successfully!',
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  await ProductServices.deleteProductFromDB(productId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product deleted successfully!',
    data: null,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getUserCardOrFavoriteProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
