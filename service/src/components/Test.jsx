import React, { Component } from 'react';

class Test extends Component {
  render() {
    return (
      <>
        <header>
          <img src="http://via.placeholder.com/350x150" alt="logo" className="logo"/>
          <nav className="nav">
            <ul>
              <li>menu 1</li>
              <li>menu 2</li>
              <li>menu 3</li>
            </ul>
          </nav>
        </header>
      </>
    );
  }
}

export default Test;