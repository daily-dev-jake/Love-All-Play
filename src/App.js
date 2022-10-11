import "./App.css";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <div className='App'>
      <div className='App-wrapper'>
        <header className='App-header'>
          <p>Love All Play</p>
        </header>
        <div className='playercourts-wrapper'>
          <div className='courts'>Courts</div>
          <div className='courts'>Courts</div>
        </div>
        <div className="flag">Flag</div>
        <div className='playercourts-wrapper'>
          <div className='courts'>Courts</div>
          <div className='courts'>Courts</div>
        </div>
        <div className='gamescore-wrapper'>Scores</div>

        <BottomNav />
      </div>
    </div>
  );
}

export default App;
