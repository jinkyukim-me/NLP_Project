import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class Home extends Component {
  
  render() {
    return (
      <>  
        <div style={{ padding: 24, background: '#fff', minHeight: 550 }}>
          <span>오늘은 어떤 하루였나요?</span><br/>
          <span>당신의 이야기를 한줄로 정리해드립니다.</span><br/>
          <span>...1sentence...</span>
        </div>
        {/* <div className="container one-welcome flex flex-center">
          <div className="txt">{randomTxt()}</div>
          <img src={`images/${randomImg()}.jpg`} alt="" className="img position-center" />
          <Link to="/post/write" className="btn-wrap">
            <Button shape="circle" icon="right-circle" className="btn btn-shortcut" />
          </Link>
        </div> */}
      </>
    )
  }
}
export default Home