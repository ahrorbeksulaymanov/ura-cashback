import { Button, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./style.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const SiderDemo = ({children}:any) => {
    const history = useNavigate()
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const logOut = () => {
      localStorage.clear();
      history("/login")
  }
  return (
    <Layout style={{minHeight:"100vh"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin">
              Userlar
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/test-page">
              test
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        <div style={{display:"inline-block", float:"right", marginRight:"50px"}}>
            <Button onClick={logOut}>Log Out</Button>
        </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
            { children }
        </Content>
      </Layout>
    </Layout>
  );
};

export default SiderDemo;
