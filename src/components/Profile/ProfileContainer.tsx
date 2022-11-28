import React from 'react';
//@ts-ignore
import Profile from './Profile.tsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//@ts-ignore
import { getUserProfile } from './../../redux/profile-reducer.ts';
import { compose } from 'redux';
//@ts-ignore
import { getStatus, updateStatus } from './../../redux/profile-reducer.ts';
import { ProfileType } from '../../types/types';

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
    match: any
    authorizedUserId: number
    history: Array<string>
    getUserProfile: (userId:number) => void
    getStatus: (userId:number) => void
    profile: ProfileType
}

type MapStatePropsType = {
    profile: ProfileType,
    status: string,
    authorizedUserId: number,
    isAuth: boolean
}

type StateType = {
    profilePage: ProfilePageType
    auth: AuthType
}

type ProfilePageType = {
    profile: ProfileType
    status: string
}

type AuthType = {
   userId: number
   isAuth: boolean 
}



class ProfileContainer extends React.Component<PropsType, MapStatePropsType, StateType>  {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);   
    }

    render() {
        return (
            <Profile {...this.props} 
            profile={this.props.profile} 
            status={this.props.status} 
            updateStatus={this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state: StateType):MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    //@ts-ignore
    connect<MapStatePropsType, PropsType>(mapStateToProps, { getUserProfile, getStatus, updateStatus  }), 
    withRouter
    //@ts-ignore
)(ProfileContainer);



