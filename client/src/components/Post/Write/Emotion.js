import React, { Component } from 'react'
import { Button, Icon } from 'antd'

class Emotion extends Component {
  render() {
    return(
      <div className="App-Content-Emotion">
        <p>오늘 기분은??</p>
        <div className='iconList' style={{ padding: 5, background: '#fff', minHeight: 20}}>
{/* 선택한 이모티콘에 value를 넣고, 저장되도록 설정해야 함 */}
          <Button>
            <Icon type="like" />
          </Button>
          <Button>
            <Icon type="smile" />
          </Button>         
          <Button>
           <Icon type="meh" />
          </Button>
          <Button>
            <Icon type="frown" />
          </Button>         
          <Button>
            <Icon type="dislike" />
          </Button>        
        </div>
      </div>
    )
  }
}

export default Emotion