// App router
// Application routes
import { Switch, Route, Redirect } from "react-router-dom";
// components
import Home from "../../views/Home";

// routes
const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
