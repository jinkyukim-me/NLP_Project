import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { Input, Button, Modal } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

class Write extends React.Component {
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
    const paragraph = e.target.value;
    
    console.log(e);
    this.setState({
      visible: false,
    });
    
    axios.post('/post/write', {
      paragraph: paragraph,
    })
    .then((response) => {
      console.log('send text successfully');
    })
    .catch((error) => {
      console.error(error);
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
        <TextArea placeholder="...그래서 오늘은 어땠어?" className="one-textarea" />
        <Button type="primary" onClick={this.showModal} className="btn btn-submit">저장</Button>
        <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
          <p>저장하시겠습니까?</p>
        </Modal>
      </div>
    )
  }
}
export default Write