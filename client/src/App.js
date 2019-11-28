import React, { Component, Fragment } from 'react'
import './App.scss'
import Home from './components/Home/Home'
import HeaderLayout from './components/HeaderLayout'
import Write from './components/Post/Write/Write'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import NormalLoginForm from './components/Login/Login'
import { Modal, Layout, Menu, Icon, DatePicker } from 'antd'
import PostList from './components/Post/PostList/PostList'
import NotFound from './components/NotFound'
import Settings from './components/Settings'
import SignUp from './components/Login/SignUp'
import Unsubscribe from './components/Login/Unsubscribe'
import Review from './components/Post/Write/Review'
import axios from 'axios'


const { Sider, Content, Footer } = Layout
const { SubMenu } = Menu
const { MonthPicker } = DatePicker;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      visible: false,
    }
    // this.onChange = this.onChange.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
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
  // onChange(event)  {
  //   this.setState({      
  //    })
  // }
  

  showModal = () => {
    this.setState({
      visible: true,
    });     
  };
  
  handleOk = e => {
    console.log(e);
    this.props.history.push('/')
    this.setState({
      visible: false,
    });
  };
  

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  render () {
    return (
      <Fragment>  
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
                      onChange={this.pickedMonth}
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
                      onChange={this.pickedDate}
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
              <Menu.Item key="5"
                className="one-logout"
                onClick={this.showModal}
                >               
                  <Icon type="logout" />
                  <span className="nav-text">로그아웃</span>
                  <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    로그아웃 하시겠습니까?
                  </Modal>   {/* 로그아웃 클릭시 로그인 버튼으로 전환 및 연동 부분 추가 */}                 
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="one-main">
            <HeaderLayout />       
            <Content className="Content-section-layout one-content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/post/write" component={Write} />
                <Route path="/post/:view" component={Review} />
                <Route path="/post" component={PostList} />           
                <Route path="/login" component={NormalLoginForm} />
                <Route path="/setting" component={Settings} />
                <Route path="/signup" component={SignUp} />
                <Route path="/unsubscribe" component={Unsubscribe} />              
                {/* 읽기 기능 구현 후 추가 예정
                <Route path="/post/:year/:month/:day" component={Post} />
                <Route path="/post/:year/:month" component={} />
                <Route path="/post/:year" component={} /> */}
                <Route component={NotFound} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    </Fragment>     
    )          
  };
};
export default withRouter(App);