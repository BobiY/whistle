import React,{ Component } from "react";
import { Route } from "react-router-dom";

const RouteWithSubRoutes = (route) => (
    <Route exact path={route.path} render={props => (
        <route.component {...props} routes={route.routes} />
    )} />
)
export default class Rect extends Component{
    constructor(props){
        super()
    }

    render(){
        console.log(this.props.routes )
        return  <div>
                {"Rect"}
        </div>
        
    }
}