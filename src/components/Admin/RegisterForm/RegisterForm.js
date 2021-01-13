import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { MailOutlined as Mail, LockOutlined as Lock } from '@ant-design/icons';

import "./RegisterForm.scss";

export default function RegisterForm() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });

    const changeForm = e => {
        if (e.target.name === "privacyPolicy") {
            setInput({
                ...input,
                [e.target.name]: e.target.checked
            })
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }

    const register = e => {
        e.preventDefault();
        console.log(input);
    }

    const { Item } = Form;
    return (
        <Form className="register-form" onChange={changeForm}>
            <Item>
                <Input
                    prefix={<Mail></Mail>}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="register-form__input"
                    value={input.email}
                />
            </Item>
            <Item>
                <Input
                    prefix={<Lock></Lock>}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    value={input.password}
                />
            </Item>
            <Item>
                <Input
                    prefix={<Lock></Lock>}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir contraseña"
                    className="register-form__input"
                    value={input.repeatPassword}
                />
            </Item>
            <Item>
                <Checkbox
                    name="privacyPolicy"
                    checked={input.privacyPolicy}
                >
                    He leido y acepto la Política de Privacidad
                </Checkbox>
            </Item>
            <Item>
                <Button
                    htmlType="submit"
                    className="register-form__button"
                    onClick={register} 
                >
                    Crear cuenta
                </Button>
            </Item>
        </Form>
    )
}