export default {
  async activity(ctx) {
    ctx.body = await strapi.service("api::report.report").activity();
  },

  async body(ctx) {
    ctx.body = await strapi.service("api::report.report").body();
  },

  async goal(ctx) {
    ctx.body = await strapi.service("api::report.report").goal();
  },

  async consistency(ctx) {
    ctx.body = await strapi.service("api::report.report").consistency();
  },

  // 🔥 ADD THIS (MISSING PART)
  async exportCSV(ctx) {
    ctx.body = await strapi.service("api::report.report").exportCSV();
  },
};
