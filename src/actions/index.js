export const startAction = () => {
    return {
        type: "START_ACTION",
        payload: true
    }
}



export const stopAction = () => {
    return {
        type: "STOP_ACTION",
        payload: false
    }
}

export const location = (g) => {
    return {
        type: "GET_LOCATION",
        payload: g
    }
}


/*
    1. Al momento de obtener los de la geolocalización, almacenarlos en una variable.
    2. Almacenarla en el store para manipular un estado globalmente entre componentes.
    3. Obtener esos datos del store para usarlos en el formulario y dentro de este componente definir las acciones para comunicarse e interactuar con el API

*/