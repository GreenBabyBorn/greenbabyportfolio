import path from "path";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const body = await readBody(event);
  console.log(typeof body.img);
  if (typeof body.img === "object") {
    await storeFileLocally(
      body.img[0],
      path.basename(body.img[0].name, path.extname(body.img[0].name)),
      "/assets/"
    );
  }

  const post = await prisma.post.update({
    where: {
      slug: event.context.params!.slug,
    },
    data: {
      ...body,
      ...(typeof body.img === "object" && {
        img: "/assets/" + body.img[0].name,
      }),
      ...(typeof body.img === "string" && {
        img: body.img,
      }),
    },
  });
  return post;
});
