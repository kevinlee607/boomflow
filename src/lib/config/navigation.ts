// src/lib/config/navigation.ts
import { t } from "$lib/translations";
export const navList = [
  {
    name: "nav.index",
    href: "/",
  },
  {
    name: "nav.workBench",
    href: "#",
  },
  {
    name: "nav.data.title",
    children: [
      {
        name: "nav.data.children.list",
        href: "#",
      },
      {
        name: "nav.data.children.analysis",
        href: "#",
      },
      {
        name: "nav.data.children.visualization",
        href: "#",
      },
    ],
  },
  {
    name: "nav.flow.title",
    children: [
      {
        name: "nav.flow.children.design",
        href: "/flow",
      },
      {
        name: "nav.flow.children.list",
        href: "/flow/list",
      },
      {
        name: "nav.flow.children.instance",
        href: "#",
      },
    ],
  },
  {
    name: "nav.system.title",
    children: [
      {
        name: "nav.system.children.userManagement",
        href: "#",
      },
      {
        name: "nav.system.children.roleManagement",
        href: "#",
      },
      {
        name: "nav.system.children.permissionManagement",
        href: "#",
      },
    ],
  },
  {
    name: "nav.settings.title",
    children: [
      {
        name: "nav.settings.children.profile",
        href: "#",
      },
      {
        name: "nav.settings.children.systemSettings",
        href: "#",
      },
    ],
  },
];
