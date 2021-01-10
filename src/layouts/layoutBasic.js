import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import './layoutBasic.scss';

export default function LayoutBasic(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    return (
        <Layout>
            <h2>Menu Sider Basic</h2>
            <Layout>
                <Header>Este es el Header...</Header>
                <Content>
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer>
                    Samuel Baron Abad 2021
                </Footer>
            </Layout>
        </Layout>
    )
}

function LoadRoutes({ routes }) {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    )
}