import React, { Component } from 'react';
import { List, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class PostsList extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    date: '20191119',
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results,
      });
    });
  }

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };
  
  renderItem = (item) => {
    return (
      <List.Item key={item.id}>
        <List.Item.Meta title={<a href="https://ant.design">{item.name.last}</a>} description={this.state.date} className="list-item-wrap" />
        <div>Content</div>
      </List.Item>
    );
  }

  render() {
    return (
      <div className="demo-infinite-container one-list">
        <InfiniteScroll initialLoad={false} pageStart={0} loadMore={this.handleInfiniteOnLoad} hasMore={!this.state.loading && this.state.hasMore} useWindow={false} >
          <List dataSource={this.state.data} renderItem={this.renderItem} >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default PostsList;