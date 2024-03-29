import React from "react";
import s from './Photos.module.css';
import './photos.scss';
import Collection from "../Collection/Collection";

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];


function Photos() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : '' ;
    fetch(`https://636df3e1182793016f3168ca.mockapi.io/photos_collection?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) => (
              <li 
              onClick={()=> setCategoryId(i)}
              className={categoryId=== i ? 'active' : ''} 
              key={obj.name}>{obj.name}</li> 
              )) }
        </ul>
        <input 
        value={searchValue}
        onChange={(e)=> setSearchValue(e.target.value)}
        className="search-input"
        placeholder="Поиск по названию" />
      </div>
      <div className="content"> 
      {isLoading ? (<h2>Идет загрузка...</h2>) :
    
        collections
          .filter((obj)=>{
            return obj.name.toLowerCase().includes(searchValue.toLowerCase())
          })
          .map((obj, index) => (
            <Collection key={index} name={obj.name} images={obj.photos} />
          ))}
          
      </div>
      <ul className="pagination">      
        {[...Array(3)].map((_, i) => (       
          <li onClick={()=> setPage(i+1)}
          className={page===i+1 ? 'active' : ''}>{i+1}</li>
        ))}    
      </ul>
    </div>
  );
}

export default Photos;