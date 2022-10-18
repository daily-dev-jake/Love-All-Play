import "./App.css";
import { Link, Navigate, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import GamePage from "./pages/GamePage";
import RecordsPage from "./pages/RecordsPage";
import SettingsPage from "./pages/SettingsPage";
import UserPage from "./pages/UserPage";
import LandingPage from "./pages/LandingPage";

function App() {
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
          <Route path='/app/gamepage' element={<GamePage />} />
          <Route path='/app/records' element={<RecordsPage />} />
          <Route path='/app/settings' element={<SettingsPage />} />
          <Route path='/app/user' element={<UserPage />} />
          <Route path='*' element={<Navigate to='/landing' replace />} />
        </Routes>
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
