export default defineEventHandler(async (event) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      ...(!event.context.user && { published: true }),
    },
  });
  return posts;
});
