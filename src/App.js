import React from "react";
import { BrowserRouter , Switch, Route } from "react-router-dom";
import Request from "./pages/Request";
import Home from "./pages/Home";
import Track from "./pages/Track";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/maintenance" component={Request}></Route>
          <Route path="/tracking/:id" component={Track}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
