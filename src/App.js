import "./App.css";
import React, { useState } from "react";
import { Link, Navigate, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import GamePage from "./pages/GamePage";
import RecordsPage from "./pages/RecordsPage";
// import SettingsPage from "./pages/SettingsPage";
import UserPage from "./pages/UserPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  return (
    <div className='App'>
      <div className='App-wrapper'>
        <header className='App-header'>
          <Link to={"/landing"}>
            <p>Love All Play</p>
          </Link>
        </header>
        <Routes>
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/app/gamepage' element={<GamePage player1Name={player1Name} player2Name={player2Name} />} />
           <Route path='/app/records' element={<RecordsPage />} />
          {/*<Route path='/app/settings' element={<SettingsPage />} /> */}
          <Route path='/app/user' element={<UserPage setPlayer1Name={setPlayer1Name} setPlayer2Name={setPlayer2Name} player1Name={player1Name} player2Name={player2Name} />} />
          <Route path='*' element={<Navigate to='/landing' replace />} />
        </Routes>
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
