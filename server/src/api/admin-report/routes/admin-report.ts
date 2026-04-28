export default {
  routes: [
    {
      method: "GET",
      path: "/admin-reports/export",
      handler: "admin-report.exportCSV",
      config: {
        auth: false,
      },
    },
  ],
};
