import React from "react";
import { BrowserRouter , Switch, Route } from "react-router-dom";
import Request from "./pages/request";
import Home from "./pages/Home";
import Track from "./pages/Track";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/maintenance" component={Request}></Route>
          <Route path="/tracking/:id" component={Track}></Route>
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
