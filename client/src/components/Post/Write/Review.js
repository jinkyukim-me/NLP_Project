import React, { Component } from 'react';
import { Input, Button, Icon, Modal } from 'antd';
import { Link } from 'react-router-dom'

const { TextArea } = Input;

class Review extends Component {
  state = {
    value: '',
    visible: false,
  };
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
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

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="one-selected-review">
        <TextArea className="one-selected-textarea" />
          <span>쓴 글이 저장되어 보여지도록 불러온다. </span>
        <div className="one-selected-emotion">
          선택한 emotion아이콘이 보여지도록 불러온다.
        </div>
        <div>
          <Button type="primary" onClick={this.showModal} className="btn btn-delete">삭제</Button>
            <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
                <p>정말 삭제하시겠습니까?</p>
            </Modal>
          <Button type="primary" className="btn btn-submit" onClick={this.state}>
            <Link to="/post">목록으로</Link> 
          </Button>           
        </div>
      </div>
    )
  }
}
export default Review
          