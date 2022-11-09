import {
  Autocomplete,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Filter from "../components/Filter";
import moment from "moment";
import { useFetchApi } from "../hooks/useFetchApi";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function News() {
  const [value, setValue] = useState(null);

  const {
    data: news,
    loading,
    error,
  } = useFetchApi(
    `https://bing-news-search1.p.rapidapi.com/news/search?q=${value?.name}&safeSearch=Off&t
  extFormat=Raw&freshness=Day&count=12`,
    value
  );

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  const top100Films = () => [
    {
      name: "Cryptocurrency",
    },
    {
      name: "Bitcoin",
    },
    {
      name: "Ethereum",
    },
    {
      name: "Tether USD",
    },
    {
      name: "BnB",
    },
    {
      name: "USDC",
    },
    {
      name: "Binance USD",
    },
    {
      name: "XRP",
    },
    {
      name: "Cardano",
    },
    {
      name: "Dogecoin",
    },
    {
      name: "Polygon",
    },
    {
      name: "Solana",
    },
    {
      name: "Chainlink",
    },
    {
      name: "Polkadot",
    },
    {
      name: "Tron",
    },
    {
      name: "Lido Staked Ether",
    },
    {
      name: "Shiba Inu",
    },
    {
      name: "Dai",
    },
    {
      name: "Wrapped Ether",
    },
    {
      name: "OKB",
    },
    {
      name: "Uniswap",
    },
    {
      name: "Wrapped BTC",
    },
    {
      name: "Avalanche",
    },
    {
      name: "PancakeSwap",
    },
    {
      name: "Litecoin",
    },
    {
      name: "Cosmos",
    },
    {
      name: "BitDAO",
    },
    {
      name: "Ethereum Classic ",
    },
    {
      name: "Monero",
    },
    {
      name: "Algorand",
    },
    {
      name: "Cronos",
    },
    {
      name: "Stellar",
    },
    {
      name: "Bitcoin Cash",
    },
    {
      name: "WEMIX TOKEN",
    },
    {
      name: "VeChain",
    },
    {
      name: "NEAR Protocol",
    },
    {
      name: "Filecoin",
    },
    {
      name: "Flow",
    },
    {
      name: "Quant",
    },
    {
      name: "Huobi Token",
    },
    {
      name: "EnergySwap",
    },
    {
      name: "Hedera",
    },
    {
      name: "Frax",
    },
    {
      name: "Decentraland",
    },
    {
      name: "Terra Classic",
    },
    {
      name: "Chiliz",
    },
    {
      name: "Elrond",
    },
  ];

  const defaultProps = {
    options: top100Films(),
    getOptionLabel: (option: FilmOptionType) => option.name,
  };

  return (
    news && (
      <Box style={{ marginLeft: 250 }}>
        <Autocomplete
          {...defaultProps}
          id="disable-clearable"
          disableClearable
          value={value}
          onChange={(event: any, newValue: FilmOptionType | null) => {
            setValue(newValue);
          }}
          sx={{ marginBottom: "25px", width: "25%", marginTop: "20px" }}
          renderInput={(params) => (
            <TextField {...params} label="Select a crypto" variant="standard" />
          )}
        />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {news.value.map((newsData, index) => (
            <Grid item key={index}>
              <Item style={{ padding: "0", cursor: "pointer" }}>
                <Card sx={{ maxWidth: 345, minHeight: 345 }}>
                  {newsData?.image?.thumbnail?.contentUrl ? (
                    <CardMedia
                      component="img"
                      sx={{
                        height: "100px",
                        width: "150px",
                        margin: "20px 0px 0px 100px",
                        borderRadius: "20px",
                      }}
                      image={newsData?.image?.thumbnail?.contentUrl}
                      alt="green iguana"
                    />
                  ) : (
                    <Card height="140" />
                  )}
                  <CardContent>
                    <Typography
                      sx={{ textAlign: "left" }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {newsData.name}
                    </Typography>

                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {(newsData?.description)
                        .split(" ")
                        .slice(0, 10)
                        .join(" ") + "..."}
                    </Typography>

                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Avatar
                        alt="Cindy Baker"
                        src={
                          newsData?.provider[0]?.image?.thumbnail?.contentUrl
                        }
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "15px", margin: "8px 40px 0px 0px" }}
                      >
                        {newsData?.provider[0]?.name}
                      </Typography>
                      <Typography sx={{ marginTop: "8px" }}>
                        {moment(newsData.datePublished).fromNow()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
        <Filter />
      </Box>
    )
  );
}
