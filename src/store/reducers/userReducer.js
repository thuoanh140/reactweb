import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    isLoggedInAdmin: false,
    adminInfo: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }

        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedInAdmin: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedInAdmin: false,
                adminInfo: null
            }
        case actionTypes.ADMIN_PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedInAdmin: false,
                adminInfo: null
            }

        default:
            return state;
    }
}

export default appReducer;