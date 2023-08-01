import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import CreateRoomPage from "./pages/CreateRoomPage/index";
import JoinRoomPage from "./pages/JoinRoomPage/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/join" element={<JoinRoomPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
