import React, { Component } from 'react';
import './style/App.css';
import { Row, Col } from "antd";
import Menus from "./menu/menu";




class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={6}>
            <Menus />
          </Col>
          <Col span = {8}>
             {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
