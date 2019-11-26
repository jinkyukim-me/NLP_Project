import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, DatePicker, Button } from 'antd';
// import './Home.css'
import axios from 'axios';
const { Header, Content } = Layout;


const randomTxt = () => {
  const texts = ['안녕하세요', '반갑습니다', '오랜만이에요', '어서오세요', '지금 행복하신가요?', '어떻게 지내세요?', '고마워요'];
  const num = Math.floor(Math.random() * 7);
  
  return texts[num];
}

const randomImg = () => {
  const num = Math.floor(Math.random() * 3 + 1);
  
  return num;
}

class Home extends Component {
  // componentDidMount() {
  //   if (!req.session.user) {
  //     this.props.history.push('/login');
  //   }
  // }
  
  render() {
    return (
      <>  
        <div className="container one-welcome flex flex-center">
          <div className="txt">{randomTxt()}</div>
          <img src={`images/${randomImg()}.jpg`} alt="" className="img position-center" />
          <Link to="/post/write" className="btn-wrap">
            <Button className="btn btn-shortcut">당신의 이야기를 남겨주세요</Button>
          </Link>
        </div>
      </>
    )
  }
}
export default Home;