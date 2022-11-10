import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';


const ProfileInfo = ({profile, status, updateStatus}) => {

  if (!profile) {
    return <Preloader />
  }

  return <div>
    <div>
      <img className={s.noPhotoImage} src='https://vjoy.cc/wp-content/uploads/2020/10/1-36-1024x1024-1.jpg'></img>
    </div>
    <div className={s.descriptionBlock}>
      {/* <img src={profile.photos.large} /> */}
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
    </div>
  </div>
}

export default ProfileInfo;