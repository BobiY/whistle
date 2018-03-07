import React, { Component } from 'react';
import logo from './logo.svg';
import './style/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/tacos/bus">Bus</Link>
          </li>
          <li>
            <Link to="/tacos/cart">Cart</Link>
          </li>
        </ul>
        {"App"}
        {this.props.children}
      </div>
    );
  }
}

export default App;
