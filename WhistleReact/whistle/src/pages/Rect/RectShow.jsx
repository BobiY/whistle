import React, { Component } from "react";
import { connect } from 'react-redux';

class RectShows extends Component {
    constructor(props) {
        super()
    }

    render() {
        console.log(this.props)
        return <div onClick={ this.props.aa }>{"RectShow"}</div>
    }
}


const RectShow = connect(
    (dispatch, ownProps) => {   // 每次组件装载时就会运行一次，以降对象合并到 props 上传递
        console.log("dispatch"); 
        return {} 
    }, 
    (dispatch, ownProps) => {
        return {aa:() => { dispatch({type:1,data:5}) }}
    })(RectShows);

export default RectShow;
