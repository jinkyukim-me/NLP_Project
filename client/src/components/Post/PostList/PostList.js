import React, { Component } from 'react'
import { List, Card } from 'antd'
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
    // axios.post("http:서버주소/:서버포트/post", {
    //   startDt: this.props.startDt,
    //   endDt: this.props.endDt,
    // })
    // .then((response) => {
    //   this.setState({postList: response.data})
    //   alert(response.data)
    // })
  }

  render() {
    return (
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
    )
  }
}
export default PostList