import prisma from "../prisma";

export const getThreads = async () => {
  return await prisma.thread.findMany({
    include: {
      children: true,
    },
  });
};
