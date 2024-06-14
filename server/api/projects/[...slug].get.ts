export default defineEventHandler(async (event) => {
  const project = await prisma.project.findFirst({
    where: {
      slug: event.context.params!.slug,
      ...(!event.context.user && { published: true }),
    },
  });
  return project;
});
