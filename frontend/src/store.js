import {createStore} from "redux"

function data(state = {token: null, name: null, id: null, contacts: []}, action) {
    switch (action.type) {
        case "ADD_TOKEN":
            return {...state, token: action.token} //on fait un clone de l'objet state qui sera identique sauf aux endroits où on aura précisé autre chose
        case 'USER':
            return {...state, name: action.user.name, id: action.user.id}
        case 'SIGN_OUT': 
            return {token: null, name: null, id: null, contacts: []}
        case 'GET_CONTACTS': 
            return {...state, contacts: action.contacts}
        case 'ADD_CONTACT': 
            return {...state,  contacts: [...state.contacts, action.contact]}
        default: 
            return state
    }
}

let store = createStore(data, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store