import React from 'react';
import 'antd/dist/antd.css';
import { Input, Button, Icon } from 'antd';
import Emotion from './Emotion'
import axios from 'axios'
import LiveClock from './LiveClock';

const { TextArea } = Input;

class Write extends React.Component {
  constructor(props) {
    super(props)
     this.state = {
      text: ""
    }

    this.onChange = this.onChange.bind(this)
    this.flask = this.flask.bind(this)
  }

  // onChange = ({ target: { value } }) => {
  //   this.setState({ value });
  // };


  onChange(event) {
    this.setState({
      text: event.target.value
    })
  }
   
  flask(event) {
    axios.post("http:54.180.26.21/:8080/summary", {
      text: [this.state.text]
    })
    .then((response) => {
      console.log(response.data)
      alert(response.data.onesentence)
    })
  }

  render() {
    // const { value } = this.state;

    return (     
        <div>
          <TextArea
            placeholder="오늘은 어떤 하루였나요?"
            style= {{ minHeight: 450, border:'none' }}
            value={this.state.text} onChange={this.onChange}
            // autoSize={{ minRows: 25, maxRows: 100 }}
          >
           
          </TextArea>
          <div 
            className='liveClock-container'
            style={{float: 'right' }}>
            <LiveClock />
          </div> 
          <Emotion />
          <Button onClick={this.flask}>
            <Icon type="save"/>
            <span>저장</span>
          </Button>
        </div>           
    )
  }
}
export default Write