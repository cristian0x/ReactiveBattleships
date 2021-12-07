import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Game from "./pages/game";
import Menu from "./pages/menu";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/menu" component={Menu} />
          <Route path="/game" component={Game} />
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
