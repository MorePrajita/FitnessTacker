export default async (ctx, next) => {
  if (ctx.state.user?.role?.name === "Administrator") {
    return next();
  }

  return ctx.unauthorized("You are not allowed to access this route.");
};