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
          <Link to="/">
          <div className="one-logo" style={{ fontSize: "XX-large", textAlign: 'center', color: "#000" }}><span>1sentence</span></div>
          </Link>
        </Header>
      </>
    );
  }
}

export default HeaderLayout;