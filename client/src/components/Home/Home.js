import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import { Layout, Menu, Icon, DatePicker } from 'antd';
import './Home.css'
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Home extends Component {
  constructor(props) {
    super(props)
     this.state = {
      collapsed: false,
      text: ""
    }

    this.onChange = this.onChange.bind(this)
    this.flask = this.flask.bind(this)
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  onChange(event) {
    this.setState({
      text: event.target.value
    })
  }
   
  flask(event) {
    axios.post("http://15.164.222.171:8080/summary", {
      text: [this.state.text]
    })
    .then((response) => {
      console.log(response.data)
      alert(response.data.onesentence)
    })
  }
  
  render() {
    return (
      <>  
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
          >
            <div className="logo" />
            <Menu theme="light" mode="inline">
              <Menu.Item key="1">
                <Link to="/write">
                  <Icon type="edit" />
                  <span className="nav-text">쓰기</span>
                </Link>
              </Menu.Item>              
              <SubMenu
                key="Sub1"
                title={
                  <span>
                    <Icon type="read" />
                    <span>읽기</span>
                  </span>
                }
              >
                <Menu.Item key="2">
                  <DatePicker />
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
            <section className="Content-section-layout">
              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
                  <input type="textarea" style={{width: "300"}} value={this.state.text} onChange={this.onChange} />
                  <span>오늘은 어떤 하루였나요?</span><br/>
                  <span>당신의 이야기를 한줄로 정리해드립니다.</span><br/>
                  <span>...1sentence...</span>
               </div>
               <button onClick={this.flask}>저장</button>
              </Content>
            </section>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    </>
    )
  }
}
export default Home