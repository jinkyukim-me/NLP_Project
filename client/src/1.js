import React, { Component } from 'react'
import { Input, Button, Modal } from 'antd';
import Emotion from './Emotion'
import axios from 'axios'
import LiveClock from './LiveClock'
import { Link } from 'react-router-dom'
import saveConfirmBtn from './saveConfirmBtn'

const { TextArea } = Input

class Write extends Component {
  constructor(props) {
    super(props)
     this.state = {
      text: []
    }

    this.onChange = this.onChange.bind(this)
    // this.flask = this.flask.bind(this)
  }

  // onChange = ({ target: { value } }) => {
  //   this.setState({ value });
  // }


  onChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  submitBtnClicked(event) {
    axios.post('', {
      create_post_time: this.state.create_post_time,
      paragraph: this.state.paragraph,
      emotion: this.state.emotion
      .then((response) =>{
        alert("글이 저장되었습니다.")
        this.setState({
          create_post_time: "",
          paragrape: "",
          emotion: ""
        })
      })
    })
  }
   
  // flask(event) {
  //   axios.post("http://54.180.26.21/:8080/summary", {
  //     text: [this.state.text]
  //   })
  //   .then((response) => {
  //     console.log(response.data)
  //     alert(response.data.onesentence)
  //     this.props.refresh()
  //   .catch((error) => {
  //     console.error(error)
  //   })
  //   })
  // }

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
          {/* <Link to="/post/write/confirm" component={saveConfirmBtn} /> */}
          {/* <Button type="primary" 
            className="btn btn-submit"
            onClick={this.flask}
          >
          저장
            </Button> */}
          {/* </Link> */}
          <Button type="primary" onClick={this.showModal} className="btn btn-submit">저장</Button>
          <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
            <p>저장하시겠습니까?</p>
          </Modal>
        </div>
      </div>        
    )
  }
}
// export default Write



/////////////////////

import React, { Component } from 'react'
import { Layout, List, Card } from 'antd'
import axios from 'axios'

const data = [
  {
    create_post_date: '10/24(월)',
    paragraph: '오늘 생일이다.',
  },
  {
    create_post_date: '10/25(화)',
    paragraph: '오늘 생일 다음날이다.',
  },
  {
    create_post_date: '10/26(수)',
    paragraph: '오늘 생일 다다음날이다.',
  },
]

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [
        {
          create_post_date: "",
          paragraph: "",
        }
      ]
    }
  }

  componentWillMount() {
    this.setState({postList: data})
    axios.post("http:서버주소/:서버포트/post", {
      startDt: this.props.startDt,
      endDt: this.props.endDt,
    })
    .then((response) => {
      this.setState({postList: response.data})
      alert(response.data)
    })
  }

  render() {
    return (
      <Layout>
        <List
          grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={this.state.postList}
        renderItem={item => (
        <List.Item>
          <Card title={item.create_post_date}>{item.paragraph}</Card>
        </List.Item>
        )}
      />
      </Layout>     
    )
  }
}
// export default PostList