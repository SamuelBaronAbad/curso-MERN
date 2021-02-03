//Funciones para EndPoints de los usuarios

import { base_path, apiVersion } from "./config";

//data hay que convertirlo en JSON
export function signUpApi(data) {
    const url = `${base_path}/${apiVersion}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    };
    console.log(data)

    //Promesas: representa la terminación o fallo de una operación asincrona
    //then: encadena otras funciones asincronas o no con el resultado de la anterior función si esta ha tenido éxito
    //fetch: DOS Parametros : 
    //        1) RECURSO: en este caso la url donde obtener el recurso y devuelve un objeto Promise conteniendo la respuesta, un objeto Response
    //        2) AJUSTES: se pasan parametros con diferentes ajustes
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result)
            if (result.user) {
                return {
                    ok: true,
                    message: "Usuario creado correctamente"
                };
            }
            return {
                ok: false,
                message: result.message
            };
        })
        .catch((err) => {
            return {
                ok: false,
                message: err.message
            };
        })
}

export function signInApi(data) {
    const url = `${base_path}/${apiVersion}/sign-in`;

    // Estos datos se pueden ver en PostMan
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        }).then(result => {
            return result;
        })
        .catch(err => {
            return err.message
        })
}