"use client";

import { Divider, Layout, Menu, MenuProps, theme } from "antd";
import Image from "next/image";
import React from "react";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { LuCircleHelp } from "react-icons/lu";
import { MdOutlinePeopleAlt } from "react-icons/md";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/dashboard",
    icon: <BsFillGrid3X2GapFill />,
    label: "Dashboard",
  },
  {
    key: "/supplier#",
    icon: <MdOutlinePeopleAlt />,
    label: "Supplier Management",
    children: [
      { key: "/supplier", label: "Dashboard" },
      { key: "/supplier/list", label: "Supplier List" },
      { key: "/supplier/approvals", label: "Review & Approval" },
      { key: "/supplier/config", label: "Configuration" },
    ],
  },
  {
    key: "/funnel#",
    icon: <FiExternalLink />,
    label: "Funnel Management",
    children: [{ key: "/funnel", label: "Dashboard" }],
  },
];

const footerMenu: MenuItem[] = [
  {
    key: "/help",
    icon: <LuCircleHelp />,
    label: "Help & Support",
  },
  {
    key: "/profile#",
    icon: <FaRegCircleUser />,
    label: "Jhon Doe",
    className: "[&>div]:text-destructive",
    children: [
      { key: "/profile", label: "Profile" },
      { key: "/logout", label: "Logout", danger: true },
    ],
  },
];

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className="scrollbar-thin scrollbar-stable sticky top-0 bottom-0 left-0 h-screen overflow-auto p-0"
      >
        <div className="flex h-full flex-col">
          <div className="px-6 pt-3 pb-1">
            <Image src="/logo.png" alt="Alisa Logo" width={95} height={43} />
          </div>
          <Divider className="m-0 border border-solid" />
          <div className="flex-1">
            <Menu
              mode="inline"
              defaultOpenKeys={["/supplier#"]}
              defaultSelectedKeys={["/supplier/list"]}
              className="border-none"
              items={items}
            />
          </div>
          <Divider className="m-0 border border-solid" />
          <Menu mode="vertical" className="border-none" items={footerMenu} />
        </div>
      </Sider>
      <Layout>
        <Content className="x-4 mb-0">
          <div
            className="min-h-[360px]"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
