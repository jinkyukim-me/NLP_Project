import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom'

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

  onChange(event) {
    
  }

  render() {

    return (
      <div className="one-selected-review">
        <div className="one-selected-date-emo-wrapper flex">
          <p className="one-selected-date flex"
            // type="date"           
          >
          일기 쓴 날짜가 보여질 예정입니다.          
          </p>
          <div className="one-selected-emotion flex" type="input">
            감정
          </div>
        </div>
        <p className="one-selected-textarea"> 
          쓴 글이 불려질 예정입니다.
        </p>
      
        <div className="one-selected-btnContainer flex">
          <Button type="dashed" onClick={this.showModal} onChange={this.onChange} className="btn btn-delete">삭제</Button>
            <Modal title="Basic Modal" visible={this.state.visible} okType= 'danger' onOk={this.handleOk} onCancel={this.handleCancel} >
              <p>정말 삭제하시겠습니까?</p>
            </Modal>
          <Button type="primary" className="btn btn-submit" >
            <Link to="/post">목록으로</Link> 
          </Button>           
        </div>
      </div>
    )
  }
}
export default Review
          