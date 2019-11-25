import React from 'react';
import { Button } from 'antd';

const ModalForm = () => {
  state = { 
    visible: true,
  };

  handleOk() {
    console.log(e);
    this.props.history.push('/')
    this.setState({
      visible: false,
    });
  };

  handleCancel() {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  return (
    <div className="one-modal">
      <div className="content">
        <h3>...</h3>
        <p>궁시렁 궁시렁 내용입니다.</p>
        <Button onClick={this.handleCancel}>취소</Button>
        <Button onClick={this.handleOk}>확인</Button>
      </div>
    </div>
  );
};

export default ModalForm;