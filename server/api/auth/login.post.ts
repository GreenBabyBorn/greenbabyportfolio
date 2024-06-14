import { Argon2id } from "oslo/password";

export default eventHandler(async (event) => {
  const formData = await readBody(event);
  const username = formData.username;
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      message: "Invalid username",
      statusCode: 400,
    });
  }
  const password = formData.password;
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: "Invalid password",
      statusCode: 400,
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (!existingUser) {
    throw createError({
      message: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  );
  if (!validPassword) {
    throw createError({
      message: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
