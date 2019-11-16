import React, { Component } from 'react'
import 'antd/dist/antd.css'; 
import './App.css';
import Home from './components/Home/Home'
import Write from './components/Write/Write';
import { Route, Switch, Link } from 'react-router-dom'
import NormalLoginForm from './components/NormalLoginForm/Login';
import { Button, Layout } from 'antd'
import Read from './components/Read/Read';

export default class App extends Component {
  render () {
    return (
      <>
        <Layout>
          <section className="Content-section-layout">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/write" component={Write} />
              {/* <Route path="/read" component={Read} /> */}
              <Route path="/login" component={NormalLoginForm} />
              <Route render={(_) => (
                  <div className="App-section-layout2">
                    <h2>이 페이지는 존재하지 않습니다.</h2><hr />
                    <Link to="/">
                      <Button type='primary'>홈으로 이동</Button>
                    </Link>
                  </div> )}/>
              </Switch>
            </section>
        </Layout>
      </>
    )          
  }
}