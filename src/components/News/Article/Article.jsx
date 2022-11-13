import React from "react";

const Article = (propTypes) => {
    class Article extends React.Component {
        state = {
          visible: false,
        }
        handleReadMoreClck = (e) => {
          e.preventDefault()
          this.setState({ visible: true })
        }
        render() {
          const { author, text, bigText } = this.props.data
          const { visible } = this.state
          return (
            <div className='article'>
              <p className='news__author'>{author}:</p>
              <p className='news__text'>{text}</p>
              {
                !visible && <a onClick={this.handleReadMoreClck} href="#" className='news__readmore'>Подробнее</a>
              }
              {
                visible && <p className='news__big-text'>{bigText}</p>
              }
            </div>
          )
        }
      }
  
      Article.propTypes = {
        data: propTypes.shape({
          id: propTypes.number.isRequired, // добавили id, это число, обязательно
          author: propTypes.string.isRequired,
          text: propTypes.string.isRequired,
          bigText: propTypes.string.isRequired
        })
      }
  
};

  export default Article;