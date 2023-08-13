import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const JoinRoomPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);
  const [clickJoinRoom, setClickJoinRoom] = useState(null);

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
    setError(false);
  };

  const navigate = useNavigate();

  const handleRoomButtonClicked = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };

    fetch("http://127.0.0.1:8000/api/join", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse response JSON if successful
        } else {
          throw new Error("Room not found"); // Throw an error if not successful
        }
      })
      .then((data) => {
        if (data.message === "Room Joined!") {
          navigate("/room/" + roomCode); // Navigate on success
        } else {
          setError(true); // Set the error state to true
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true); // Set the error state to true
      });
  };

  return (
    <>
      <Grid className="main-grid" container spacing={1}>
        <Grid items xs={12} align="center">
          <Typography variant="h4">Join a Room</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error="error"
            label="Enter a Room Code"
            placeholder="Ex: 012345"
            value={roomCode}
            helperText={error ? "Room not found" : ""}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            onClick={handleRoomButtonClicked}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default JoinRoomPage;
