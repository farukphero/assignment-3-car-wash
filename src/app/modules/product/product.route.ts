import express from 'express';
import { ProductControllers } from './product.controller';
import { productValidations } from './product.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router
  .route('/')
  .get(ProductControllers.getAllProducts)
  .post(
    validateRequest(productValidations.productValidationSchema),
    ProductControllers.createProduct,
  );
router
  .route('/:action(card|favorite)')
  .get(ProductControllers.getUserCardOrFavoriteProducts);

router
  .route('/:productId')
  .get(ProductControllers.getSingleProduct)
  .put(
    validateRequest(productValidations.productUpdateValidationSchema),
    ProductControllers.updateProduct,
  )
  .delete(ProductControllers.deleteProduct);

export const ProductRoutes = router;
