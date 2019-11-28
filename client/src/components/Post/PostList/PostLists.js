import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';


class PostLists extends Component {
  constructor(props) {
    super(props) {
      this.state = {
        createDt: [],
        paragraph: [],
      }
    }    
  }


render() {

return (
<div>
{this.state.postLists ? this.state.postLists.map(p => {
return <postList key={p.postId} id={p.postId} paragraph={p.paragraph} affectivity={p.affectivity} createdDt={p.createdDt} modifiedDt={p.modifiedDt} />
}) : ""}
</div>
);
}
}

export default PostLists;

