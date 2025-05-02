import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'models',
        children: [
          {
            path: '',
            component: () => import('pages/ModelListPage.vue')
          },
          {
            path: ':modelName',
            children: [
              {
                path: 'cnn',
                component: () => import('pages/ClassifyCnnImage.vue'),
              },
              {
                path: 'rgb',
                component: () => import('pages/ClassifyRgbImage.vue'),
              }
            ]
          }
        ]
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
