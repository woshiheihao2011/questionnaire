const routes = [
  /*登录*/
  {
    path: '/',
    component: (resolve) => require(['@/views/index.vue'], resolve)
  },
  /*主界面*/
  // {
  //   path: '/index',
  //   component: (resolve) => require(['@/views/main.vue'], resolve)
  // },
  /*组织结构*/
  {
    path: '/organization',
    meta: {
      title: '组织结构管理'
    },
    component: (resolve) => require(['@/views/main.vue'], resolve),
    children: [
      {
        path: '/organization',
        component: (resolve) => require(['@/views/organization_manage/index.vue'], resolve)
      }
    ]
  },
  /*人员管理*/
  {
    path: '/staff',
    meta: {
      title: '人员管理'
    },
    component: (resolve) => require(['@/views/main.vue'], resolve),
    children: [
      {
        path: '/staff',
        component: (resolve) => require(['@/views/staff_manage/index.vue'], resolve)
      }
    ]
  },
  /*项目管理*/
  {
    path: '/project',
    meta: {
      title: '项目管理'
    },
    component: (resolve) => require(['@/views/main.vue'], resolve),
    children: [
      {
        path: '/project',
        component: (resolve) => require(['@/views/project_manage/index.vue'], resolve)
      }
    ]
  },
  /*客户管理*/
  {
    path: '/customer',
    meta: {
      title: '客户管理'
    },
    component: (resolve) => require(['@/views/main.vue'], resolve),
    children: [
      {
        path: '/customer',
        component: (resolve) => require(['@/views/customer_manage/index.vue'], resolve)
      }
    ]
  },
  /*问卷管理*/
  {
    path: '/questionnaire',
    meta: {
      title: '问卷管理'
    },
    component: (resolve) => require(['@/views/main.vue'], resolve),
    children: [
      {
        path: '/questionnaire',
        component: (resolve) => require(['@/views/questionnaire_manage/questionnaire/index.vue'], resolve)
      },
      {
        path: '/questionnaire/publish',
        component: (resolve) => require(['@/views/questionnaire_manage/publish/index.vue'], resolve)
      },
      {
        path: '/questionnaire/monitor',
        component: (resolve) => require(['@/views/questionnaire_manage/monitor/index.vue'], resolve)
      },
      {
        path: '/questionnaire/make/:id',
        component: (resolve) => require(['@/views/questionnaire_manage/questionnaire/make_questionnaire.vue'], resolve)
      }
    ]
  },
  /*兼职团队管理*/
  {
    path: '/parttime',
    meta: {
      title: '兼职团队管理'
    },
    component: (resolve) => require(['@/views/main.vue'], resolve),
    children: [
      {
        path: '/parttime',
        component: (resolve) => require(['@/views/parttime_management/index.vue'], resolve)
      }
    ]
  },
  /*我的任务*/
  {
    path: '/mytask',
    meta: {
      title: '我的任务'
    },
    component: (resolve) => require(['@/views/main.vue'], resolve),
    children: [
      {
        path: '/mytask',
        component: (resolve) => require(['@/views/my_task_manage/index.vue'], resolve)
      }
    ]
  }
]

export default routes
