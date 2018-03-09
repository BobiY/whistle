import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import Rect from "./pages/Rect/Rect";
import Text from "./pages/Text/Text";
import TextPos from "./pages/Rect/TextPos";
import RectShow from "./pages/Rect/RectShow";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import { Provider } from 'react-redux'
import 'antd/dist/antd.css';
// then our route config

function reducer(state, action) {
    switch (action.type) {
        case 1:
            console.log(action.data)
            break;
    
        default:
            console.log(0)
            break;
    }
}

const store = createStore(reducer);

const routes = [
    {
        path:"/",
        render: () => <Redirect to="/Rect/Rect" />
    },
    {
        path: "/Rect",
        render: () => <Redirect to="/Rect/Rect" />
    },
    {
        path: "/Rect/Rect",
        component: RectShow
    },
    {
        path: "/Rect/Text",
        component: TextPos
    },
    {
        path: "/Text",
        component: Text,
        routes: [
            {
                path: "/tacos/bus",
                component: "<div>111111111</div>"
            },
            {
                path: "/tacos/cart",
                component: Rect
            }
        ]
    }
];

const RouteWithSubRoutes = (route) => {
    if( route.render ){
        return <Route exact path={route.path} render={ route.render } />
    }else{
        return <Route exact path={route.path} render={props => (
            <route.component {...props} routes={route.routes} />
        )} />
    }
}


const RouteConfigExample = () => (
    <Provider store = {store}>
        <Router>
            <div>
                <App>
                    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                </App>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(
    <RouteConfigExample />, 
    document.getElementById('root')
);
registerServiceWorker();
