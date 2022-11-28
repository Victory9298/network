import React from 'react';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
    profile: ProfileType
    status :string
    updateStatus: boolean
}
const Profile = (props: PropsType) => {

    return <div>
        <ProfileInfo profile = {props.profile} status={props.status} updateStatus={props.updateStatus}/>
        <MyPostsContainer />
    </div>
}

export default Profile; 