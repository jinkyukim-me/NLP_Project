import React, { Component } from 'react'
import { Button, Icon } from 'antd'

class Emotion extends Component {
  render() {
    return(
      <div className="App-Content-Emotion">
        <div className='iconList' style={{ padding: 5, background: '#fff', minHeight: 20}}>
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