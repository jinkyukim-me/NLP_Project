import React, { Component } from 'react'
import { Button, Icon } from 'antd'

class Emotion extends Component {
  onClickEmotion = (e) => {
    this.props.onChangeEmotion(e.target.value);
  }
  
  render() {
    return(
      <div className="App-Content-Emotion">
        <p>오늘 기분은??</p>
        <div className='iconList' style={{ padding: 5, background: '#fff', minHeight: 20}}>
{/* 선택한 이모티콘에 value를 넣고, 저장되도록 설정해야 함 */}
          <Button onClick={this.onClickEmotion}>
            <Icon type="like" />
          </Button>
          <Button onClick={this.onClickEmotion}>
            <Icon type="smile" />
          </Button>
          <Button onClick={this.onClickEmotion}>
           <Icon type="meh" />
          </Button>
          <Button onClick={this.onClickEmotion}>
            <Icon type="frown" />
          </Button>         
          <Button onClick={this.onClickEmotion}>
            <Icon type="dislike" />
          </Button>        
        </div>
      </div>
    )
  }
}

export default Emotion