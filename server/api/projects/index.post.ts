import path from "path";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const body = await readBody(event);
  // console.log(body.img[0]);
  await storeFileLocally(
    body.img[0],
    path.basename(body.img[0].name, path.extname(body.img[0].name)),
    "/assets/"
  );

  const project = await prisma.project.create({
    data: {
      title: body.title,
      content: body.content,
      git: body.git,
      link: body.link,
      slug: body.slug,
      img: "/assets/" + body.img[0].name,
    },
  });
  return project;
});
