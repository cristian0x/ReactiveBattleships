import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ComputersBattle from "./pages/ComputersBattle";
import Menu from "./pages/Menu";
import HotSeat from "./pages/HotSeat";
import Leaderboard from "./pages/Leaderboard";
import SavedSeaBattles from "./pages/SavedSeaBattles";
import {useEffect, useState} from "react";
import { PlayersContext } from "./providers/PlayersContext";
import SinglePlayer from "./pages/SinglePlayer";
import Replay from "./components/Replays/Replay";
import {logIn} from "./services/logIn";


function App() {
  const [player1Data, setPlayer1Data] = useState([{}, false]);
  const [player2Data, setPlayer2Data] = useState([{}, false]);

  useEffect(() => {
    //if(!window.sessionStorage.length) return
    Object.keys(sessionStorage).map((email) => {
      console.log(email)
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <PlayersContext.Provider
            value={{ player1Data, setPlayer1Data, player2Data, setPlayer2Data }}
          >
            <Route exact path="/" component={Menu} />
            <Route path="/game" component={ComputersBattle} />
            <Route path="/single-player" component={SinglePlayer} />
            <Route path="/hot-seat" component={HotSeat} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/saved-sea-battles" component={SavedSeaBattles} />
          </PlayersContext.Provider>
          <Route path="*">
            <div className="page404">
              <h5>404</h5>
              <h5>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h5>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
