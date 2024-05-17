import "./App.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState, useEffect } from "react";
import { Link, Navigate, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import GamePage from "./pages/GamePage";
import RecordsPage from "./pages/RecordsPage";
import SettingsPage from "./pages/SettingsPage";
import UserPage from "./pages/UserPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [loginProfile, setProfile] = useState([]);

  return (
    <div className='App'>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
            <Route path='/app/settings' element={<SettingsPage />} />
            {/* <Route path='/app/user' element={<UserPage handleNameChange={handleNameChange} player1Name={player1Name} player2Name={player2Name} />} /> */}
            <Route path='/app/user' element={<UserPage setPlayer1Name={setPlayer1Name} setPlayer2Name={setPlayer2Name} player1Name={player1Name} player2Name={player2Name} setProfile={setProfile} loginProfile={loginProfile}/>} />
            <Route path='*' element={<Navigate to='/landing' replace />} />
          </Routes>
          <BottomNav />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
