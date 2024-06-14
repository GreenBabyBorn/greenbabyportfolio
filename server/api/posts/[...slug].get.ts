export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const post = await prisma.post.findFirst({
    where: {
      slug: event.context.params!.slug,
      ...(!event.context.user && { published: true }),
    },
  });
  return post;
});
