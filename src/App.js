import "./App.css";
import BottomNav from "./components/BottomNav";
import PlayerCourts from "./components/PlayerCourts";
function App() {
  return (
    <div className='App'>
      <div className='App-wrapper'>
        <header className='App-header'>
          <p>Love All Play</p>
        </header>
        <PlayerCourts />
        <div className='flag'>Flag</div>
        <PlayerCourts />
        <div className='gamescore-wrapper'>Scores</div>

        <BottomNav />
      </div>
    </div>
  );
}

export default App;
