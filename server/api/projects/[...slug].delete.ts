export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const project = await prisma.project.delete({
    where: {
      slug: event.context.params!.slug,
    },
  });
  return project;
});
