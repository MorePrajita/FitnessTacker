// src/policies/is-admin.ts
export default async (ctx, config, { strapi }) => {
  const user = ctx.state.user;
  if (!user) return false;

  const admin = user?.role?.type === "admin";
  return admin;
};