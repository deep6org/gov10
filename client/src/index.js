import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Lend, Land, Builder } from './components';
import reportWebVitals from './reportWebVitals';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (
  <Router>
    <div>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/builder" component={Builder} />
      <Route path="/lend" component={Lend} />
      <Route path="/land" component={Land} />
    </Switch>
    </div>
  </Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
