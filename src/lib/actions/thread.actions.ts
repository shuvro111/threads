"use server";
import { Thread } from "@/lib/types/thread";
import prisma from "../utils/prisma";
import { revalidatePath } from "next/cache";
import { sqltag } from "@prisma/client/runtime/library";

export async function getThreads() {
  try {
    const threads = await prisma.thread.findMany({
      where: { parentId: null },
      include: {
        author: true,
        children: {
          include: {
            author: true,
            community: true,
            children: true,
          },
        },
        community: true,
      },
    });

    return threads;
  } catch (error: any) {
    throw new Error(`Failed to get threads: ${error.message}`);
  }
}

export async function getThreadWithInfiniteNestedChildren(threadId: number) {
  const sqlQuery = sqltag`
    WITH RECURSIVE ThreadHierarchy AS (
      SELECT * FROM "Thread" WHERE "id" = ${threadId}
      UNION ALL
      SELECT t.* FROM "Thread" t
      JOIN ThreadHierarchy th ON t."parentId" = th."id"
    )
    SELECT * FROM ThreadHierarchy;
  `;

  const result = await prisma.$queryRaw(sqlQuery);

  return result;
}

export async function getThreadById(id: number) {
  try {
    const thread = await prisma.thread.findUnique({
      where: { id },
      include: {
        author: true,
        community: true,
        children: {
          include: {
            author: true,
            community: true,
            children: {
              include: {
                author: true,
                community: true,
                children: true,
              },
            },
          },
        },
      },
    });
    return thread;
  } catch (error: any) {
    throw new Error(`Failed to get thread: ${error.message}`);
  }
}

export async function getThreadsByUserId(userId: string) {
  try {
    const threads = await prisma.thread.findMany({
      where: { authorId: userId, parentId: null },
      include: {
        author: true,
        children: {
          include: {
            author: true,
            children: true,
          },
        },
      },
    });
    const comments = await prisma.thread.findMany({
      where: { authorId: userId, parentId: { not: null } },
      include: {
        author: true,
        children: {
          include: {
            author: true,
            children: true,
          },
        },
      },
    });
    return { threads, comments };
  } catch (error: any) {
    throw new Error(`Failed to get threads: ${error.message}`);
  }
}

export async function createThread(thread: Thread) {
  try {
    if (thread.communityId) {
      const community = await prisma.community.findUnique({
        where: { id: thread.communityId },
      });
      if (!community) {
        throw new Error("Community not found");
      }
    }
    const newThread = await prisma.thread.create({
      data: {
        authorId: thread.author,
        content: thread.content,
        media: String(thread.media),
        communityId: thread.communityId,
        parentId: null,
      },
    });

    return newThread;
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

export async function addCommentToThread(
  parentThreadId: number,
  thread: Thread
) {
  try {
    const parentThread = await prisma.thread.findUnique({
      where: { id: parentThreadId },
    });
    if (!thread) {
      throw new Error("Thread not found");
    }

    const comment = await prisma.thread.create({
      data: {
        authorId: thread.author,
        content: thread.content,
        media: String(thread.media),
        communityId: thread.communityId,
      },
    });

    const updatedThread = await prisma.thread.update({
      where: { id: parentThreadId },
      data: {
        children: {
          connect: {
            id: comment.id,
          },
        },
      },
    });

    revalidatePath(`/thread/${parentThreadId}`);

    return updatedThread;
  } catch (error: any) {
    throw new Error(`Failed to add comment to thread: ${error.message}`);
  }
}
