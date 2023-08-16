import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const [roomCode, setRoomCode] = useState(null);

  const navigate = useNavigate();
  const hasRoomCode = roomCode !== null && roomCode !== "";

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code); // Set roomCode directly, not as an object
      });
  }, []);

  useEffect(() => {
    if (hasRoomCode) {
      navigate("/room/" + roomCode);
    }
  }, [hasRoomCode, navigate]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join A Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
