import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class Unsubscribe extends Component {

  handleClick() { 
    alert("다시 또 만날 수 있길 바랍니다. 안녕히 가세요.")
  }
  render() {
    return (
      <>
        <div className="one-unsubscribe flex flex-center">
          <div class="container">
            <p className="txt">
              <span className="line-break">회원 탈퇴하시려고요?</span>
              <span className="line-break">탈퇴하시면 지금까지 이곳에 남긴 모든 추억이 사라집니다.</span>
              <span className="line-break">그래도 나가시겠다면</span>
              <span className="line-break">다음에 다시 만나기를 바라면서...</span>
            </p>
            <div className="btn-wrap">
              <Button type="primary" className="btn btn-cancel">
                <Link to="/setting">취소</Link>
              </Button>
              <Button className="btn btn-submit" onClick={this.handleClick}>
                <Link to="/">회원탈퇴</Link>                
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Unsubscribe;