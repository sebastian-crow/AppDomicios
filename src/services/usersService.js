import API from './config'

const USERS_ENDPOINT = {
    USER: 'users',
    //USER_DETAIL: 'users/id'
}

const UsersService = {
    getAll: () => new Promise(
        (resolve, reject) => {
            API.get(USERS_ENDPOINT.USER)
                .then(
                    res => res.data.users
                )
                .then(
                    data => resolve(data)
                )
                .catch(
                    err => reject(err)
                )
        }
    ),
    /*
    get: (id) => new Promise(
        (resolve, reject) => {
            API.get(USERS_ENDPOINT.USER_DETAIL+id)
                .then(
                    res => res.data.data.user
                )
                .then(
                    data => resolve(data)
                )
                .catch(
                    err => reject(err)
                )
        }
    )*/
    post: () => new Promise(
        (resolve, reject) => {
            API.post(USERS_ENDPOINT.USER)
        }
    )
}

export default UsersService


