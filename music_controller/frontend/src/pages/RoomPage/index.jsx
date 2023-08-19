import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import CreateRoomPage from "../CreateRoomPage/index.jsx";

function RoomPage() {
  const defaultVotes = 2;
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [isHost, setIsHost] = useState(false);
  const [showUpdateSettings, setShowUpdateSettings] = useState(false);
  const [updateRoom, setUpdateRoom] = useState({
    guest_can_pause: guestCanPause,
    votes_to_skip: votesToSkip,
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/get-room/?roomCode=${roomCode}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Add this line
        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
        setIsHost(data.is_host);
        setUpdateRoom({
          guest_can_pause: data.guest_can_pause,
          votes_to_skip: data.votes_to_skip,
        });
      })
      .catch((error) => console.error("Error fetching room details:", error));
  }, [roomCode]);

  const handleButtonLeavePressed = () => {
    const requestOptions = {
      method: "DELETE",
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

  const handleShowUpdateSettings = () => {
    setShowUpdateSettings(true);
  };

  const handleUpdateRoom = () => {
    // Add the code field to the updateRoom object
    const updatedRoom = {
      ...updateRoom,
      code: roomCode,
    };

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRoom),
    };

    fetch(
      `http://127.0.0.1:8000/api/update-room?roomCode=${roomCode}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated Room:", data);
        setShowUpdateSettings(false);
      })
      .catch((error) => {
        console.error("Error updating room:", error);
      });
  };

  return (
    <div>
      {showUpdateSettings &&
      updateRoom.guest_can_pause !== undefined &&
      updateRoom.votes_to_skip !== undefined ? (
        <CreateRoomPage
          updateData={{
            guest_can_pause: updateRoom.guest_can_pause,
            votes_to_skip: updateRoom.votes_to_skip,
          }}
          onUpdate={handleUpdateRoom}
          onBack={handleBack}
        />
      ) : (
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
              {typeof isHost === "boolean" && (
                <p>is Host: {isHost.toString()}</p>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowUpdateSettings}
            >
              SETTINGS
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleButtonLeavePressed}
            >
              LEAVE ROOM
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default RoomPage;
