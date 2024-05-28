import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { updateFunc } from './user.const';

const router = express.Router();

router
  .route('/create-user')
  .post(
    validateRequest(userValidations.userValidationSchemaForCreateUser),
    userControllers.createUser,
  );

router
  .route('/login')
  .post(
    validateRequest(userValidations.userValidationSchemaForLogin),
    userControllers.loginUser,
  );
router.route('/:action(card|favorite|profile)').put(updateFunc);

export const UserRoutes = router;
