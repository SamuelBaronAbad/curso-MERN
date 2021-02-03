// Instalar package -- jwt-decode -- 

import { base_path, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

// funcion para obtener el accessToken
export function getAccessTokenApi() {
    // Obtenemos el token guardado en el localStorage
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    // Si el accessToken existe...
    if (!accessToken || accessToken === "null") {
        return null;
    }
    return willExpiredToken(accessToken) ? null : accessToken;
}

// funcion para obtener el refreshToken
export function getRefreshTokenApi() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken || refreshToken === "null") {
        return null;
    }
    return willExpiredToken(refreshToken) ? null : refreshToken;
}

// funcion para refresh el accessToken siempre que sea valido
export function refreshAccessTokenApi(refreshToken){
    const url = `${base_path}/${apiVersion}/refresh-access-token`;
    const bodyObj = {
        refreshToken: refreshToken
    }
    const params = {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(url, params)
    .then(response => {
        if(response!== 200){
            return null;
        }
        return response.json();
    })
    .then(result => {
        if(!result){
            logout();
        }else{
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
        }
    })
    .catch(err => {
        return err.message;
    })

    }

    export function logout () {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }

// Funcion para saber si el token recibido ha expirado
function willExpiredToken(token) {
    const seconds = 60;
    // Decodificamos el token recibido
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;
    // significa que la fecha de hoy es mayor que la de expiración del token, devulve true => el Token ha caducado
    return now > exp;

}