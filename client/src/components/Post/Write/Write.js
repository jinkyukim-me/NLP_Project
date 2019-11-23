import React, { Component } from 'react';
// import './index.css';
import { Input, Button, Modal } from 'antd';
import LiveClock from './LiveClock'
import Emotion from './Emotion'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const { TextArea } = Input;

class Write extends Component {
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
    this.props.history.push('/list')
    this.setState({
      visible: true
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
      <div className="one-post-write">
        <div className="one-liveClock-container">
          <LiveClock />
        </div> 
        <TextArea placeholder="...그래서 오늘은 어땠어?" className="one-textarea" />
        <div className="one-post-btn-container flex">
          <Emotion />
          <Button type="primary" onClick={this.showModal} className="btn btn-submit">저장</Button>
          <Modal title="글이 완성되었습니다." visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
            <Link to='/post/:'>
              저장하시겠습니까?
            </Link>     
          </Modal>       
        </div>
      </div>
    )
  }
}
export default withRouter(Write) 