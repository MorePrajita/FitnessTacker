import ExcelJS from "exceljs";

// ✅ Safe username extractor
const getUsername = (attr: any) => {
  if (!attr) return "N/A";

  if (attr.users_permissions_user?.data?.attributes?.username) {
    return attr.users_permissions_user.data.attributes.username;
  }

  if (attr.users_permissions_user?.username) {
    return attr.users_permissions_user.username;
  }

  return "N/A";
};

export default {
  async exportCSV(ctx) {
    try {
      const rows: any[] = [];

      // ===================== ACTIVITY =====================
      try {
        const activity = await strapi.entityService.findMany(
          "api::activity-log.activity-log" as any,
          { populate: "*" as any }
        );

        (activity as any[]).forEach((item: any) => {
          const attr = item?.attributes || item;

          rows.push({
            type: "activity",
            user: getUsername(attr),
            date: attr?.date || "",
            calories: attr?.calories || "",
            activityType: attr?.name || "",
            duration: attr?.duration || "",
            weight: "",
            height: "",
            completed: "",
            streak: "",
            goalName: "",
            target: "",
            current: "",
            status: "",
          });
        });
      } catch (err: any) {
        console.log("Activity error:", err.message);
      }

      // ===================== BODY =====================
      try {
        const body = await strapi.entityService.findMany(
          "api::body-log.body-log" as any,
          { populate: "*" as any }
        );

        (body as any[]).forEach((item: any) => {
          const attr = item?.attributes || item;

          rows.push({
            type: "body",
            user: getUsername(attr),
            date: attr?.date || "",
            calories: "",
            activityType: "",
            duration: "",
            weight: attr?.weight || "",
            height: attr?.height || "",
            completed: "",
            streak: "",
            goalName: "",
            target: "",
            current: "",
            status: "",
          });
        });
      } catch (err: any) {
        console.log("Body error:", err.message);
      }

      // ===================== CONSISTENCY =====================
      try {
        const consistency = await strapi.entityService.findMany(
          "api::consistency-log.consistency-log" as any,
          { populate: "*" as any }
        );

        (consistency as any[]).forEach((item: any) => {
          const attr = item?.attributes || item;

          rows.push({
            type: "consistency",
            user: getUsername(attr),
            date: attr?.date || "",
            calories: "",
            activityType: "",
            duration: "",
            weight: "",
            height: "",
            completed: attr?.completed ?? "",
            streak: attr?.streakCount ?? "",
            goalName: "",
            target: "",
            current: "",
            status: "",
          });
        });
      } catch (err: any) {
        console.log("Consistency error:", err.message);
      }

      // ===================== GOAL =====================
      try {
        const goal = await strapi.entityService.findMany(
          "api::goal-progress.goal-progress" as any,
          { populate: "*" as any }
        );

        (goal as any[]).forEach((item: any) => {
          const attr = item?.attributes || item;

          rows.push({
            type: "goal",
            user: getUsername(attr),
            date: "",
            calories: "",
            activityType: "",
            duration: "",
            weight: "",
            height: "",
            completed: "",
            streak: "",
            goalName: attr?.goalName || "",
            target: attr?.targetValue || "",
            current: attr?.currentValue || "",
            status: attr?.status || "",
          });
        });
      } catch (err: any) {
        console.log("Goal error:", err.message);
      }

      // ===================== EXCEL EXPORT =====================

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Report");

      // Columns (IMPORTANT for filters)
      worksheet.columns = [
        { header: "Type", key: "type" },
        { header: "User", key: "user" },
        { header: "Date", key: "date" },
        { header: "Calories", key: "calories" },
        { header: "Activity", key: "activityType" },
        { header: "Duration", key: "duration" },
        { header: "Weight", key: "weight" },
        { header: "Height", key: "height" },
        { header: "Completed", key: "completed" },
        { header: "Streak", key: "streak" },
        { header: "Goal", key: "goalName" },
        { header: "Target", key: "target" },
        { header: "Current", key: "current" },
        { header: "Status", key: "status" },
      ];

      // Add data
      rows.forEach((row) => {
        worksheet.addRow(row);
      });

      // 🔥 Enable FILTERS (this is what you wanted)
      worksheet.autoFilter = {
        from: "A1",
        to: "N1",
      };

      // Generate file
      const buffer = await workbook.xlsx.writeBuffer();

      // Send file
      ctx.set(
        "Content-Disposition",
        "attachment; filename=report.xlsx"
      );
      ctx.set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      ctx.body = buffer;

    } catch (error) {
      console.error("FINAL ERROR:", error);
      ctx.body = "Error generating Excel";
    }
  },
};
