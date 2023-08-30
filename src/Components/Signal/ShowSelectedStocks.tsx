import "./ShowSelectedStocks.css";
import React from 'react';


const ShowSelectedStocks = ({ stockList, updateStockList,stockListName }) => {
    const handleCutStock = (stock) => {
      // Remove stock from the list
      const updatedList = stockList.filter(item => item !== stock);
      updateStockList(updatedList);
    };
  
    return (
      <div className="show-selected-stocks-container">
      <h2 className="cortexHeading">Stock Bucket List: <i><u>{stockListName}</u></i></h2>
      <div className="show-selected-stocks-list">
        {stockList.map(stock => (
          <div key={stock} className="show-selected-stocks-row animate__animated animate__fadeIn">
            <span className="mr-3">{stock}</span> 
            <button className="show-selected-stocks-button" onClick={() => handleCutStock(stock)}>x</button>
          </div>
        ))}
      </div>
    </div>
    );
  };
  

export default ShowSelectedStocks;
