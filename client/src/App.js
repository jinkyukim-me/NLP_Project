import React, { Component } from 'react'
import './App.scss'
import Home from './components/Home/Home'
import HeaderLayout from './components/HeaderLayout'
import Write from './components/Post/Write/Write'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
// import { withRouter } from 'react-router';
import NormalLoginForm from './components/Login/Login'
import { Button, Layout, Menu, Icon, DatePicker, Modal } from 'antd'
import PostList from './components/Post/PostList/PostList'
import NotFound from './components/NotFound'
import Settings from './components/Settings'
import SingUp from './components/Login/SignUp'
import Unsubscribe from './components/Login/Unsubscribe'
// import Logout from './components/Login/Logout'
import Read from './components/Read/Read';
import PostsList from './components/List';

import Review from './components/Post/Write/Review'
import axios from 'axios'


const { Sider, Content, Footer } = Layout
const { SubMenu } = Menu
const { MonthPicker } = DatePicker;

class App extends Component {
  state = {
    collapsed: false,
    date: "",
    // postDate: 0,
    visible: false,
  }

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  
  pickedDate = (date, dateString) => {
    dateString = Number(dateString.replace(/-/g, ''));
    
    this.props.history.push({
      pathname: '/post/write',
      state: {date: dateString}
    });
  }
  
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: true,
    });
  };
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // onChange(event)  {
  //   this.setState({      
  //    })
  //   // console.log(date, dateString)
  // }

  render () {
    return (
      <>  
      {/* Sider, Header, Footer는 모든 화면에 보여진다.  */}
        <Layout>          
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken)
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type)
            }}
            className="one-sidebar"
          >
            {/* <div className="logo" /> */}
            <Menu theme="light" mode="inline" className="one-nav">
              <Menu.Item key="1">
                <Link to="/post/write">
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
                    <MonthPicker 
                      onChange={this.onChange}
                      // value={this.state.value} 
                      placeholder="Select month" />                  
                  </Link> 
                <span className="nav-text"></span>
                </Menu.Item>            
              </SubMenu>              
              <SubMenu
                key="Sub2"
                title={
                  <span>                    
                    <Icon type="edit" />
                    <span>요약</span>
                  </span>                 
                }
              >              
                <Menu.Item key="3">
                  <DatePicker  
                    // value={this.state.date}
                    onChange={this.pickedDate}
                  />
                <span className="nav-text"></span>
                </Menu.Item>            
              </SubMenu>    
              {/* <Menu.Item key="4">
                <Link to="/list">
                  <Icon type="unordered-list" />
                  <span className="nav-text">글 목록</span>
                </Link>
              </Menu.Item>           */}
              <Menu.Item key="4">
                <Link to="/auth/setting">
                  <Icon type="setting" />
                  <span className="nav-text">설정</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5" onClick={this.showModal}>
                <Icon type="logout" />
                <span className="nav-text">로그아웃</span>
                <Modal
                  title="Basic Modal"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                로그아웃 하시겠습니까?
                </Modal>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="one-main">
            <HeaderLayout />       
            <Content className="Content-section-layout one-content">
              {/* <div style={{ padding: 24, background: '#fff', minHeight: 600 }}> */}
                {/* content 영역만 switch 되며 화면에 보여진다.                 */}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/post/write" component={Write} />
                <Route path="/auth/login" component={NormalLoginForm} />
                <Route path="/auth/setting" component={Settings} />
                <Route path="/auth/signup" component={SingUp} />
                <Route path="/unsubscribe" component={Unsubscribe} />
                {/* <Route path="/logout" component={Logout} /> */}
                <Route path="/list" component={PostsList} />
                <Route path={`/post/:view`} component={Read} />
                {/* <Route path="/post/:" component={Review} /> */}
{/* 글 저장 후 보여질 페이지의 경로를 확인해주세요. '/post/:숫자'로 하기로 했던 것 같은데...ㅎ */}
                {/* 읽기 기능 구현 후 추가 예정
                <Route path="/post/:year/:month/:day" component={Post} />
                <Route path="/post/:year/:month" component={} />
                <Route path="/post/:year" component={} /> */}
                <Route component={NotFound} />
              </Switch>
                {/* </div> */}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    </>     
    )          
  }
}

export default withRouter(App);