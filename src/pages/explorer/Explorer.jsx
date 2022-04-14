import React from 'react';
import {Bids,Filter,Card, Button} from '../../components'
import Data from "./Data";
import { useState} from 'react'



const Explorer = () => {

  /*Constants*/
  const [item, setItem] = useState(Data);
  const [newItem_title, setItem_title] = useState(Data);
  const [newItem_collection, setItem_collection] = useState(Data);

  const [ price, setPrice ] = useState(40);

  /*Фильтр по Категории*/
  const menuItems = [...new Set(Data.map((Val) => Val.category))];
  const filterItem = (curcat) => {
    const newItem = Data.filter((newVal,) => {
      return newVal.category === curcat;
    });
    setItem(newItem);
  };

  /*********************/

  /*Фильтр по названию*/
  const menuItems_title = [...new Set(Data.map((Val) => Val.title))];
  const filterItem_title = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.title === curcat;
    });
    setItem(newItem);
  };

  /*********************/

  /*Фильтр по Коллекции*/
  const menuItems_collection = [...new Set(Data.map((Val) => Val.collection))];
  const filterItem_collection = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.collection === curcat;
    });
    setItem(newItem);
  };
  /*********************/

  /*Фильтр по цене*/
  const handleInput = (e)=>{
    setPrice( e.target.value );
  }

  /*********************/

  /****Filter***********/

  const [filteredList, setFilteredList] = useState(Data);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState();

  const filterByBrand = (filteredData) => {
    // Avoid filter for empty string
    if (!selectedBrand) {
      return filteredData;
    }

    const filteredCars = filteredData.filter(
      (Data) => Data.name.split(" ").indexOf(selectedBrand) !== -1
    );
    return filteredCars;
  };

  /*********************/






  return <div>
  {/*<Filter title="Test" />
  <input type="range" onInput={ handleInput } />
  <h1>Price: { price }</h1>*/}

  <div className='filter section__padding'>
  <div className="filter-bottom">
  <div className="filter-bottom-input">
  <Button
  filterItem={filterItem}
  setItem={setItem}
  menuItems={menuItems}
  title = "Type"
  />
  <Button
  filterItem={filterItem_title}
  setItem={newItem_title}
  menuItems={menuItems_title}
  title = "Name"

  />
  <Button
  filterItem={filterItem_collection}
  setItem={newItem_collection}
  menuItems={menuItems_collection}
  title = "Collection"

  />
  </div>
  </div>
  </div>

  {/*<Button
  filterItem={filterItem}
  setItem={setItem}
  menuItems={menuItems}
  />
  <Button
  filterItem={filterItem_title}
  setItem={newItem_title}
  menuItems={menuItems_title}
  />
  {/*<Bids title="Test" />*/}
  <Card item={item} title="Explore" />
  </div>;
};

export default Explorer;
