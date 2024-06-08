export default defineNuxtRouteMiddleware((to) => {
  // console.log(to.matched);
  if (to.matched.length === 0) {
    return createError({
      statusCode: 404,
      statusMessage: "Page not found",
      message: "Страница не найдена",
    });
  }
});
