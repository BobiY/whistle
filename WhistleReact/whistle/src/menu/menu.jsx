import React, { Component } from "react";
import { Menu } from "antd";
import menuConfing from './menu.config';
import { Link } from "react-router-dom";
const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

export default class Menus extends Component {
    constructor(props) {
        super()
    }

    getMenu(){
        return menuConfing.map( (item,i) => {
            return (
                <SubMenu key={i} title={<Link to={item.path} >{item.name}</Link> }>
                        {item.child && this.getSubMenu(item.child,i)}
                </SubMenu>
        )
        })
    }

    getSubMenu(data,g){
        return data.map( ( item,i ) =>{
            return <Item key={`${g}--${i}`}>
                <Link to={item.path} >{item.name}</Link>
            </Item>

        } )

    }

    render() {
        return <div><Menu mode="inline">{this.getMenu()}</Menu></div>

    }
}