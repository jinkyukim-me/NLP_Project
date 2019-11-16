import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { Input } from 'antd';

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
      <div>
        <section className="Content-section-layout">
          <TextArea
            placeholder="...그래서 오늘은 어땠어?"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </section>        
      </div>        
    )
  }
}
export default Write