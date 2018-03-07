import React, { Component } from "react";
import { Menu } from "antd";
import menuConfing from './menu.config';
import { Link } from "react-router-dom";
const Item = Menu.Item;

export default class Menus extends Component {
    constructor(props) {
        super()
    }

    getMenu(){
        return menuConfing.map( (item,i) => {
            return (
            <Item key={i}>
                <Link to = {item.path} >{item.name}</Link>
            </Item>
        )
        })
    }

    render() {
        return <div><Menu >{this.getMenu()}</Menu></div>

    }
}