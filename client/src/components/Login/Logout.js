import  React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { withRouter } from 'react-router'



class Logout extends Component { 

  state = { 
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.props.history.push('/')
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="one-logout-container flex flex-center">
        <Button type="primary" onClick={this.showModal}>
          로그아웃
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          로그아웃 하시겠습니까?
        </Modal>
      </div>
    );
  }
}
export default withRouter(Logout)