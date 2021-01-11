import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeOutlined as HomeIcon, MenuOutlined as MenuIcon} from '@ant-design/icons';

import "./MenuSider.scss";

export default function MenuSider(props) {
    const {Sider} = Layout;
    const {menuCollapsed} = props;
    const {Item} = Menu;
    return (
        <Sider className="menu-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline"
             defaultSelectedKeys={["1"]}>
                <Item key="1">
                    <Link to={"/admin"}>
                        <HomeIcon></HomeIcon>
                        <span className="nav-text">Home</span>
                    </Link>
                </Item>
                <Item key="2">
                    <Link to={"/admin/menu-web"}>
                        <MenuIcon></MenuIcon>
                        <span className="nav-text">Menu Web</span>
                    </Link>
                </Item>
             </Menu>
        </Sider>
    )
}