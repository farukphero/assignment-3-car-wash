import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return {
    name: result.name,
    token: result.token,
  };
};

const loginUserWithDB = async (payload: TUser) => {
  const { email, password } = payload;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new Error('User not found');
  }

  const isPasswordValid = await existingUser.comparePassword(
    password as string,
  );

  if (!isPasswordValid) {
    throw new Error('Invalid password!');
  }

  // const { password: _, ...userWithoutPassword } = existingUser.toObject();

  return {
    name: existingUser.name,
    token: existingUser.token,
  };
};
const myCardProducts = async (token: string, id: string) => {
  if (!token) {
    throw new Error('Token is missing');
  }
  const user = await User.findOne({ token });
  if (!user) {
    throw new Error('User not found');
  }
  const isCard = user.my_card.includes(id);

  const updateUser = await User.updateOne(
    { token: token },
    {
      [isCard ? '$pull' : '$addToSet']: { my_card: id },
    },
    { runValidators: true },
  );
  return {
    status: true,
    message: isCard ? 'Delete from card list.' : 'Card added successful.',
    data: updateUser,
  };
};

const myFavoriteProducts = async (token: string, id: string) => {
  if (!token) {
    throw new Error('Token is missing');
  }
  const user = await User.findOne({ token });
  if (!user) {
    throw new Error('User not found');
  }
  const isFavorite = user.my_favorite.includes(id);

  const updateUser = await User.updateOne(
    { token: token },
    {
      [isFavorite ? '$pull' : '$addToSet']: { my_favorite: id },
    },
    { runValidators: true },
  );
  return {
    status: true,
    message: isFavorite ? 'Delete from favorite list.' : 'Favorite successful.',
    data: updateUser,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUserWithDB,
  myCardProducts,
  myFavoriteProducts,
};
