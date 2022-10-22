import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import image from "../images/cryptocurrency.1548aced3f0605895bac.png";

const drawerWidth = 240;

export default function Sidebar() {
  let navigate = useNavigate();

  const itemlist = [
    {
      text: "Home",
      onclick: () => navigate("/"),
      icon: <HomeIcon />,
    },
    {
      text: "CryptoCurrencies",
      onclick: () => navigate("/cryptoCurrencies"),
      icon: <InsertChartIcon />,
    },
    {
      text: "News",
      onclick: () => navigate("/news"),
      icon: <NewspaperIcon />,
    },
    {
      text: "Exchanges",
      onclick: () => navigate("/exchanges"),
      icon: <AdbIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "black",
            color: "#ddd2d2",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <span className="ant-avatar ant-avatar-lg ant-avatar-circle ant-avatar-image">
            <img src={image} alt="" />
          </span>
          <h2 style={{ paddingLeft: "6px" }}>Cryptoverse</h2>
        </div>

        <List>
          {itemlist.map((item, index) => {
            const { text, icon, onclick } = item;
            return (
              <ListItem button key={text} onClick={onclick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text}></ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
