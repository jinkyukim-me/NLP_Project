import React from 'react';
  
class Read extends React.Component {
  state = {
    value: '',
  }
  
  onChange = (date, dateString) => {
    console.log(date, dateString)
  }
    
  render() {
    const { todays_post } = this.props.location.state;
    
    return (
      <>
        <div className="readComp flex">
          {
            todays_post.map((v) => {
              return (
                <div className="post" key={v.id}><div className="date">{v.date}</div><div className="txt">{v.paragraph}</div></div>
              )
            })
          }
        </div>
      </>
    )
  }
}

export default Read;