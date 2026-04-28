import { Parser } from "json2csv";

export default {
  /* =========================
     ACTIVITY REPORT
  ========================== */
  async activity() {
    const results = await strapi.entityService.findMany(
      "api::activity-summary.activity-summary",
      {
        sort: [{ date: "asc" }],
      }
    );

    const totals = results.reduce(
      (acc: any, item: any) => {
        acc.steps += item.steps || 0;
        acc.calories += item.caloriesBurned || 0;
        acc.activeMinutes += item.duration || 0;
        return acc;
      },
      { steps: 0, calories: 0, activeMinutes: 0 }
    );

    const count = results.length || 1;
    const latest = results[results.length - 1] || null;

    return {
      totals,
      averages: {
        steps: Math.round(totals.steps / count),
        calories: Math.round(totals.calories / count),
        activeMinutes: Math.round(totals.activeMinutes / count),
      },
      latest,
      trend: results.map((x: any) => ({
        date: x.date,
        steps: x.steps,
        calories: x.caloriesBurned,
        activeMinutes: x.duration,
      })),
    };
  },

  /* =========================
     BODY REPORT (FIXED)
  ========================== */
  async body() {
    const results = await strapi.entityService.findMany(
      "api::body-log.body-log",
      {
        sort: "createdAt:asc"

      }
    );

    const latest = results?.[results.length - 1] || null;

    const bmi =
      latest && latest.weight && latest.height
        ? +((latest.weight / (latest.height * latest.height)) * 10000).toFixed(1)
        : null;

    return {
      latest,
      bmi,
      trend: results.map((x: any) => ({
        date: x.date,
        weight: x.weight,
        height: x.height,
        bmi:
          x.weight && x.height
            ? +((x.weight / (x.height * x.height)) * 10000).toFixed(1)
            : null,
      })),
    };
  },

  /* =========================
     GOAL REPORT
  ========================== */
  async goal() {
    const results = await strapi.entityService.findMany(
      "api::goal-progress.goal-progress",
      {
        sort: [{ date: "asc" }],
      }
    );

    const latest = results?.[results.length - 1] || null;

    return {
      latest,
      trend: results.map((x: any) => ({
        date: x.date,
        goalName: x.goalName,
        currentStatus: x.currentstatus,
        targetValue: x.targetValue,
        currentValue: x.currentValue,
      })),
    };
  },

  /* =========================
     CONSISTENCY REPORT
  ========================== */
  async consistency() {
    const results = await strapi.entityService.findMany(
      "api::consistency-log.consistency-log",
      {
        sort: [{ last_active_date: "asc" }],
      }
    );

    const latest = results?.[results.length - 1] || null;

    return {
      latest,
      trend: results.map((x: any) => ({
        lastActiveDate: x.last_active_date,
        missedDayCount: x.missed_day_count,
        streakCount: x.streakCount,
        completed: x.completed,
      })),
    };
  },

  /* =========================
     CSV EXPORT (FULL FIXED)
  ========================== */
  async exportCSV() {
    const users = (await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        populate: {
          body_logs: true,
          user_profile: true,
        },
      }
    )) as any[];

    const result: any[] = [];

    for (const user of users) {
      const logs = user?.body_logs || [];
      const profile = user?.user_profile;

      logs.sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );

      const first = logs[0];
      const last = logs[logs.length - 1];

      /* ================= WEEKLY CHANGE ================= */
      let weeklyChange = 0;

      if (first && last) {
        weeklyChange =
          Number(first.weight) - Number(last.weight);
      }

      /* ================= BMI ================= */
      const heightM = profile?.height ? profile.height / 100 : 0;

      const bmi =
        heightM && profile?.weight
          ? profile.weight / (heightM * heightM)
          : 0;

      /* ================= CALORIE BALANCE ================= */
      const calorieBalance =
        (user.dailyCalorieIntake || 0) -
        (user.dailyCalorieBurn || 0);

      result.push({
        user: user.username,
        weight: profile?.weight || 0,
        weeklyChange: weeklyChange.toFixed(2),
        bmi: bmi.toFixed(1),
        calorieBalance,
      });
    }

    const parser = new Parser({
      fields: [
        "user",
        "weight",
        "weeklyChange",
        "bmi",
        "calorieBalance",
      ],
    });

    return parser.parse(result);
  },
};
