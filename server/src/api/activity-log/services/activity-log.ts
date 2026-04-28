import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::activity-log.activity-log', ({ strapi }) => ({
  async recalculateSummary(activityLog: any) {
    const userId =
      activityLog?.users_permissions_user?.id ||
      activityLog?.users_permissions_user;

    if (!userId) return;

    const today = new Date().toISOString().split('T')[0];

    const logs = await strapi.documents('api::activity-log.activity-log').findMany({
      filters: {
        createdAt: {
          $contains: today,
        },
        users_permissions_user: userId,
      },
      fields: ['duration', 'calories', 'name'],
      sort: { createdAt: 'asc' },
    });

    const totalDuration = logs.reduce((sum, item) => sum + (item.duration || 0), 0);
    const totalCalories = logs.reduce((sum, item) => sum + (item.calories || 0), 0);
    const totalSteps = 0;

    const existing = await strapi.documents('api::activity-summary.activity-summary').findMany({
      filters: {
        date: today,
        users_permissions_user: userId,
      },
      fields: ['documentId'],
      limit: 1,
    });

    const payload = {
      date: today,
      caloriesBurned: totalCalories,
      duration: totalDuration,
      activityType: 'Workout',
      steps: totalSteps,
      users_permissions_user: userId,
    };

    if (existing.length > 0) {
      await strapi.documents('api::activity-summary.activity-summary').update({
        documentId: existing[0].documentId,
        data: payload,
      });
    } else {
      await strapi.documents('api::activity-summary.activity-summary').create({
        data: payload,
      });
    }
  },
}));