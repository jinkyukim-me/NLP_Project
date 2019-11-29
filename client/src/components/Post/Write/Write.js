import React, { Component } from 'react';
// import './index.css';
import { Input, Button, Modal } from 'antd';
import LiveClock from './LiveClock'
import Emotion from './Emotion'
import axios from 'axios';
import { Link } from 'react-router-dom'

const { TextArea } = Input;

class Write extends Component {
  state = {
    value: '',
    affectivity: '',
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
    
    axios.post('http://localhost:9000/post/write', {
      paragraph: this.state.value,
      affectivity: this.state.affectivity,
    })
    .then((response) => {
      console.log('send text successfully');
    })
    .catch((error) => {
      console.error(error);
    });
  };

  handleCancel = e => {
    const { date } = this.props.location.state;
    console.log(e);
    this.setState({
      visible: false,
    });
    console.log(date);
  };
  
  emotionChange = e => {
    this.setState({
      affectivity: e.target.value,
    });
  }

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
        <TextArea placeholder="...그래서 오늘은 어땠어?" className="one-textarea" onChange={this.onChange} />
        <div className="one-post-btn-container flex">
          <Emotion onChangeEmotion={this.emotionChange} />
          <Button type="primary" onClick={this.showModal} className="btn btn-submit">저장</Button>
          <Modal title="글이 완성되었습니다." visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
{/* 저장 modal ok 후 작성된 글 보는 페이지로 이동하는 부분 수정 미완성 */}
            저장하시겠습니까?
          </Modal>
        </div>
      </div>
    )
  }
}
export default Write