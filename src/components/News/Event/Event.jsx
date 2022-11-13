import React from "react";
import Article from '../Article/Article.jsx';

const Event = (propTypes) => { 
    class Event extends React.Component {
    // удалили старое состояние counter: 0 (старый ненужный код)
    renderNews = () => {
      const { data } = this.props
      let newsTemplate = null

      if (data.length) {
        newsTemplate = data.map(function(item) {
          return <Article key={item.id} data={item}/>
        })
      } else {
        newsTemplate = <p>К сожалению новостей нет</p>
      }

      return newsTemplate
    }
    render() {
      const { data } = this.props

      return (
        <div className='news'>
          {this.renderNews()}
          {
            data.length ? <strong className={'news__count'}>Всего новостей: {data.length}</strong> : null
          }
        </div>
      );
    }
  }

  Event.propTypes = {
    data: propTypes.array.isRequired
  }
};
  
  export default Event;