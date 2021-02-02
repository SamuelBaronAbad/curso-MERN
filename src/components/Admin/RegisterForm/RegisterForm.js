import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { MailOutlined as Mail, LockOutlined as Lock, UserOutlined as User } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { signUpApi } from "./../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
    //Indicamos los datos que se van a guardar de los input
    const [input, setInput] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });

    //Validamos los datos que se le pasan
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    });

    //Recogemos los datos de los input y los guardamos
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

    const inputValidation = e => {
        //Cogemos los datos del input (detectado por sus atributos Type y Name) en el que se introducen los datos
        const { type, name } = e.target;

        if (type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            })
        }
        if (type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6)
            })
        }
        if (type === "checkbox") {
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            })
        }
    }

    const register = e => {
        const { email, password, repeatPassword, privacyPolicy } = formValid;

        const emailVal = input.email;
        const passwordVal = input.password;
        const repeatPasswordVal = input.repeatPassword;
        const privacyPolicyVal = input.privacyPolicy
        if (!emailVal || !passwordVal || !repeatPasswordVal) {
            notification["error"]({
                message: "Email y contraseñas obligatorias"
            })
        } else if (!privacyPolicyVal) {
            notification["error"]({
                message: "Ha de aceptar la política de privacidad"
            })
        }
        else {
            if (passwordVal !== repeatPasswordVal) {
                notification["error"]({
                    message: "Las contraseñas deben ser iguales"
                })
            } else {
                // conectar con API y registrar usuario
                const result = signUpApi(input);


                // Mensaje de éxito
                notification["success"]({
                    message: "Registro correcto"
                })
                console.log("Correcto...");
            }
        }

    }

    const { Item } = Form;
    return (
        <Form className="register-form" onChange={changeForm}>
            <Item>
                <Input
                    prefix={<User></User>}
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="register-form__input"
                    value={input.name}
                />
            </Item>
            <Item>
                <Input
                    prefix={<User></User>}
                    type="text"
                    name="lastname"
                    placeholder="Apellidos"
                    className="register-form__input"
                    value={input.lastname}
                />
            </Item>
            <Item>
                <Input
                    prefix={<Mail></Mail>}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="register-form__input"
                    onChange={inputValidation}
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
                    onChange={inputValidation}
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
                    onChange={inputValidation}
                    value={input.repeatPassword}
                />
            </Item>
            <Item>
                <Checkbox
                    name="privacyPolicy"
                    onChange={inputValidation}
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