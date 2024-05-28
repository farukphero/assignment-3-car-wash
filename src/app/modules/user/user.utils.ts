import { User } from './user.model';
import crypto from 'crypto';

const findLastUserToken = async () => {
  const lastUser = await User.findOne(
    {},

    {
      token: 1,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.token ? lastUser.token.split('|')[0] : undefined;
};

export const generateUserToken = async () => {
  const currentToken = (await findLastUserToken()) || (0).toString();

  let incrementToken = (Number(currentToken) + 1).toString().padStart(4, '0');

  incrementToken = `${incrementToken}|${crypto.randomBytes(64).toString('hex')}`;

  return incrementToken;
};
