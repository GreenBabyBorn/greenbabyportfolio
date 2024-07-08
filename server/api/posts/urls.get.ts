export default defineEventHandler(async (event) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      ...(!event.context.user && { published: true }),
    },
  });
  return posts.map(i=>{
    return { loc: '/blog/' + i.slug, lastmod: i.updatedAt }
  });
});
