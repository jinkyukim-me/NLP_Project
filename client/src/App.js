import React, { Component } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'; 
import './App.css';
import HeaderLayout from './components/HeaderLayout'
import Home from './components/Home/Home'
import Write from './components/Write/Write';
import Settings from './components/Settings';
import SingUp from './components/SignUp';
import PostsList from './components/List';
import unsubscribe from './components/Unsubscribe';
import { Route, Switch, Link } from 'react-router-dom'
import NormalLoginForm from './components/NormalLoginForm/Login';
import Read from './components/Read/Read';
import NotFound from './components/NotFound';
import { Button, Layout, Menu, Icon, DatePicker } from 'antd';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default class App extends Component {
  state = {
    collapsed: false,
    text: "",
    postDate: 0,
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  
  pickedDate = (date, dateString) => {
    dateString = Number(dateString.replace(/-/g, ''));
    
    this.setState({
      postDate: dateString,
    }, () => {
      window.location.assign(`/post/${this.state.postDate}`);
    });
  }

  // onChange(event) {
  //   this.setState({
  //     text: event.target.value
  //   })
  // }
   
  // flask(event) {
  //   axios.post("http://15.164.222.171:8080/summary", {
  //     text: [this.state.text]
  //   })
  //   .then((response) => {
  //     console.log(response.data)
  //     alert(response.data.onesentence)
  //   })
  // }
  
  render () {
    return (
      <>
        <Layout>
          
          <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }} className="one-sidebar" >
            <div className="logo" />
            <Menu theme="light" mode="inline" className="one-nav">
              <Menu.Item key="1">
                <Link to="/post/write">
                  <Icon type="edit" />
                  <span className="nav-text">쓰기</span>
                </Link>
              </Menu.Item>
              <SubMenu key="Sub1" title={ <span> <Icon type="read" /> <span>읽기</span> </span> } >
                <Menu.Item key="2">
                  <DatePicker onChange={this.pickedDate} />
                <span className="nav-text"></span>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="3">
                <Link to="">
                  <Icon type="search" />
                  <span className="nav-text">찾기</span>
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
              <Menu.Item key="6">
                <Link to="/list">
                  <Icon type="unordered-list" />
                  <span className="nav-text">글 목록</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          
          <Layout className="one-main">
            <HeaderLayout />
            
            <Content className="Content-section-layout one-content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/post/write" component={Write} />
                {/* <Route path="/read" component={Read} /> */}
                <Route path="/login" component={NormalLoginForm} />
                <Route path="/setting" component={Settings} />
                <Route path="/signup" component={SingUp} />
                <Route path="/unsubscribe" component={unsubscribe} />
                <Route path="/list" component={PostsList} />
                <Route path={`/post/${this.state.postDate}`} component={Read} postDate={this.state.postDate} />
                <Route component={NotFound} />
              </Switch>
            </Content>
              
            <Footer style={{ textAlign: 'center' }} className="footer">Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </>
    )          
  }
}