import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

// create post service
const createPostService = async (payload: Prisma.PostCreateInput) => {
  const result = await prisma.post.create({
    data: payload,
  });
  return result;
};

// get all posts service
const getAllPostsService = async ({
  page,
  limit,
  search,
  isFeatured,
  tags,
}: {
  page: number;
  limit: number;
  search: string;
  isFeatured?: boolean;
  tags?: string[];
}) => {
  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      // only add search filter if search query is provided
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      // only add isFeatured filter if it's explicitly provided (true or false)
      typeof isFeatured === "boolean" && {
        isFeatured,
      },
      // only add tags filter if tags array is provided and not empty
      tags &&
        tags.length > 0 && {
          tags: {
            hasEvery: tags,
          },
        },
    ].filter(Boolean),
  };

  const posts = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.post.count({ where });

  return {
    data: posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// find post by id service
const findPostByIdService = async (id: number) => {
  const result = await prisma.$transaction(async (tnx) => {
    // increment views by 1
    await tnx.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    // fetch the post after incrementing views to return the updated post data
    const postData = await tnx.post.findUnique({
      where: {
        id,
      },
    });

    return postData;
  });
  return result;
};

// delete post by id service
const deletePostByIdService = async (id: number) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

// update post by id service
const updatePostByIdService = async (
  id: number,
  payload: Prisma.PostUpdateInput,
) => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
// get statistics service

const getStatisticsService = async () => {
  try {
    return await prisma.$transaction(async (tnx) => {
      const aggregate = await tnx.post.aggregate({
        _count: true,
        _sum: {
          views: true,
        },
        _avg: {
          views: true,
        },
        _min: {
          views: true,
        },
        _max: {
          views: true,
        },
      });
      const featuredCount = await prisma.post.count({
        where: {
          isFeatured: true,
        },
      });

      const topFeaturedPosts = await prisma.post.findFirst({
        where: {
          isFeatured: true,
        }
      })

      return {
       stats: {
          totalPosts: aggregate._count,
          totalViews: aggregate._sum.views || 0,
          averageViews: aggregate._avg.views || 0,
          minViews: aggregate._min.views || 0,
          maxViews: aggregate._max.views || 0,
          featuredPosts: featuredCount,
          topFeaturedPosts
       }
      };
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw new Error("Failed to fetch statistics");
  }
};

export const postService = {
  createPostService,
  getAllPostsService,
  findPostByIdService,
  deletePostByIdService,
  updatePostByIdService,
  getStatisticsService,
};
