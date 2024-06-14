export default defineEventHandler(async (event) => {
  const projects = await prisma.project.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      ...(!event.context.user && { published: true }),
    },
  });
  return projects;
});
