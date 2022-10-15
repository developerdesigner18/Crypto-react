import { Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { Chart } from "../components/Chart";

export default function CurrencyDetails() {
  const params = useParams()
  const [Currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    setLoading(true)
    fetch(`https://coinranking1.p.rapidapi.com/coin/${params.uuid}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff7061690dmshfd3e9f86e03558ap172814jsne4ba9b39c8b0",
      },
    })
      .then((res) => res.json())
      .then((allCurrency) => {
        
       setCurrency(allCurrency.data)
       setLoading(false)
      }).catch(error => {
        setError(error.message)
        setLoading(false)
        console.log(error)
      })
  }, []);

  console.log(Currency);

  if(loading){
    return <h1>loading</h1>
  }
  if(error){
    return <h1>{error}</h1>
  }
  return Currency && <Box style={{ marginLeft: 250 }}>{Currency.coin.uuid}
<Container>
  <Box>
    <Typography variant="h3" sx={{color:"#0071bd",fontWeight:"700"}}>{Currency.coin.name} ({Currency.coin.symbol}) Price</Typography><br></br>
    <Typography>Bitcoin live price in US Dollar (USD). View value statistics, market cap and supply.</Typography>
   <Divider/>
  </Box>
  <Box sx={{ minWidth: 120 }}>
  <FormControl sx={{width:"20%",margin:"10px 700px 0px 0px"}}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Age"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
  </Box>
  <Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Typography variant="h4" sx={{color:"#0071bd"}}>Bitcoin Price Chart</Typography>
    <Typography>Change: -3.14%</Typography>
  </Box>
  <Box>
  <Chart params={params.uuid} />
  </Box>
  
  </Container>
  </Box>
  
 
}
