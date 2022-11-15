export let appSession = {
    'user': {
        isLoggedIn: false,
        email: '',
        avatar: '',
        token: ''
    },
    'helmetMetaData':{
        title: 'hello'
    },
    'appId': "hello"
}
if (typeof window !== 'undefined') {
    if (sessionStorage.getItem('token')) {
        appSession.user.isLoggedIn = true;
    } else if (localStorage.getItem('token')) {
        appSession.user.isLoggedIn = true;
    }
}
export const initialState = {
    appSession: appSession,
    searchValue: '',
    baseUrl: 'https://www.bestdivision.com/'
}
// export const appSession
//export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    console.log('*******************************************************');
    console.log(action);
    console.log('*******************************************************');
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            }
        case 'CHANGE_MODAL_CONTENT':
            return {
                ...state,
                ModalContent: action.ModalContent
            }
        case 'CHANGE_MODAL_CLASSNAME':
            return {
                ...state,
                modalClassName: action.modalClassName
            }
        case 'UPDATE_APP_SESSION':
            return {
                ...state,
                appSession: { ...state.appSession, [action.key]: action.value }
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn('Can\'t remove (id: ${action.id}) as its not basket!')
            }
            return {
                ...state,
                basket: newBasket
            }
        case 'HELMET_META_DATA':
            return {
                ...state,
                helmetMetaData: {
                    ...state.helmetMetaData,
                    helmetMetaData: {
                        ...state.appSession.helmetMetaData,
                        title: 'blogs',
                        description: 'This is blogs description from reducer'
                    }
                }
            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        case 'LOGIN':
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: true
                }
            }
        case 'LOGOUT':
            sessionStorage.removeItem('token')
            localStorage.removeItem('token')
            return {
                ...state,
                appSession: {
                    ...state.appSession,
                    user: {
                        ...state.appSession.user,
                        isLoggedIn: false,
                        email: '',
                        avatar: '',
                        token: ''
                    }
                }
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }
}

export default reducer;