import React from 'react';
import { Layout, Tabs } from "antd";
import { Redirect } from 'react-router-dom';
import Logo from '../../../assets/img/png/logo_DB.png';

import "./SignIn.scss";
export default function SingIn() {
    const { Content } = Layout;
    const { TabPane } = Tabs;

    return (
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt="Samuel Baron Abad" />
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            Component LoginForm
                        </TabPane>
                        <TabPane tab={<span>Registro Usuario</span>} key="2">
                            Component RegisterForm
                        </TabPane>
                        <TabPane tab={<span>Pokemon</span>} key="3">
                            Component Pokemon
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    )
}