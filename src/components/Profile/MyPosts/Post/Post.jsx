import React from 'react';
import s from './Post.module.css';

const Post = (props) => {

  return (
    <div className={s.item}>
      <img className={s.postImg} src="https://w7.pngwing.com/pngs/672/1022/png-transparent-writing-computer-icons-blog-write-miscellaneous-angle-text.png" alt="Item" />
      {props.message}
      <div>
        <div className={s.likeBlock}> 
          {props.likes} likes
          <img className={s.likeImg} src='https://klike.net/uploads/posts/2020-03/1584090672_2.jpg' alt='Like'/>
         </div>
      </div>
    </div>)
}

export default Post; 