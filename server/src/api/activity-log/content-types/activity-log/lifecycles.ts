export default {
  async afterCreate(event: any) {
    await strapi.service('api::activity-log.activity-log').recalculateSummary(event.result);
  },
};