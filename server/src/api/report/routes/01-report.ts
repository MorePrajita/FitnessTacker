export default {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/reports/activity',
      handler: 'report.activity',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/reports/body',
      handler: 'report.body',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/reports/goal',
      handler: 'report.goal',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/reports/consistency',
      handler: 'report.consistency',
      config: { auth: false },
    },
    {
  method: "GET",
  path: "/reports/export-csv",
  handler: "report.exportCSV",
  config: { auth: false },
}

  ],
};