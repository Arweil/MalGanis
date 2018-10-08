import React, { Component } from 'react';
import { LocaleProvider, Layout, Menu, Breadcrumb, Icon } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'antd/dist/antd.css';
import { Link } from '../../../dist/GalGanis.js';

import app from '@/layout/App.less';

import { hot } from 'react-hot-loader';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MVCLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }

    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  render() {
    const { children } = this.props;

    return (
      <LocaleProvider locale={zhCN}>
        <Layout id="app" style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo">
              <h1 className="link-title">ABC</h1>
            </div>
            <Menu theme="dark" mode="inline">
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span>Menu</span></span>}
              >
                <Menu.Item key="1">
                  <Link to="/PageA">PageA</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/PageB">PageB</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/PageC">PageC</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/Main">Main</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <div className="content-scroll">
              <div className="main">
                <Content>{children}</Content>
              </div>
            </div>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}

export default hot(module)(MVCLayout);
