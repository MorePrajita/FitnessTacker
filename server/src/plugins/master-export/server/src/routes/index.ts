export default {
  type: "admin",
  prefix: "/admin-reports",
  routes: [
    {
      method: "GET",
      path: "/export",
      handler: "report.export",
      config: {
        auth: false,
        policies: ["plugin::master-export.is-admin"],
      },
    },
  ],
  controller: "report",
};