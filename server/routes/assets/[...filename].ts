import path from "path";
import fs from "fs";

export default defineEventHandler(async (event) => {
  const file = path.resolve(
    (process.env.MOUNT as string) + "/assets/",
    decodeURI(event.context.params!.filename)
  );
  try {
    return await sendStream(event, fs.createReadStream(file));
  } catch (e) {
    return createError({
      statusCode: 404,
    });
  }
});
