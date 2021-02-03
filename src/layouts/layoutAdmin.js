import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from "antd";
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import AdminSignIn from "../pages/Admin/SignIn";
import {getAccessTokenApi, getRefreshTokenApi} from "../api/auth";
// Esto va a poder acceder al valor {user} del contexto AuthContext en authProvider, nos devolverá lo que contenga {user}
import useAuth from "../hooks/useAuth"


import "./layoutAdmin.scss";

export default function LayoutAdmin(props) {
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;
    /* Comprueba que nos devuelve useAuth*/
    console.log(useAuth()); 

    const {user, isLoading} = useAuth();

    const token = getAccessTokenApi();
    const refToken = getRefreshTokenApi();
   
   /*  console.log(token);
    console.log(refToken); */

    if (!user) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login" />
            </>
        )
    }

    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed}></MenuSider>
            <Layout className="layout-admin" style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}></MenuTop>
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer className="layout-admin__footer">
                    Samuel Baron Abad 2021
                </Footer>
            </Layout>
        </Layout>
    )
}

// (props) => ({routes}) == const {routes} = props;
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