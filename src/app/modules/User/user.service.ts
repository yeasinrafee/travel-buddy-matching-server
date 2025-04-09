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
    // create User
    const registeredUserData = await transactionClient.user.create({
      data: user,
    });

    // Create UserProfile
    userProfile.userId = registeredUserData.id;
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
