import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './Home.css'

class Home extends Component {

  
  render() {
    return (
      <>  
        <div style={{ padding: 24, background: '#fff', minHeight: 550 }}>
          <span>오늘은 어떤 하루였나요?</span><br/>
          <span>당신의 이야기를 한줄로 정리해드립니다.</span><br/>
          <span>...1sentence...</span>
        </div>
      </>      
    )
  }
}
export default Home