import React, { Component } from 'react'
import 'antd/dist/antd.css'; 
import './App.css';
import Home from './components/Home/Home'
import Write from './components/Write/Write';
import { Route, Switch, Link } from 'react-router-dom'
import NormalLoginForm from './components/Login/Login';
import { Layout, Menu, Icon, DatePicker } from 'antd'
import Post from './components/Post/Post';
import NotFound from './components/NotFound'
// import axios from 'axios'

const { Sider, Header, Content, Footer } = Layout
const { SubMenu } = Menu

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render () {
    return (
      <>  
      {/* Sider, Header, Footer는 모든 화면에 보여진다.  */}
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            className="one-sidebar"
          >
            <div className="logo" />
            <Menu theme="light" mode="inline" className="one-nav">
              <Menu.Item key="1">
                <Link to="/write">
                  <Icon type="form" />
                  <span className="nav-text">글쓰기</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="Sub1"
                title={
                  <span>                    
                    <Icon type="read" />
                    <span>본문</span>
                  </span>                 
                }
              >              
                <Menu.Item key="2">
                  <Link to="/post">
                    <DatePicker />
                  </Link> 
                <span className="nav-text"></span>
                </Menu.Item>            
              </SubMenu>              
              <Menu.Item key="3">
                <Link to="/summary">
                  <Icon type="edit" />
                  <span className="nav-text">요약</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/setting">
                  <Icon type="setting" />
                  <span className="nav-text">설정</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/login">
                  <Icon type="login" />
                  <span className="nav-text">로그인</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} >
              <div style={{ fontSize: "XX-large", textAlign: 'center'}}>1sentence </div>
            </Header>           
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
                {/* content 영역만 switch 되며 화면에 보여진다.                 */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/write" component={Write} />
              <Route path="/post" component={Post} />
              <Route path="/login" component={NormalLoginForm} />
              {/* 읽기 기능 구현 후 추가 예정
              <Route path="/post/:year/:month/:day" component={Post} />
              <Route path="/post/:year/:month" component={} />
              <Route path="/post/:year" component={} /> */}
              <Route component={NotFound} />
              </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    </>     
    )          
  }
}