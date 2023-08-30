import "./ShowSelectedStocks.css";
import React from 'react';


const ShowSelectedStocks = ({
  stockList,
  updateStockList,
  stockListName
}: any) => {
    const handleCutStock = (stock: any) => {
      // Remove stock from the list
      const updatedList = stockList.filter((item: any) => item !== stock);
      updateStockList(updatedList);
    };
  
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="show-selected-stocks-container">
            <h2 className="cortexHeading">Stock Bucket List: <i><u>{stockListName}</u></i></h2>
            <div className="show-selected-stocks-list">
                {stockList.map((stock: any) => <div key={stock} className="show-selected-stocks-row animate__animated animate__fadeIn">
                    <span className="mr-3">{stock}</span> 
                    <button className="show-selected-stocks-button" onClick={() => handleCutStock(stock)}>x</button>
        </div>)}
      </div>
    </div>
    );
  };
  

export default ShowSelectedStocks;
