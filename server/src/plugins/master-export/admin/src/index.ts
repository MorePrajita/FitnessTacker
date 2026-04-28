import PluginIcon from "./icons/PluginIcon";

export default {
  register(app) {
    app.addMenuLink({
      to: "/plugins/master-export",
      icon: PluginIcon,
      intlLabel: {
        id: "master-export.plugin.name",
        defaultMessage: "Master Export",
      },
      Component: async () => {
        const { App } = await import("./pages/App");
        return App;
      },
      permissions: [],
      position: 30,
      licenseOnly: false,
    });

    app.registerPlugin({
      id: "master-export",
      name: "Master Export",
    });
  },
};