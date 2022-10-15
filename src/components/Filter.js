import React from "react";

export default function Filter() {
  return (
    <div className="footer">
      <div>
        <h1>
          Cryptoverese <br></br>All Rights Reserved
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div className="link">
          <a href="/">Home</a>
        </div>
        <div className="link">
          <a href="/exchange">Exchange</a>
        </div>
        <div className="link">
          <a href="/news">News</a>
        </div>
      </div>
    </div>
  );
}
