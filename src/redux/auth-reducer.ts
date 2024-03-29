import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api'

export const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
export const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = typeof initialState;

let initialState = {
    userId: null as number|null,
    email: null as string|null,
    login: null as string|null,
    isAuth: false as boolean,
    captchaUrl: null as string|null
};

const authReducer = (state:InitialStateType = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId:number|null
    email:string|null
    login:string|null
    isAuth:boolean 
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA, 
    payload: SetAuthUserDataActionPayloadType
};

export const setAuthUserData = (userId:number|null, email:string|null, login:string|null, isAuth:boolean):SetAuthUserDataActionType => 
({ type: SET_USER_DATA, 
    payload: { userId, email, login, isAuth } 
});

export const getCaptchaUrlSuccess = (captchaUrl:string) => 
({ type: GET_CAPTCHA_URL_SUCCESS, 
    payload: { captchaUrl } 
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS, 
    payload: {captchaUrl: string}
}

export const getAuthUserData = () => async (dispatch:any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {

    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserData());
    }
   
    else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
    };
}

export const getCaptchaUrl = () => async (dispatch:any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url; 
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }

}

// export const mapStateToProps = (state) => ({
//     captchaUrl: state.auth.captchaUrl,
//     isAuth: state.auth.isAuth
// })
export default authReducer;