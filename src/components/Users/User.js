import React from "react";
import styles from './users.module.css';
import userPhoto from './../../assets/images/no_image.png';
import { NavLink } from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {

    return <div className={styles.userCard}>
        <span>
            <div>
                <NavLink to={'./../profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button className={styles.userButton} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id);
                    }}>Unfollow</button>
                    : <button className={styles.userButton} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        follow(user.id);
                    }}>Follow</button>}
            </div>
        </span>
        <span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                {/* <div>{user.location.country}</div> */}
                {/* <div>{user.location.city}</div> */}
                   <div>{"Spain"}</div>
                   <div>{"Malaga"}</div>
            </span>
        </span>
    </div>
}

export default User; 