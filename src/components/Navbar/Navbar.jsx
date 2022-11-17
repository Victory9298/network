import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return   <nav className={s.nav}>
    <ul >
      <li className={s.item}>
        <NavLink to="/profile" className = {navData => navData.isActive ? s.active : s.item }>Profile</NavLink>
      </li>
      <li className={`${s.item} ${s.active}`}>
        <NavLink to="/dialogs" className = {navData => navData.isActive ? s.active : s.item }>Messages</NavLink>
      </li>
      <li className={`${s.item} ${s.active}`}>
        <NavLink to="/users" className = {navData => navData.isActive ? s.active : s.item }>Users</NavLink>
      </li>
      <li className={s.item}>
        <NavLink to="/news" className = {navData => navData.isActive ? s.active : s.item }>News</NavLink>
      </li>
      <li className={s.item}>
        <NavLink to="/music" className = {navData => navData.isActive ? s.active : s.item }>Music</NavLink>
      </li>
      <li className={s.item}>
        <NavLink to="./photos" className = {navData => navData.isActive ? s.active : s.item }>Photos</NavLink>
      </li>
      <li className={s.item}>
        <NavLink to="./quiz" className = {navData => navData.isActive ? s.active : s.item }>Quiz</NavLink>
      </li>
    </ul>
  </nav>
}

export default Navbar; 