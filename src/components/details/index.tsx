import React, { useState } from "react";

const Details = ({ slippage }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const Item = ({ label, value }: any) => {
    return (
      <li className="flex items-center justify-between my-2">
        <span className="">{label}</span>
        <span>{value}</span>
      </li>
    );
  };

  return (
    <div className="p-4 bg-gray-darker">
      {isExpanded ? (
        <>
          {" "}
          <ul className="flex flex-col">
            <Item label="Exchange Rate" value="1 LAND = 1000 EGLD" />
            <Item label="Exchange Rate" value="1 LAND = 1000 EGLD" />
            <Item label="Exchange Rate" value="1 LAND = 1000 EGLD" />
          </ul>
          <div>-</div>
          <ul>
            <Item label="Liquidity provider fee" value="1 LAND = 1000 EGLD" />
            <Item label="Price Impact" value="1 LAND = 1000 EGLD" />
          </ul>
        </>
      ) : (
        <div>Show details</div>
      )}
    </div>
  );
};

export default Details;
