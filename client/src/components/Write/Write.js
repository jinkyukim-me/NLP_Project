import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { Input, Button } from 'antd';

const { TextArea } = Input;

class Write extends React.Component {
  state = {
    value: '',
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="one-post-write">
        <TextArea placeholder="...그래서 오늘은 어땠어?" className="one-textarea" />
        <Button type="primary" className="btn btn-submit">저장</Button>
      </div>
    )
  }
}
export default Write