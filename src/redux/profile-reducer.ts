import { PostType, ProfileType, PhotosType } from './../types/types';
import { stopSubmit } from 'redux-form';
import { profileAPI, userAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILET';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you? Hi, how are you? Hi, how are you? Hi, how are you? Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'I have a question. I have a question. I have a question. I have a question. I have a question', likesCount: 2 },
        { id: 3, message: 'Have a good day! Have a good day! Have a good day! Have a good day! Have a good day! Have a good day!', likesCount: 15 },
        { id: 4, message: 'It is my first post. It is my first post. It is my first post. It is my first post.', likesCount: 25 }
    ] as Array<PostType>,
    profile: null as ProfileType|null,
    status: '',
    newPostText: ''
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action:any):InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        // case DELETE_POST: {
            // return { ...state.posts, posts: state.posts.filter(p => p.id !== action.postId) as Array<PostType>}
        // }
        case SAVE_PHOTO_SUCCESS: 
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText:string):AddPostActionCreatorType => ({ type: ADD_POST, newPostText });
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType  
}
export const setUserProfile = (profile: ProfileType):SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
type SetUserStatusActionType = {
    type: typeof SET_STATUS
    status: string  
}
export const setStatus = (status:string):SetUserStatusActionType => ({ type: SET_STATUS, status });
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number  
}
export const deletePost = (postId:number):DeletePostActionType => ({ type: DELETE_POST, postId });
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType  
}
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType=> ({type: SAVE_PHOTO_SUCCESS, photos})
export const getUserProfile = (userId:number) => async (dispatch:any) => {
    let response = await userAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file:any) => async(dispatch:any)=> {
    let response = await profileAPI.savePhoto(file); 

    if (response.data.resultCode === 0){
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile:ProfileType) => async(dispatch:any, getState:any)=> {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile); 

    if (response.data.resultCode === 0){
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit profile"), {_error:response.data.message[0]});
        return Promise.reject(response.data.message[0]);
    }
}

export default profileReducer;