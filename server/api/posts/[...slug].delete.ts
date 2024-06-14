export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const post = await prisma.post.delete({
    where: {
      slug: event.context.params!.slug,
    },
  });
  return post;
});
