import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd';
import { Link } from 'react-router-dom'
const { Header } = Layout;


class HeaderLayout extends Component {
  render() {
    return (
      <>
        <Header className="one-header" style={{ background: '#fff', padding: 0 }} >
          <div className="one-logo flex flex-center" >
            <Link to="/">
              <span>1sentence</span>
            </Link>
          </div>  
        </Header>
      </>
    );
  }
}

export default HeaderLayout;