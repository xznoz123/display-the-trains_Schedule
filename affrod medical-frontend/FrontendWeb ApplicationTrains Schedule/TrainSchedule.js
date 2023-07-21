import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://20.244.56.144/train"; // Replace this with your actual API base URL
const ACCESS_TOKEN = "your_access_token"; // Replace this with the actual access token obtained from the API

const CustomTrainSchedule = () => {
  const { trainNumber } = useParams();
  const [trainData, setTrainData] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch a single train data based on trainNumber
    axios
      .get(`${API_BASE_URL}/trains/${trainNumber}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        setTrainData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching train data", error);
      });
  }, [trainNumber]);

  if (!trainData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{trainData.trainName}</h2>
      <p>Train Number: {trainData.trainNumber}</p>
      <p>
        Departure Time: {trainData.departureTime.Hours}:{trainData.departureTime.Minutes} (Delayed by {trainData.delayedBy} minutes)
      </p>
      <p>Available Sleeper Seats: {trainData.seatsAvailable.sleeper}</p>
      <p>Available AC Seats: {trainData.seatsAvailable.AC}</p>
      <p>Price for Sleeper: {trainData.price.sleeper}</p>
      <p>Price for AC: {trainData.price.AC}</p>
    </div>
  );
};

export default CustomTrainSchedule;
