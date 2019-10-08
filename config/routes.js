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
            path: '/trash/list',
            name: '废品管理',
            icon: 'rest',
            component: './Trash',
          },
          {
            path: '/trash/add',
            hideInMenu: true,
            component: './Trash/add',
          },
          {
            path: '/company',
            name: '企业管理',
            icon: 'home',
            routes: [
              {
                path: '/company/handle/list',
                name: '处置企业',
                component: './Company/Handle',
              },
              {
                path: '/company/handle/add',
                hideInMenu: true,
                component: './Company/Handle/add',
              },
              {
                path: '/company/handle/edit/:id',
                hideInMenu: true,
                component: './Company/Handle/edit',
              },
              {
                path: '/company/produce/list',
                name: '生产企业',
                component: './Company/Produce',
              },
              {
                path: '/company/produce/add',
                hideInMenu: true,
                component: './Company/Produce/add',
              },
              {
                path: '/company/produce/edit/:id',
                hideInMenu: true,
                component: './Company/Produce/edit',
              },
            ],
          },
          {
            path: '/management',
            name: '系统设置',
            icon: 'setting',
            routes: [
              {
                path: '/management/user/list',
                name: '成员管理',
                component: './Management/User',
              },
              {
                path: '/management/user/add',
                hideInMenu: true,
                component: './Management/User/add',
              },
              {
                path: '/management/user/edit/:id',
                hideInMenu: true,
                component: './Management/User/edit',
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
