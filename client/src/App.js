import React, { Component } from 'react'
import './App.scss'
import Home from './components/Home/Home'
import HeaderLayout from './components/HeaderLayout'
import Write from './components/Post/Write/Write'
import { Route, Switch, Link } from 'react-router-dom'
import NormalLoginForm from './components/Login/Login'
import { Button, Layout, Menu, Icon, DatePicker } from 'antd'
import PostList from './components/Post/PostList/PostList'
import NotFound from './components/NotFound'
import Settings from './components/Settings'
import SingUp from './components/Login/SignUp'
import Unsubscribe from './components/Login/Unsubscribe'
import Logout from './components/Login/Logout'
import Review from './components/Post/Write/Review'
import axios from 'axios'


const { Sider, Content, Footer } = Layout
const { SubMenu } = Menu
const { MonthPicker } = DatePicker;

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      date: ""
    }
    this.onChange = this.onChange.bind(this)
  }

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
   
  }

  onChange(event)  {
    this.setState({      
     })
    // console.log(date, dateString)
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
                      value={this.state.value} 
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
                  <Link to="/summary">
                    <DatePicker  
                      value={this.state.date}
                      onChange={this.dateString}
                    />                  
                  </Link> 
                <span className="nav-text"></span>
                </Menu.Item>            
              </SubMenu>              
              <Menu.Item key="4">
                <Link to="/setting">
                  <Icon type="setting" />
                  <span className="nav-text">설정</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/logout">
                  <Icon type="logout" />
                  <span className="nav-text">로그아웃</span>
   {/* 로그아웃 클릭시 로그인 버튼으로 전환 및 연동 부분 추가 */}
                </Link>
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
                <Route path="/post" component={PostList} />
                <Route path="/login" component={NormalLoginForm} />
                <Route path="/setting" component={Settings} />
                <Route path="/signup" component={SingUp} />
                <Route path="/unsubscribe" component={Unsubscribe} />
                <Route path="/logout" component={Logout} />
                <Route path="/post/:" component={Review} />
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