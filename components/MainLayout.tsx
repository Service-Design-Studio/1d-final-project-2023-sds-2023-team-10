import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Image from 'next/image';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

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
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

const MainLayout: React.FC<{ children: any }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            background: 'rgba(255, 255, 255, 1)',
          }}
          className="flex justify-center items-center"
        >
          {!collapsed ? (
            <Image
              src="/echolestia horizontal.png"
              alt="Tetrix logo"
              width="100"
              height="40"
            ></Image>
          ) : (
            <Image
              src="/echolestia.png"
              alt="Tetrix logo"
              width="125"
              height="70"
            />
          )}
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, backgroundColor: '#1976D2' }}>
          {/* <div
            className="rounded-xl my-1 mx-2"
            style={{
              justifySelf: 'flex-start',
              width: '20%',
              background: 'white',
              height: '80%',
              maxWidth: '160px',
            }}
          >
           <Image
              src="/Tetrix-White-Logo.png"
              alt="Tetrix logo"
              width="160"
              height="50"
            ></Image> 
          </div> */}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          © Copyright Echolestia 2023.
        </Footer>
      </Layout>
    </Layout>

    // MainLayout code
  );
};

export default MainLayout;
