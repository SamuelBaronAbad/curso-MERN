// creamos un Provider para hacer las funciones de logout de los usuarios y actualizar los token
import React, { useState, useEffect, createContext } from "react";
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout } from "../api/auth";


export const AuthContext = createContext();

export default function AuthProvider(props) {
    // children es todo lo que hay dentro de <AuthProvider>...<AuthProvider/> en App.js
    const { children } = props;
    // Con esto conseguimos que cuando esté logueado un usuario se redirija al panel de admin, de ahí meter {user} en el contexto de abajo
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });

    // Este es el contexto que devuelve la pagina y tiene un valor {user}
    return <AuthContext.Provider value={user}> {children} </AuthContext.Provider>;
}