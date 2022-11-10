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
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import CryptoCard from "../components/CryptoCard";
import Filter from "../components/Filter";
import CurrencyDetails from "./CurrencyDetails";
import { useNavigate } from "react-router-dom";
import { useFetchApi } from "../hooks/useFetchApi";
import Mobilemenu from "../components/Mobilemenu";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CryptoCurrencies() {
  // const [data, setData] = useState(null);

  const navigate = useNavigate();

  function handleClick(uuid) {
    navigate(`/crypto/${uuid}`);
  }

  // useEffect(() => {
  //   fetch("https://coinranking1.p.rapidapi.com/coins?limit=100", {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "ff7061690dmshfd3e9f86e03558ap172814jsne4ba9b39c8b0",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((alldata) => {
  //       setData(alldata.data);
  //     });
  // }, []);

  const { data, loading, error } = useFetchApi(
    `https://coinranking1.p.rapidapi.com/coins?limit=100`
  );

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <Box
        className="cryptoMobile"
        style={{ marginLeft: 240, padding: "20px 20px 0px 20px" }}
      >
        <Mobilemenu />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data &&
            data.data.coins.map((coindata, index) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                key={index}
                onClick={() => {
                  handleClick(coindata.uuid);
                }}
              >
                <Item
                  style={{
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <CryptoCard data={coindata} />
                </Item>
              </Grid>
            ))}
        </Grid>

        {/* <Container>
            <Row className="crypto-crads">
            </div>
          </Container> */}
      </Box>
      <Filter />
    </>
  );
}
