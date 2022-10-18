import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  List,
  ListItem,
  Grid,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart } from "../components/Chart";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import {
  GridGoldenratio,
  StackedLineChart,
  EmojiEvents,
} from "@mui/icons-material";
import Filter from "../components/Filter";

export default function CurrencyDetails() {
  const params = useParams();
  const [Currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://coinranking1.p.rapidapi.com/coin/${params.uuid}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff7061690dmshfd3e9f86e03558ap172814jsne4ba9b39c8b0",
      },
    })
      .then((res) => res.json())
      .then((allCurrency) => {
        setCurrency(allCurrency.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    Currency && (
      <Box style={{ marginLeft: 250 }}>
        <Container>
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "#0071bd",
                fontWeight: "700",
                margin: "40px 0px 10px 0px",
              }}
            >
              {Currency.coin.name} ({Currency.coin.symbol}) Price
            </Typography>
            <br></br>
            <Typography sx={{ color: "gray", marginBottom: "20px" }}>
              {Currency.coin.name} live price in US Dollar (USD). View value
              statistics, market cap and supply.
            </Typography>
            <Divider />
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "20%", margin: "20px 900px 20px 0px" }}>
              <InputLabel id="demo-simple-select-label">H</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="H"
                // onChange={handleChange}
              >
                <MenuItem value={3}>3h</MenuItem>
                <MenuItem value={24}>24h</MenuItem>
                <MenuItem value={7}>7d</MenuItem>
                <MenuItem value={30}>30d</MenuItem>
                <MenuItem value={1}>1y</MenuItem>
                <MenuItem value={3}>3m</MenuItem>
                <MenuItem value={3}>3y</MenuItem>
                <MenuItem value={5}>5y</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h4"
              sx={{ color: "#0071bd", fontWeight: "700" }}
            >
              Bitcoin Price Chart
            </Typography>
            <Typography sx={{ fontWeight: "700" }}>
              <span style={{ margin: "50px" }}>
                Change: {Currency.coin.change}
              </span>
              Current {Currency.coin.name} Price:$
              {Math.sign(Currency.coin.price) *
                (Math.abs(Currency.coin.price) / 1000).toFixed(1) +
                "k"}
            </Typography>
          </Box>
          <Box>
            <Chart params={params.uuid} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "left",
            }}
          >
            <Box>
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ mt: 4, mb: 2, fontWeight: "600", color: "#0071bd" }}
                  variant="h5"
                  component="div"
                >
                  Bitcoin Value Statistics
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  An overview showing the statistics of Ethereum, such as the
                  base
                  <br /> and quote currency, the rank, and trading volume.
                </Typography>
                <List>
                  <ListItem>
                    <IconButton edge="end" aria-label="delete">
                      <LocalAtmIcon />
                    </IconButton>
                    <ListItemText primary="Price To USD" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      $
                      {Math.sign(Currency.coin.price) *
                        (Math.abs(Currency.coin.price) / 1000).toFixed(1) +
                        "k"}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <IconButton>
                      <GridGoldenratio />
                    </IconButton>
                    <ListItemText primary="Rank" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      {Currency.coin.rank}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <IconButton edge="end" aria-label="delete">
                      <StackedLineChart />
                    </IconButton>
                    <ListItemText primary="24h Volume" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      {Currency.coin.lowVolume}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <IconButton edge="end" aria-label="delete">
                      <LocalAtmIcon />
                    </IconButton>
                    <ListItemText primary="Market Cap" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      $
                      {Math.sign(Currency.coin.price) *
                        (Math.abs(Currency.coin.price) / 1000).toFixed(1) +
                        "B"}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <IconButton edge="end" aria-label="delete">
                      <EmojiEvents />
                    </IconButton>
                    <ListItemText primary="All-time-high(daily avg.)" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      ${Number(Currency.coin.allTimeHigh.price).toFixed(1)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </List>
              </Grid>
            </Box>
            <Box>
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ mt: 4, mb: 2, fontWeight: "600", color: "#0071bd" }}
                  variant="h5"
                  component="div"
                >
                  Other Stats Info
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  An overview showing the statistics of Ethereum, such as the
                  base
                  <br /> and quote currency, the rank, and trading volume.
                </Typography>

                <List>
                  <ListItem>
                    <IconButton edge="end" aria-label="delete">
                      <LocalAtmIcon />
                    </IconButton>
                    <ListItemText primary="Price To USD" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      $
                      {Math.sign(Currency.coin.price) *
                        (Math.abs(Currency.coin.price) / 1000).toFixed(1) +
                        "k"}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <IconButton>
                      <GridGoldenratio />
                    </IconButton>
                    <ListItemText primary="Rank" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      {Currency.coin.rank}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <IconButton edge="end" aria-label="delete">
                      <StackedLineChart />
                    </IconButton>
                    <ListItemText primary="24h Volume" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      {Currency.coin.lowVolume}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <IconButton edge="end" aria-label="delete">
                      <LocalAtmIcon />
                    </IconButton>
                    <ListItemText primary="Market Cap" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      $
                      {Math.sign(Currency.coin.price) *
                        (Math.abs(Currency.coin.price) / 1000).toFixed(1) +
                        "B"}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <IconButton edge="end" aria-label="delete">
                      <EmojiEvents />
                    </IconButton>
                    <ListItemText primary="All-time-high(daily avg.)" />
                    <Typography sx={{ marginLeft: "35px", fontWeight: "700" }}>
                      ${Number(Currency.coin.allTimeHigh.price).toFixed(1)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </List>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "left",
              width: "100%",
              gap: "10%",
              marginTop: "30px",
            }}
          >
            <Grid item xs={12} md={6} sx={{ width: "40%" }}>
              <Typography
                variant="h5"
                sx={{ color: "#0071bd", fontWeight: "700" }}
              >
                What is Ethereum?
              </Typography>
              <div
                dangerouslySetInnerHTML={{ __html: Currency.coin.description }}
              ></div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: "40%" }}>
              <Typography
                variant="h5"
                sx={{ color: "#0071bd", fontWeight: "700" }}
              >
                Ethereum Links
              </Typography>
              <List>
                {Currency.coin.links.map((link) => (
                  <>
                    <ListItem key={link.name}>
                      <ListItemText primary={link.type} />
                      <Typography
                        sx={{
                          marginLeft: "35px",
                          fontWeight: "700",
                          color: "#0071bd",
                        }}
                      >
                        {link.name}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>
            </Grid>
          </Box>
        </Container>
        <Filter />
      </Box>
    )
  );
}
