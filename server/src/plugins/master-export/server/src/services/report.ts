import { stringify } from "csv-stringify/sync";

type ActivityRow = {
  recordType: string;
  id: number;
  user: string;
  date: string;
  status: string;
  steps: number | string;
  calories: number | string;
  activeMinutes: number | string;
};

export default {
  async exportData() {
    const rows: ActivityRow[] = [];

    const activity = await strapi.entityService.findMany("api::activity.activity", {
      populate: ["user"],
    });

    for (const item of activity as any[]) {
      rows.push({
        recordType: "activity",
        id: item.id,
        user: item.user?.username ?? "",
        date: item.date ?? "",
        status: item.status ?? "",
        steps: item.steps ?? "",
        calories: item.calories ?? "",
        activeMinutes: item.activeMinutes ?? "",
      });
    }

    return stringify(rows, { header: true });
  },
};