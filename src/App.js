import "./App.css";
import { Navigate, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import GamePage from "./pages/GamePage";
import RecordsPage from "./pages/RecordsPage";
import SettingsPage from "./pages/SettingsPage";
import UserPage from "./pages/UserPage";



function App() {
  return (
    <div className='App'>
      <div className='App-wrapper'>
        <header className='App-header'>
          <p>Love All Play</p>
        </header>
        <Routes>
          <Route path='/gamepage' exact element={<GamePage />} />
          <Route path='/records' exact element={<RecordsPage />} />
          <Route path='/settings' exact element={<SettingsPage />} />
          <Route path='/user' exact element={<UserPage />} />
          <Route path='*' element={<Navigate to='/gamepage' replace />} />
        </Routes>
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
