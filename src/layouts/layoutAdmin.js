import React from 'react';
import {Route} from 'react-router-dom';
import { Layout } from "antd";

import "./layoutAdmin.scss";

export default function LayoutAdmin(props) {
const {routes} = props;
const {Header, Content,Footer} = Layout;

    return (
        <Layout>
            <h2>Menu Sider Admin</h2>
            <Layout>
                <Header>header...</Header>
                <Content> 
                  <LoadRouters routes={routes}/>    
                </Content>
                <Footer>
                    Samuel Baron Abad 2021
                </Footer>
            </Layout>
           
        </Layout>
    )
}

// (props) => ({routes}) == const {routes} = props;
function LoadRouters({routes}) {
return routes.map((route, index)=> (
    <Route
    key={index}
    path={route.path}
    exact={route.exact}
    component={route.component}
    />
))

}