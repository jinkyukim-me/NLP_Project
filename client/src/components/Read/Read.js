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
        <div>
          
        </div>
      </>
    )
  }
}

export default Read;