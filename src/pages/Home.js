import React from "react";
import { Box, Container } from "@mui/system";
import {
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import CryptoCard from "../components/CryptoCard";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Filter from "../components/Filter";
import moment from "moment";
import { useFetchApi } from "../hooks/useFetchApi";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const navigate = useNavigate();

  function handleClick(uuid) {
    navigate(`/crypto/${uuid}`);
  }

  function mainpage() {
    navigate("/cryptoCurrencies");
  }

  const {
    data: states,
    loading: stateLoading,
    error: stateError,
  } = useFetchApi(`https://coinranking1.p.rapidapi.com/coins?limit=10`);

  const {
    data: news,
    loading: newsLoading,
    error: newsError,
  } = useFetchApi(`https://bing-news-search1.p.rapidapi.com/news/search?q=null&safeSearch=Off&t
   extFormat=Raw&freshness=Day&count=6`);

  if (stateLoading || newsLoading) {
    return <h1>loading</h1>;
  }
  if (stateError || newsError) {
    return <h1>{"error"}</h1>;
  }

  return (
    <Box style={{ marginLeft: 250 }}>
      <Container>
        <Box>
          <Typography
            variant="h2"
            sx={{
              textAlign: "left",
              fontWeight: "600",
              color: " rgba(0,0,0,.85)",
              fontSize: "30px",
              lineHeight: "1.35",
              marginBottom: ".5em",
            }}
          >
            Global Crypto States
          </Typography>
          <Box
            sx={{
              textAlign: "left",
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              width: "50%",
              cursor: "pointer",
            }}
          >
            <Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ color: "rgba(0,0,0,.45)", fontSize: "15px" }}>
                  Total Crypto Currencies
                </Typography>
                <Typography sx={{ fontSize: "24px" }}>
                  {states?.data?.stats?.total}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ color: "rgba(0,0,0,.45)", fontSize: "15px" }}>
                  Total Market Cap
                </Typography>
                <Typography sx={{ fontSize: "24px" }}>
                  {Math.sign(states?.data?.stats?.totalMarketCap) *
                    (
                      Math.abs(states?.data?.stats?.totalMarketCap) / 1.0e9
                    ).toFixed(1) +
                    "B"}
                </Typography>
              </Box>
              <Box>
                {" "}
                <Typography sx={{ color: "rgba(0,0,0,.45)", fontSize: "15px" }}>
                  Total Markets
                </Typography>
                <Typography sx={{ fontSize: "24px" }}>
                  {Math.sign(states?.data?.stats?.totalMarkets) *
                    (
                      Math.abs(states?.data?.stats?.totalMarkets) / 1.0e3
                    ).toFixed(1) +
                    "k"}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Typography sx={{ color: "rgba(0,0,0,.45)", fontSize: "15px" }}>
                  Total Exchange
                </Typography>
                <Typography sx={{ fontSize: "24px" }}>
                  {states?.data?.stats?.totalExchanges}
                </Typography>
              </Box>
              <Typography sx={{ color: "rgba(0,0,0,.45)", fontSize: "15px" }}>
                Total 24h Volume
              </Typography>
              <Typography sx={{ fontSize: "24px" }}>
                {Math.sign(states?.data?.stats?.total24hVolume) *
                  (
                    Math.abs(states?.data?.stats?.total24hVolume) / 1.0e9
                  ).toFixed(1) +
                  "B"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "left",
                margin: "30px 0px 30px 0px",
                fontWeight: "600",
                color: " rgba(0,0,0,.85)",
                fontSize: "30px",
                lineHeight: "1.35",
                marginBottom: ".5em",
              }}
            >
              Top 10 Cryptocurrencies in the world
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: "#1890ff", fontWeight: "600" }}
              onClick={mainpage}
            >
              Show More
            </Typography>
          </Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {states &&
              states.data.coins.map((coindata, index) => (
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
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              margin: "30px 0px 30px 0px",
              fontWeight: "600",
              color: " rgba(0,0,0,.85)",
              fontSize: "30px",
              lineHeight: "1.35",
              marginBottom: ".5em",
            }}
          >
            Latest Crypto News
          </Typography>
        </Box>

        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 8, md: 12 }}
          >
            {news?.value?.map((newsData, index) => (
              <Grid item key={index}>
                <Item
                  style={{
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <Card sx={{ maxWidth: 345, minHeight: 250 }}>
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
                      {/* <CardMedia
                      component="img"
                      sx={{ height: "100px", width: "150px" }}
                      image={newsData?.provider?.image?.thumbnail?.contentUrl}
                      alt="green iguana"
                    /> */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
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
        </Box>
      </Container>
      <Filter />
    </Box>
  );
}
