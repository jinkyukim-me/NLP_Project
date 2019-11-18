import React, { Component } from 'react'
import { Input, Button } from 'antd'
import Emotion from './Emotion'
import axios from 'axios'
import LiveClock from './LiveClock'

const { TextArea } = Input

class Write extends Component {
  constructor(props) {
    super(props)
     this.state = {
      text: []
    }

    this.onChange = this.onChange.bind(this)
    this.flask = this.flask.bind(this)
  }

  // onChange = ({ target: { value } }) => {
  //   this.setState({ value });
  // }


  onChange(event) {
    this.setState({
      text: event.target.value
    })
  }
   
  flask(event) {
    axios.post("http://54.180.26.21/:8080/summary", {
      text: [this.state.text]
    })
    .then((response) => {
      console.log(response.data)
      alert(response.data.onesentence)
    })
  }

  render() {
    // const { value } = this.state

    return (     
      <div className="one-post-write">
        <div 
          className="one-liveClock-container"
          >
          <LiveClock />
        </div> 
        <TextArea 
          placeholder="...그래서 오늘은 어땠어?"            
          value={this.state.text} 
          onChange={this.onChange}
          className="one-textarea"
        />
        <div className="one-post-btn-container flex">
          <Emotion />
          <Button type="primary" 
            className="btn btn-submit"
            onClick={this.flask}
          >
          저장
          </Button>
        </div>
      </div>        
    )
  }
}
export default Write