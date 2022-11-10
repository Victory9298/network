import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route } from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from "redux";
import { withRouter } from 'react-router-dom';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        else {
            return (
                <div className='app-wrapper'>
                    <HeaderContainer />
                    <Navbar />
                    <div className='app-wrapper-content'>
                        <Route path="/profile/:userId?"
                            render={withSuspense(ProfileContainer)}/>
                        <Route path="/dialogs"
                            render={withSuspense(DialogsContainer)}/>
                        <Route path="/users"
                            render={() => <UsersContainer />} />
                        <Route path="/login"
                            render={() => <LoginPage />} />

                        <Route path="/music"
                            render={() => <Music />} />
                        <Route path="/news"
                            render={() => <News />} />
                        <Route path="/settings"
                            render={() => <Settings />} />
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);
