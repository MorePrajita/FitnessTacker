// server/src/plugins/master-export/server/src/controllers/report.ts
import type { Context } from "koa";

export default {
  async export(ctx: Context) {
    const csv = await strapi.plugin("master-export").service("report").exportData();
    ctx.set("Content-Type", "text/csv");
    ctx.set("Content-Disposition", 'attachment; filename="master-export.csv"');
    ctx.body = csv;
  },
};