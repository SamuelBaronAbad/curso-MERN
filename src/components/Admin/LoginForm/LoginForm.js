import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { MailOutlined as Mail, LockOutlined as Lock } from '@ant-design/icons';
import { signInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

import "./LoginForm.scss";



export default function LoginForm() {
    const { Item } = Form;
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    // Cada vez que se actualice el Form cambiará el useState, ya que [e.target.name] de los input tienen el mismo nombre que en el useState
    const onChangeForm = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const login = async () => {
      
        const result = await signInApi(input);
        console.log(result)
        if (result.message) {
            notification["error"]({
                message: result.message
            })
        } else {
            //accessToken y refreshToken lo obtenemos del resultado, que en este caso estan creados en el lado del servidor
            const { accessToken, refreshToken } = result;

            // Guardamos los Tokens en el local Storage
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            notification["success"]({
                message: "Login correcto"
            });

            // Redirigimos a /admin
            window.location.href = "/admin";
        }
        
    }
    return (
        <Form className="login-form" onChange={onChangeForm}>
            <Item>
                <Input
                    prefix={<Mail></Mail>}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="login-form__input"
                />
            </Item>
            <Item>
                <Input
                    prefix={<Lock></Lock>}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                />
            </Item>
            <Item>
                <Button
                    htmlType="submit"
                    className="login-form__button"
                    onClick={login}
                >
                    Entrar
                </Button>
            </Item>
        </Form>
    )
}