import React, { Component } from 'react'
import { Button, Empty } from 'antd'
import { Link } from 'react-router-dom'


class NotFound extends Component {
  render() {
    return(
      <div className="one-Content-NotFound">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        <h2>이 페이지는 존재하지 않습니다.</h2><hr />
        <Link to="/">
          <Button type='primary'>홈으로 이동</Button>
        </Link>
      </div>
    )
  }
}

export default NotFound