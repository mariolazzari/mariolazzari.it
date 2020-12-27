// Application routes
import { Switch, Route, Redirect } from "react-router-dom";
// components
import Home from "../../views/Home";
import Certifications from "../../views/Certifications";
import Skills from "../../views/Skills";

// routes
const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/certifications" component={Certifications} />
    <Route path="/skills" component={Skills} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
