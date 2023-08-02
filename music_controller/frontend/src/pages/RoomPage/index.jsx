import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RoomPage() {
  const defaultVotes = 2;
  const { roomCode } = useParams();

  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // Fetch room details from the backend based on the room code
    fetch(`http://127.0.0.1:8000/api/get-room/?roomCode=${roomCode}`)
      .then((response) => response.json())
      .then((data) => {
        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
        setIsHost(data.is_host); // Update isHost with the value received from the backend
      })
      .catch((error) => console.error("Error fetching room details:", error));
  }, [roomCode]);

  return (
    <>
      <h1>Room Page</h1>
      <div>
        <p>Votes: {votesToSkip}</p>
        <p>Guest Can Pause: {guestCanPause.toString()}</p>
        <p>is Host: {isHost.toString()}</p>
      </div>
    </>
  );
}

export default RoomPage;
