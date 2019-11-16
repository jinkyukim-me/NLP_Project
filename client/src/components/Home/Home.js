import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import { Layout, Menu, Icon, DatePicker } from 'antd';
import './Home.css'
import axios from 'axios';

const { Header, Content } = Layout;
// const { SubMenu } = Menu;


class Home extends Component {
  constructor(props) {
    super(props)
     this.state = {
      collapsed: false,
      text: ""
    }

    this.onChange = this.onChange.bind(this)
    this.flask = this.flask.bind(this)
  }

  // onCollapse = (collapsed) => {
  //   console.log(collapsed);
  //   this.setState({ collapsed });
  // }

  onChange(event) {
    this.setState({
      text: event.target.value
    })
  }
   
  flask(event) {
    axios.post("http://15.164.222.171:8080/summary", {
      text: [this.state.text]
    })
    .then((response) => {
      console.log(response.data)
      alert(response.data.onesentence)
    })
  }
  
  render() {
    return (
      <>  
        <section className="Content-section-layout">
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
              <input type="textarea" style={{width: "300"}} value={this.state.text} onChange={this.onChange} />
              <span>오늘은 어떤 하루였나요?</span><br/>
              <span>당신의 이야기를 한줄로 정리해드립니다.</span><br/>
              <span>...1sentence...</span>
            </div>
            <button onClick={this.flask}>저장</button>
          </Content>
        </section>
    </>
    )
  }
}
export default Home