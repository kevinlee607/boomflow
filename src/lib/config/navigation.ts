// src/lib/config/navigation.ts

export const navList = [
  {
    name: "首页",
    href: "/",
  },
  {
    name: "工作台",
    href: "#",
  },
  {
    name: "数据",
    children: [
      {
        name: "数据列表",
        href: "#",
      },
      {
        name: "数据分析",
        href: "#",
      },
      {
        name: "数据可视化",
        href: "#",
      },
    ],
  },
  {
    name: "流程",
    children: [
      {
        name: "流程设计",
        href: "/flow",
      },
      {
        name: "流程列表",
        href: "#",
      },
      {
        name: "流程实例",
        href: "#",
      },
    ],
  },
  {
    name: "系统",
    children: [
      {
        name: "用户管理",
        href: "#",
      },
      {
        name: "角色管理",
        href: "#",
      },
      {
        name: "权限管理",
        href: "#",
      },
    ],
  },
  {
    name: "设置",
    children: [
      {
        name: "个人设置",
        href: "#",
      },
      {
        name: "系统设置",
        href: "#",
      },
    ],
  },
];
