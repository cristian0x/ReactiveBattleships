import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./pages/game";
import Menu from "./pages/menu";
import HotSeat from "./pages/hotSeat";
import Leaderboard from "./pages/leaderboard";
import SavedSeaBattles from "./pages/savedSeaBattles";
import { useState } from "react";
import { PlayersContext } from "./providers/PlayersContext";
import SinglePlayer from "./pages/SinglePlayer";

function App() {
  const [player1Data, setPlayer1Data] = useState([{}, false]);
  const [player2Data, setPlayer2Data] = useState([{}, false]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PlayersContext.Provider
            value={{ player1Data, setPlayer1Data, player2Data, setPlayer2Data }}
          >
            <Route exact path="/" component={Menu} />
            <Route path="/game" component={Game} />
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
