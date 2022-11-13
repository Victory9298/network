import React from "react";
import ReactDOM from "react";

const Add = (propTypes) => {class Add extends React.Component {
    state = {
      name: '',
      text: '',
      bigText: '', // добавлен bigText
      agree: false,
    }
    onBtnClickHandler = (e) => {
      e.preventDefault()
      const { name, text, bigText } = this.state // вытащили так же и bigText
      this.props.onAddNews({
        id: +new Date(), // в id сохраняется количество миллисекунд прошедших с 1 января 1970 года в часовом поясе UTC 
        author: name, // name сохраняем в поле author
        text,
        bigText,
      })
    }
    handleChange = (e) => {
      const { id, value } = e.currentTarget
      this.setState({ [id]: e.currentTarget.value })
    }
    handleCheckboxChange = (e) => {
      this.setState({ agree: e.currentTarget.checked })
    }
    validate = () => {
      const { name, text, agree } = this.state
      if (name.trim() && text.trim() && agree) {
        return true
      }
      return false
    }
    render() {
      const { name, text, bigText, agree } = this.state
      return (
        <form className='add'>
          <input
            id='name'
            type='text'
            onChange={this.handleChange}
            className='add__author'
            placeholder='Ваше имя'
            value={name}
          />
          <textarea
            id='text'
            onChange={this.handleChange}
            className='add__text'
            placeholder='Текст новости'
            value={text}
          ></textarea>
          {/* добавили bigText */}
          <textarea
            id='bigText'
            onChange={this.handleChange}
            className='add__text'
            placeholder='Текст новости подробно'
            value={bigText}
          ></textarea>
          <label className='add__checkrule'>
            <input type='checkbox' onChange={this.handleCheckboxChange} /> Я согласен с правилами
          </label>
          <button
            className='add__btn'
            onClick={this.onBtnClickHandler}
            disabled={!this.validate()}>
            Показать alert
          </button>
        </form>
      )
    }
  }

  Add.propTypes = {
    onAddNews: propTypes.func.isRequired,
  }};

  export default Add;