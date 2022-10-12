import React from "react";
import "./CryptoCard.css";

export default function CryptoCard({ data }) {
  return (
    <div className="card">
      <div className="card-title">
        <div>{data.name}</div>
        <div>
          <img src={data.iconUrl} alt="" style={{ width: "35px" }} />
        </div>
      </div>
      <div className="card-desc">
        <p>Price:{data.btcPrice}</p>
        <p>Market Cap:{data.marketCap}</p>
        <p>Daily Change:{data.change}</p>
      </div>
    </div>
  );
}
