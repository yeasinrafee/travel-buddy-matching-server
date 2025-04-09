import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
// 1. Register User
const registerUser = async (userData: any) => {
  const { password, profile, ...user } = userData;

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;

  const userProfile: {
    userId: string;
    bio: string;
    age: number;
  } = {
    userId: '',
    bio: profile.bio,
    age: profile.age,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const registeredUserData = await transactionClient.user.create({
      data: user,
    });

    userProfile.userId = registeredUserData.id;

    const registeredUserProfileData =
      await transactionClient.userProfile.create({
        data: userProfile,
      });

    return registeredUserData;
  });

  return result;
};

export const UserService = {
  registerUser,
};
