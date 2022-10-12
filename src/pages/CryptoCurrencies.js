import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import CryptoCard from "../components/CryptoCard";

export default function CryptoCurrencies() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://coinranking1.p.rapidapi.com/coins?limit=100", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff7061690dmshfd3e9f86e03558ap172814jsne4ba9b39c8b0",
      },
    })
      .then((res) => res.json())
      .then((alldata) => {
        setData(alldata.data);
      });
  }, []);
  console.log(data);

  return (
    data &&
    data.coins.map((coindata) => (
      <Box key={coindata.uuid} style={{ marginLeft: 250 }}>
        <Container>
          <div className="crypto-crads">
            <CryptoCard data={coindata} />
          </div>
        </Container>
      </Box>
    ))
  );
}
