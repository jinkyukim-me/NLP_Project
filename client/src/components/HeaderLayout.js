import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd';
const { Header } = Layout;


class HeaderLayout extends Component {
  render() {
    return (
      <Header className="one-header">
        <div style={{ fontSize: "XX-large", textAlign: 'center'}}>1sentence </div>
      </Header>
    );
  }
}

export default HeaderLayout;