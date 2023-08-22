"use server";
import { Thread } from "@/lib/types/thread";
import prisma from "../utils/prisma";
import { revalidatePath } from "next/cache";
import { notification } from "../types/comment";
import { User } from "@prisma/client";

export async function getThreads() {
  try {
    const threads = await prisma.thread.findMany({
      where: {
        OR: [
          { isRepost: true },
          { AND: [{ isRepost: false }, { parentId: null }] },
        ],
      },
      include: {
        author: true,
        parent: {
          include: {
            author: true,
            community: true,
            likedBy: true,
          },
        },
        children: {
          include: {
            author: true,
            community: true,
            children: true,
            likedBy: true,
          },
        },
        community: true,
        likedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return threads;
  } catch (error: any) {
    throw new Error(`Failed to get threads: ${error.message}`);
  }
}

export async function getThreadById(id: number) {
  try {
    const thread = await prisma.thread.findUnique({
      where: { id },
      include: {
        author: true,
        community: true,
        likedBy: true,
        children: {
          where: {
            isRepost: false,
          },
          include: {
            author: true,
            community: true,
            likedBy: true,
            children: {
              include: {
                author: true,
                community: true,
                likedBy: true,
                children: true,
              },
              orderBy: {
                createdAt: "desc",
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
        likedBy: true,
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
        likedBy: true,
        children: {
          include: {
            author: true,
            children: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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

export async function updateThread(thread: Thread) {
  try {
    const updatedThread = await prisma.thread.update({
      where: { id: thread.id },
      data: {
        content: thread.content,
        media: String(thread.media),
      },
    });

    return updatedThread;
  } catch (error: any) {
    throw new Error(`Failed to update thread: ${error.message}`);
  }
}

export async function deleteThread(threadId: number) {
  try {
    await prisma.thread.delete({
      where: { id: threadId },
      include: {
        children: {
          include: {
            children: {
              include: {
                children: true,
              },
            },
          },
        },
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}

export async function getNotifications(userId: string) {
  try {
    const threads = await prisma.thread.findMany({
      where: {
        authorId: userId,
        parentId: null,
      },
      include: {
        children: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // construct notifications array of notification objects
    const notifications: notification[] = [];
    threads.map((thread) => {
      const comments = thread.children;
      comments.map((comment) => {
        if (comment.authorId !== userId) {
          notifications.push({
            threadId: thread.id,
            commentId: comment.id,
            commentAuthor: comment.author,
            threadAuthor: thread.authorId,
            commentContent: String(comment.content),
            createdAt: comment.createdAt,
          });
        }
      });
    });

    return notifications;
  } catch (error: any) {
    throw new Error(`Failed to get notifications: ${error.message}`);
  }
}

export async function toggleLike(
  threadId: number,
  userId: string,
  isLiked: boolean
) {
  try {
    if (isLiked) {
      await prisma.thread.update({
        where: { id: threadId },
        data: {
          likedBy: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
    } else {
      await prisma.thread.update({
        where: { id: threadId },
        data: {
          likedBy: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
  } catch (error: any) {
    throw new Error(`Failed to toggle like: ${error.message}`);
  }
}

export async function repostThread(threadId: number, userId: string) {
  try {
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
    });
    if (!thread) {
      throw new Error("Thread not found");
    }

    const repost = await prisma.thread.create({
      data: {
        authorId: userId,
        content: thread.content,
        media: String(thread.media),
        communityId: thread.communityId,
        parentId: threadId,
        isRepost: true,
      },
    });
    return repost;
  } catch (error: any) {
    throw new Error(`Failed to repost thread: ${error.message}`);
  }
}

export async function getSuggestedUsers(userId: string, query: string) {
  try {
    let suggestedAccounts: User[] = [];

    if (query?.trim() === "") {
      suggestedAccounts = await prisma.user.findMany({
        where: {
          id: {
            not: userId,
          },
        },
      });
    } else {
      suggestedAccounts = await prisma.user.findMany({
        where: {
          AND: {
            id: {
              not: userId,
            },
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                username: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      });
    }

    return suggestedAccounts;
  } catch (error: any) {
    throw new Error(`Failed to get suggested accounts: ${error.message}`);
  }
}
