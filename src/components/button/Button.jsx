import React from "react";
import Data from "./Data";

const Buttons = ({ filterItem, setItem, menuItems, title }) => {
  return (
    <>
    <select onClick={(e) => {
    // Use onClick method, for your use case
    console.log(e.target.value);
    filterItem(e.target.value);
  }}>
  <option
    className="btn-dark text-white p-1 px-3 mx-5 fw-bold btn"
    onClick={() => setItem(Data)}
  >
    {title}
  </option>
        {menuItems.map((Val, id) => {
          return (
            <option
              className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold"
              onClick={() => filterItem(Val)}
              key={id}
            >
              {Val}
            </option>
          );
        })}



        </select>
    </>
  );
};

export default Buttons;
