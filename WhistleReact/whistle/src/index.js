import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import Rect from "./pages/Rect/Rect";
import Text from "./pages/Text/Text";
import Menus from "./menu/menu";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import { Provider } from 'react-redux'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import { Row,Col } from "antd";
// then our route config
const routes = [
    {
        path: "/Rect",
        component: Rect
    },
    {
        path: "/text",
        component: Text,
        // routes: [
        //     {
        //         path: "/tacos/bus",
        //         component: App
        //     },
        //     {
        //         path: "/tacos/cart",
        //         component: Rect
        //     }
        // ]
    }
];



const RouteConfigExample = () => (
    <Router>
        <div>
            <Row>
                <Col span={ 6 }>
                    <Menus />
                </Col>
                <Col span = { 18 }>
                    {routes.map((route, i) => <Route key={i} {...route} />)}
                </Col>
            </Row>
        </div>
    </Router>
);

ReactDOM.render(
    <RouteConfigExample />, 
    document.getElementById('root')
);
registerServiceWorker();
