import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Request from "./pages/request";
import Home from "./pages/Home";
import Track from "./pages/Track";
import AdminLogin from "./pages/AdminLogin";
import { PrivateRoute } from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/maintenance" component={Request}></Route>
          <Route path="/tracking" component={Track}></Route>
          <Route path="/login" component={AdminLogin}></Route>
<<<<<<< HEAD
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
=======
>>>>>>> 2c357b8cabcf35bedd67d51dee846c3b962d36df
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
