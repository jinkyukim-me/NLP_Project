import React, { Component } from 'react'
import { Button, Icon } from 'antd'

class Emotion extends Component {
  render() {
    return(
      <div className="App-Content-Emotion">
        <p>오늘 기분은??</p>
        <div className='iconList' style={{ padding: 5, background: '#fff', minHeight: 20}}>
{/* 선택한 이모티콘에 value를 넣고, 저장되도록 설정해야 함 */}
          <Button key="1">
            <Icon type="like" />
          </Button>
          <Button key="2">
            <Icon type="smile" />
          </Button>         
          <Button key="3">
           <Icon type="meh" />
          </Button>
          <Button key="4">
            <Icon type="frown" />
          </Button>         
          <Button key="5">
            <Icon type="dislike" />
          </Button>        
        </div>
      </div>
    )
  }
}

export default Emotion