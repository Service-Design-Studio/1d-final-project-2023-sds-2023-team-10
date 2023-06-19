import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Image from "next/image";

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Chat", "1", <PieChartOutlined />),
  getItem("Chatbot", "2", <DesktopOutlined />),
  getItem("Articles", "9", <FileOutlined />, [
    getItem("View Articles", "10"),
    getItem("Create Article", "11"),
  ]),
];

const MainLayout: React.FC<{ children: any }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0, backgroundColor: "#1976D2" }}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="horizontal"
          items={items}
        />
      </Header>
      <Content style={{ margin: "0 16px" }}>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        © Copyright Echolestia 2023.
      </Footer>
    </Layout>
  );
};

export default MainLayout;
