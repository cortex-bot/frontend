import React, { useState } from 'react';
import ShowSelectedStocks from './ShowSelectedStocks';
import GenerateSignalsPanel from './GenerateSignalsPanel';

const GenerateSignals = () => {
  const [stockList, setStockList] = useState([]);

   const[stockBucketName,setStockBucketName] = useState("");

  return (
    <div className="flex flex-row  ">
      <div className="flex-grow bg-white bg-opacity-75 rounded-lg shadow-lg mx-4 my-2 p-4">
        <ShowSelectedStocks stockList={stockList} updateStockList={setStockList} stockListName={stockBucketName} />
      </div>

      <div className="flex-shrink bg-white bg-opacity-75 rounded-lg shadow-lg mx-4 my-2 p-4">
        <GenerateSignalsPanel updateStockList={setStockList} updateStockBucketName={setStockBucketName} stockList={stockList} />
      </div>
    </div>
  );
}

export default GenerateSignals;
