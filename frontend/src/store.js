import {createStore} from "redux"
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
}

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
        case 'DELETE_SINGLE_CONTACT': 
            let contacts = state.contacts.slice()
            for (let i = 0; i < contacts.length; i++) {
                if (action.name === contacts[i].name && action.email === contacts[i].email && action.user_affiliate === contacts[i].user_affiliate) {
                    contacts.splice(i, 1)
                }
            }
            return {...state, contacts: contacts}
            
        default: 
            return state
    }
}

const persistedReducer = persistReducer(persistConfig, data)

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const persistor = persistStore(store)


export {store, persistor}