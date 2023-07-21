import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import TrainIcon from "@mui/icons-material/Train";
import TrainSchedule from "./components/TrainSchedule";

const API_BASE_URL = "http://20.244.56.144/train";
const ACCESS_TOKEN = "FKDLjg";

const TrainScheduleApp = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/trains`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        setTrains(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching train data", error);
        setLoading(false);
      });
  }, []);

  console.log("Trains:", trains);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Train Schedule App</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ paddingTop: 20 }}>
        <Routes>
          <Route path="/" element={<TrainList trains={trains} />} />
          <Route path="/train/:trainNumber" element={<TrainSchedule />} />
        </Routes>
      </Container>
    </Router>
  );
};

// TrainList component to display the list of trains
const TrainList = ({ trains }) => {
  if (!Array.isArray(trains) || trains.length === 0) {
    return <div>No trains found.</div>;
  }

  return (
    <List>
      {trains.map((train) => (
        <Link to={`/train/${train.trainNumber}`} key={train.trainNumber} style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon>
              <TrainIcon />
            </ListItemIcon>
            <ListItemText primary={train.trainName} secondary={`Train Number: ${train.trainNumber}`} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default TrainScheduleApp;
