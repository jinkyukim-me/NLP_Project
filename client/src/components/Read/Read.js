
import React from 'react'
import 'antd/dist/antd.css'
import { DatePicker } from 'antd'
import axios from 'axios';

const { MonthPicker, RangePicker } = DatePicker;

// axios.get(`http://localhost:9000/post/${this.props.postDate}`, {
//   postDate: this.props.postDate,
// })
// .then((response) => {
//   this.setState({
//     value: response.paragraph,
//   })
// })
// .catch((error) => {
//   res.state(500).end('FAILED');
// });

class Read extends React.Component {
  state = {
    value: '',
  }
  onChange = (date, dateString) => {
    console.log(date, dateString)
  }

  render() {
    return (
      <>
      <section className="Content-section-layout">
      // 메뉴의 서브메뉴로 옮겨질수도...
        <div> 
          <DatePicker onChange={this.onChange} />
          <br />
          <MonthPicker onChange={this.onChange} placeholder="Select month" />
          <br />
          <RangePicker onChange={this.onChange} />
          <br />
        </div>
        <div>
          // 저장소 
        </div>        
      </section>    
    </>
    )
  }
}

export default Read;