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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function News() {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);

  console.log(news);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=${value?.name}&safeSearch=Off&t`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "ff7061690dmshfd3e9f86e03558ap172814jsne4ba9b39c8b0",
        },
      }
    )
      .then((res) => res.json())
      .then((allnews) => {
        setNews(allnews);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.log(error);
      });
  }, [value]);
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
          sx={{ marginBottom: "20px", width: "25%" }}
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
              <Item>
                <Card sx={{ maxWidth: 345, minHeight: 345 }}>
                  {newsData?.image?.thumbnail?.contentUrl ? (
                    <CardMedia
                      component="img"
                      sx={{
                        height: "100px",
                        width: "150px",
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
                      {newsData?.description}
                    </Typography>
                    {/* <CardMedia
                      component="img"
                      sx={{ height: "100px", width: "150px" }}
                      image={newsData?.provider?.image?.thumbnail?.contentUrl}
                      alt="green iguana"
                    /> */}
                    <Avatar
                      alt="Cindy Baker"
                      src={newsData?.provider[0]?.image?.thumbnail?.contentUrl}
                    />
                    {/* <Typography variant="h6" sx={{ fontSize: "15px" }}>
                      {newsData?.provider[0]?.name}
                    </Typography> */}
                  </CardContent>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  );
}
