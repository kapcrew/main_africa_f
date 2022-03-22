import React from 'react';
import './filter.css'


const Filter = () => {

  return (
    <div className='filter section__padding'>
      <div className="filter-bottom">
        <div className="filter-bottom-input">
          <select>
            <option>Category</option>
            <option>Art</option>
            <option>Audio</option>
            <option>Video</option>
            <option>Collectibles</option>
          </select>
          <select>
            <option>All</option>
          </select>
          <select>
            <option>All</option>
          </select>
          <select>
            <option>All</option>
          </select>
          <select>
            <option>All</option>
            <option>Art</option>
            <option>Audio</option>
            <option>Video</option>
            <option>Collectibles</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
