import profileReducer from "./profile-reducer";
import { addPostActionCreator, deletePost } from './../redux/profile-reducer';

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It is my first post', likesCount: 2 },
        { id: 3, message: 'Bla bla', likesCount: 15 },
        { id: 4, message: 'Dadada', likesCount: 25 }
    ]
};

it ('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator("it-kamasutra.com");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(5);
})

it ('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
})