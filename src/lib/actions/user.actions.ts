"use server";
import prisma from "@/lib/utils/prisma";
import { User } from "@/lib/types/user";
import { revalidatePath } from "next/cache";

/* Get All Users */
export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({});
    return users;
  } catch (error: any) {
    throw new Error(`Failed to get users: ${error.message}`);
  }
}

/* Get User */
export async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        threads: {
          include: {
            children: true,
          },
        },
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

/* Update User */
export async function updateUser(user: User, path: string): Promise<void> {
  try {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        onboardingStatus: true,
      },
      create: {
        ...user,
      },
    });

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
