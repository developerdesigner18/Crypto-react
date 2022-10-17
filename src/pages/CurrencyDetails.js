import { Divider, FormControl, InputLabel, MenuItem, Select, Typography,List,ListItem,Grid,IconButton,ListItemAvatar,Avatar,ListItemText } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { Chart } from "../components/Chart";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {GridGoldenratio,StackedLineChart,EmojiEvents} from '@mui/icons-material';


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
  <Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Box>
    {/* <Typography variant="h6" sx={{fontWeight:"600",color:"#0071bd"}}>Bitcoin Value Statistics</Typography>
      <Box sx={{display:"flex",justifyContent:"space-between"}}>
        <Typography><LocalAtmIcon/></Typography>
        <Typography sx={{marginRight: "45px"}}>Price To USD</Typography>
        <Typography sx={{marginLeft:"15px",fontWeight:"700"}}>{Math.sign(Currency.coin.price)*((Math.abs(Currency.coin.price)/1000).toFixed(1)) + 'k'}</Typography>
      </Box>
      <Divider/>
      <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Typography><GridGoldenratio/></Typography>
        <Typography sx={{marginRight: "45px"}}>Price To USD</Typography>
        <Typography sx={{marginLeft:"15px",fontWeight:"700"}}>{Math.sign(Currency.coin.price)*((Math.abs(Currency.coin.price)/1000).toFixed(1)) + 'k'}</Typography>
      </Box> */}
      <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 ,fontWeight:"600",color:"#0071bd"}} variant="h6" component="div">
          Bitcoin Value Statistics
          </Typography>
         
            <List>
                <ListItem>
                  <IconButton edge="end" aria-label="delete">
                      <LocalAtmIcon/>
                    </IconButton>
                  <ListItemText
                    primary="Price To USD"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>${Math.sign(Currency.coin.price)*((Math.abs(Currency.coin.price)/1000).toFixed(1)) + 'k'}</Typography>
                </ListItem>   
                <Divider/>  
                <ListItem>
                  <IconButton>
                      <GridGoldenratio/>
                    </IconButton>
                  <ListItemText
                    primary="Rank"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>{Currency.coin.rank}</Typography>
                </ListItem>   
                <Divider/>  
                <ListItem>
                  <IconButton edge="end" aria-label="delete">
                      <StackedLineChart/>
                    </IconButton>
                  <ListItemText
                    primary="24h Volume"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>{Currency.coin.lowVolume}</Typography>
                </ListItem>   
                <Divider/>  
                <ListItem>
                  <IconButton edge="end" aria-label="delete">
                  <LocalAtmIcon/>
                    </IconButton>
                  <ListItemText
                    primary="Market Cap"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>${Math.sign(Currency.coin.price)*((Math.abs(Currency.coin.price)/1000).toFixed(1)) + 'B'}</Typography>
                </ListItem>   
                <Divider/>  
                <ListItem>
                  <IconButton edge="end" aria-label="delete">
                  <EmojiEvents/>
                    </IconButton>
                  <ListItemText
                    primary="All-time-high(daily avg.)"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>${Number(Currency.coin.allTimeHigh.price).toFixed(1)}</Typography>
                </ListItem>   
                <Divider/>  
               
            </List>
           
          
        </Grid>
    </Box>
    <Box>
    <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 ,fontWeight:"600",color:"#0071bd"}} variant="h6" component="div">
          Other Stats Info
          </Typography>
         
            <List>
                <ListItem>
                  <IconButton edge="end" aria-label="delete">
                      <LocalAtmIcon/>
                    </IconButton>
                  <ListItemText
                    primary="Price To USD"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>${Math.sign(Currency.coin.price)*((Math.abs(Currency.coin.price)/1000).toFixed(1)) + 'k'}</Typography>
                </ListItem>   
                <Divider/>  
                <ListItem>
                  <IconButton>
                      <GridGoldenratio/>
                    </IconButton>
                  <ListItemText
                    primary="Rank"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>{Currency.coin.rank}</Typography>
                </ListItem>   
                <Divider/>  
                <ListItem>
                  <IconButton edge="end" aria-label="delete">
                      <StackedLineChart/>
                    </IconButton>
                  <ListItemText
                    primary="24h Volume"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>{Currency.coin.lowVolume}</Typography>
                </ListItem>   
                <Divider/>  
                <ListItem>
                  <IconButton edge="end" aria-label="delete">
                  <LocalAtmIcon/>
                    </IconButton>
                  <ListItemText
                    primary="Market Cap"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>${Math.sign(Currency.coin.price)*((Math.abs(Currency.coin.price)/1000).toFixed(1)) + 'B'}</Typography>
                </ListItem>   
                <Divider/>  
                <ListItem>
                  <IconButton edge="end" aria-label="delete">
                  <EmojiEvents/>
                    </IconButton>
                  <ListItemText
                    primary="All-time-high(daily avg.)"
                  />
                   <Typography sx={{marginLeft:"35px",fontWeight:"700"}}>${Number(Currency.coin.allTimeHigh.price).toFixed(1)}</Typography>
                </ListItem>   
              <Divider/>      
            </List>
        </Grid>
    </Box>
  </Box>
  </Container>
  </Box>
  
 
}
