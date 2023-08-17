import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

function RoomPage() {
  const defaultVotes = 2;
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/get-room/?roomCode=${roomCode}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
        setIsHost(data.is_host);
      })
      .catch((error) => console.error("Error fetching room details:", error));
  }, [roomCode]);

  const handleButtonLeavePressed = () => {
    const requestOptions = {
      method: "DELETE", // Use DELETE method
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://127.0.0.1:8000/api/leave-room`, requestOptions)
      .then((_response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error leaving room:", error);
      });
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h4">
            Votes: {votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h4">
            Guest Can Pause: {guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h4">
            {typeof isHost === "boolean" && <p>is Host: {isHost.toString()}</p>}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            to="/"
            onClick={handleButtonLeavePressed}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default RoomPage;
