import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd';
const { Header } = Layout;


class HeaderLayout extends Component {
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }} >
        <div style={{ fontSize: "XX-large", textAlign: 'center'}}>1sentence </div>
      </Header>
    );
  }
}

export default HeaderLayout;