export default {
  menuData: [
    {
      id: 1,
      name: '1',
      title: '组织机构管理',
      route_link: '/organization'
    },
    {
      id: 2,
      name: '2',
      title: '人员权限',
      route_link: '/staff'
    },
    // {
    //   id: 3,
    //   name: '3',
    //   title: '员工管理',
    //   route_link: ''
    // },
    {
      id: 15,
      name: '4',
      title: '客户管理',
      route_link: '/customer'
    },
    {
      id: 4,
      name: '5',
      title: '项目管理',
      route_link: '/project'
    },
    {
      id: 5,
      name: '6',
      title: '问卷管理',
      children: [
        {
          id: 6,
          name: '6-1',
          title: '编辑问卷',
          route_link: '/questionnaire'
        },
        {
          id: 7,
          name: '6-2',
          title: '发布问卷',
          route_link: '/questionnaire/publish'
        },
        {
          id: 8,
          name: '6-3',
          title: '答卷可视化监测',
          route_link: '/questionnaire/monitor'
        }
      ]
    },
    {
      id: 9,
      name: '7',
      title: '兼职团队管理',
      route_link: '/parttime'
      // children: [
      //   {
      //     id: 10,
      //     name: '7-1',
      //     title: '兼职团队分析',
      //     route_link: ''
      //   }
      // ]
    },
    {
      id: 11,
      name: '8',
      title: '我的任务',
      children: [
        {
          id: 15,
          name: '8-1',
          title: '我的任务',
          route_link: '/mytask'
        },
        {
          id: 16,
          name: '8-2',
          title: '正在进行的问卷',
          route_link: ''
        },
        {
          id: 17,
          name: '8-3',
          title: '已完成问卷',
          route_link: ''
        }
      ]
    },
    {
      id: 12,
      name: '9',
      title: '兼职端答题页面',
      route_link: ''
    },
    {
      id: 13,
      name: '10',
      title: '帮助中心',
      route_link: ''
    },
    {
      id: 14,
      name: '11',
      title: '分发设置',
      route_link: ''
    }
  ],
  customer: [
    {
      id: 1,
      name: '百度客户',
      department: '',
      contacts: '李广利',
      phone: '13233474068',
      pwd: ''
    }
  ],
  projectType: [
    {
      id: 1,
      name: '产品体检'
    }
  ],
  project: [
    {
      id: 1,
      name: '百度feed流产品体验',
      customerId: '百度客户',
      typeId: 1,
      begin: '', // 立项时间
      end: '', // 截止时间
      contacts: '', // 联系人
      manager: '', // 项目经理，负责人，应该关联员工id
      trainer: '', // 培训专员，应该关联员工id，多个，用逗号分隔
      groupLeader: '', // 小组长，关联员工id，多个用逗号分隔
      sampleSize: '20', // 样本量
      phase: '问卷调研' // 项目阶段
    }
  ],
  organization: [
    {
      id: 1,
      name: '调研部',
      pId: 0
    },
    {
      id: 2,
      name: '调研子部门',
      pId: 1
    }
  ],
  role: [
    {
      id: 1,
      name: '系统管理员',
      enable: 1
    },
    {
      id: 2,
      name: '质量督导员',
      enable: 1
    },
    {
      id: 3,
      name: '问卷编辑员'
    },
    {
      id: 4,
      name: '数据分析员'
    },
    {
      id: 5,
      name: '数据回收员'
    }
  ],
  staff: [
    {
      id: 1,
      name: '员工1',
      roleId: '系统管理员',
      sex: '女', // 1男2女0未知
      phone: '13233474068',
      groupId: 1,
      entryDate: '2019-02-01',
      idNumber: '142329198601010000',
      weChat: '',
      city: ''
    }
  ],
  questionnaireState: [
    {
      id: 1,
      name: '发布中'
    },
    {
      id: 2,
      name: '草稿'
    },
    {
      id: 3,
      name: '暂停'
    }
  ],
  questionnaire: [
    {
      id: 1,
      name: '百度feed流产品调查',
      projectId: '百度客户/百度feed流产品体验',
      stateId: '发布中',
      creater: '管理员',
      createTime: '2019-01-13',
      price: '100',
      sampleSize: '30', // 样本数
      answerNum: '10', // 答卷数
      sendOrReceive: '13', // 已发送/已接受
      finishRate: '90%' // 完成比例
    }
  ],
  set: {
    removeTime: 120,
    urgeTime: 60,
    isAutofilter: '1',
    isScreencap: '1'
  },
  parttime: [
  ]
}
