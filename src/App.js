import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
// import Content from "./components/Content";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateVoting from "./components/CreateVoting";
import ListVote from "./components/ListVote";
import Vote from "./components/Vote";

function App() {
  const [votes, setVotes] = useState([]);
  return (
    <div className="app-container">
      <Sidebar />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/createVoting"
          element={<CreateVoting votes={votes} setVotes={setVotes} />}
        ></Route>
        <Route path="/listVoting" element={<ListVote votes={votes} />}></Route>
        <Route path="/vote" element={<Vote />}></Route>
      </Routes>
    </div>
  );
}

export default App;
