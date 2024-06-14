export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const body = await readBody(event);
  const project = await prisma.project.update({
    where: {
      slug: event.context.params!.slug,
    },
    data: {
      ...body,
    },
  });
  return project;
});
