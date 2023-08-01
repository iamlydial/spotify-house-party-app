import React, { useState } from "react";
import {
  FormControlLabel,
  FormHelperText,
  Grid,
  RadioGroup,
  Typography,
  Radio,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";

const CreateRoomPage = () => {
  const defaultVotes = 2;

  //use of useState hooks to define state
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [roomButtonPressed, setRoomButtonPressed] = useState("");

  //methods section
  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === true);
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("http://127.0.0.1:8000/api/create/", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback state</div>
            </FormHelperText>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadioGroup
                row
                defaultValue="true"
                onChange={handleGuestCanPauseChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" />}
                  label="Play/Pause"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="secondary" />}
                  label="No Control"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </div>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={defaultVotes}
              onChange={handleVotesChange}
              inputProps={{ min: 1, style: { textAlign: "center" } }}
            />
            <FormHelperText>
              <div align="center">Votes Requires To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateRoomPage;
