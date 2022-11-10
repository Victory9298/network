import React, { Component } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(50);

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.field} name='newPostText' component={Textarea} placeholder={"Post message"}
                    validate={[required, maxLength10]} />
            </div>
            <div>
                <button className= {s.postButton}>Add post</button>
            </div>
        </form>
    )
}

AddNewPostForm = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm);

const MyPosts = React.memo(props => {

        let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post message={[p.message]} key={[p.id]} likes={[p.likesCount]} />);
        
        let newPostElement = React.createRef();

        let onAddPost = (values) => {
            props.addPost(values.newPostText);
        }

        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <AddNewPostForm onSubmit={onAddPost} />
                <div className={s.postsHeader}>
                All posts
                </div>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        )

});

export default MyPosts; 