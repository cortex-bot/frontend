import React, { useState } from 'react';
// @ts-expect-error TS(6142): Module './ShowSelectedStocks' was resolved to 'D:/... Remove this comment to see the full error message
import ShowSelectedStocks from './ShowSelectedStocks';
// @ts-expect-error TS(6142): Module './GenerateSignalsPanel' was resolved to 'D... Remove this comment to see the full error message
import GenerateSignalsPanel from './GenerateSignalsPanel';

const GenerateSignals = () => {
  const [stockList, setStockList] = useState([]);

   const[stockBucketName,setStockBucketName] = useState("");

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
