const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user', 'login'],
        routes: [
          {
            path: '/',
            redirect: '/transport/list',
          },
          // {
          //   path: '/welcome',
          //   name: 'welcome',
          //   icon: 'smile',
          //   component: './Welcome',
          // },
          {
            path: '/transport/list',
            name: '运输管理',
            icon: 'car',
            component: './Transport',
          },
          {
            path: '/transport/add',
            hideInMenu: true,
            component: './Transport/add',
          },
          {
            path: '/transport/edit/:id',
            hideInMenu: true,
            component: './Transport/edit',
          },
          {
            path: '/company',
            name: '企业',
            icon: 'home',
            routes: [
              {
                path: '/company/handle',
                name: '处置企业',
                // exact: true,
                component: './Company/Handle',
              },
              {
                path: '/company/produce',
                name: '生产企业',
                // exact: true,
                component: './Company/Produce',
              },
            ],
          },
          {
            path: '/setting',
            name: '系统设置',
            icon: 'setting',
            routes: [
              {
                path: '/setting/user',
                name: '成员管理',
                // exact: true,
                component: './Setting/User',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];

export default routes;
