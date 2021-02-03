// creamos un Provider para hacer las funciones de logout de los usuarios y actualizar los token
import React, { useState, useEffect, createContext } from "react";
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout } from "../api/auth";
import  jwtDecode from "jwt-decode";


export const AuthContext = createContext();

export default function AuthProvider(props) {
    // children es todo lo que hay dentro de <AuthProvider>...<AuthProvider/> en App.js
    const { children } = props;
    // Con esto conseguimos que cuando esté logueado un usuario se redirija al panel de admin, de ahí meter {user} en el contexto de abajo
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });

    // El contenido de useEffect me lo va a mostrar en todas las paginas, es decir, el authProvider se mostrará en todas las paginas
    useEffect(() => {
        checkUserLogin(setUser)
    }, [])

    // Este es el contexto que devuelve la pagina y tiene un valor {user}
    return <AuthContext.Provider value={user}> {children} </AuthContext.Provider>;

    // con esto checkeamos que si el usuario está logueado directamente aparezca en el panel de Admin
    function checkUserLogin(setUser) {
        const accessToken = getAccessTokenApi();

        // Si los tokens han expirado, le decimos que haga logout y que pare de cargar
        if (!accessToken) {
            const refreshToken = getRefreshTokenApi();
            if (!refreshToken) {
                logout();
                setUser({
                    user: null,
                    isLoading: false
                })
            } else {
                refreshAccessTokenApi(refreshToken);
            }
        } else {
            setUser({
                user: jwtDecode(accessToken),
                isLoading: false
            })
        }
    }
}