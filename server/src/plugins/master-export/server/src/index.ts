import routes from "./routes";
import controllers from "./controllers/report";
import services from "./services/report";
import policies from "./policies/is-admin";

export default {
  routes,
  controllers,
  services,
  policies,
};