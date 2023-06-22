import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Image from "next/image";

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  href: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  testid?: string
): MenuItem {
  return {
    key,
    href,
    icon,
    children,
    label,
    "data-testid": testid // sets the "data-testid" attribute with the value in the testid parameter
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Chat", "/chat", "1", <PieChartOutlined />, undefined, "chat-tab"),
  getItem(
    "Chatbot",
    "/chat2",
    "2",
    <DesktopOutlined data-testid="chatbot-icon" />,
    undefined,
    "chatbot-tab"
  ),
  getItem("Articles", "/articles", "9", <FileOutlined data-testid="articles-icon" />, [
    getItem("View Articles", "/articles", "10", undefined, undefined, "view-articles-tab"),
    getItem("Create Article", "/articles/new", "11", undefined, undefined, "create-article-tab"),
  ],
  "articles-tab"
  ),

];

const MainLayout: React.FC<{ children: any }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  // Keep track of the selected item menu
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([
    router.pathname,
  ]);

  const handleMenuClick = (event: any) => {
    const { key } = event;
    setSelectedKeys([key]);
    router.push(key);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0, backgroundColor: "#1976D2" }}>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
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
